import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import NavHeader from './components/NavbarComponent';
import NotFound from './components/NotFoundComponent';
import PageList from './components/PageListComponent';
import SinglePage from './components/SinglePageComponent';
import BlockForm from './components/BlockFormComponent';
import PageForm from './components/PageFormComponent';
import UpdatePage from './components/UpdatePageComponent';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import API from './API';
import { LoginForm } from './components/AuthComponent';
import { User } from './PageAndBlockModels';

function App() {
  const [pages, setPages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(new User('','','',''));

  useEffect(()=> {
    // get all the pages from API
    const getPages = async () => {
      const pages = await API.getPages();
      setPages(pages);
    }
    getPages();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setUser(user);
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };


  return (
    <BrowserRouter>
        <Routes>
          <Route element={
            <>
              <NavHeader pages={pages} loggedIn={loggedIn} handleLogout={handleLogout}/>
              <Container fluid className="mt-3">
                {message && <Row>
                  <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
                </Row> }
                <Outlet/>
              </Container>
            </>} >
            <Route index 
              element={<PageList pages={pages} loggedIn={loggedIn} user={user}/> } />
            <Route path='pages/:pageId' 
              element={<SinglePage pages={pages} loggedIn={false}/> } />
            <Route path='pages/:pageId/updatePage' 
              element={<UpdatePage pages={pages} loggedIn={loggedIn}/> } />
            <Route path='pages/:pageId/addBlock' 
              element={<BlockForm />} />
            <Route path='pages/:pageId/editBlock/:blockId' 
              element={<BlockForm />} />
            <Route path='addPage' 
              element={<PageForm />} />
            <Route path='addPage/:pageId/addBlock' 
              element={<BlockForm />} />
            <Route path='*' element={ <NotFound/> } />
            <Route path='/login' element={
              loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />
            } />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
