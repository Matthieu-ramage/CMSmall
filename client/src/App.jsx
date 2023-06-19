import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import NavHeader from './components/NavbarComponent';
import NotFound from './components/NotFoundComponent';
import PageList from './components/PageListComponent';
import SinglePage from './components/SinglePageComponent';
import BlockForm from './components/BlockFormComponent';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import API from './API';
import { LoginForm } from './components/AuthComponent';

function App() {
  const [pages, setPages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

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
      await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
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
              element={ <PageList pages={pages}/> } />
            <Route path='pages/:pageId' 
              element={<SinglePage pages={pages} loggedIn={loggedIn}/> } />
            <Route path='pages/:pageId/addBlock' 
              element={<BlockForm />} />
            <Route path='pages/:pageId/editBlock/:blockId' 
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
