import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../API';

export default function PageList(props) {
  const [pages, setPages] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const getPages = async () => {
    const pages = await API.getPages();
    setPages(pages);
  }

  useEffect(()=> {
    getPages();
  }, [refreshKey]);

  function PageRow(props) {

    const pageStyle = {
      border: "1px solid",
      marginBottom: "0.5rem",
      display: "flex",
      flexDirection: "row"
    };
    
    const deletePage = (id) => {
      console.log(id);
      API.deletePage(id).then(setRefreshKey(refreshKey+1));
    };

    function IsTheAuthor(props) {
      if (props.loggedIn && props.page.author == props.user.name) {
        return (
          <div style = {{right: "20px", marginTop: "20px", position: "absolute"}}>
            <Link to={`/pages/${props.page.id}/updatePage`} state={props.page.serialize()} className='btn btn-primary' role='button'  style = {{marginRight:"5px"}}><i className='bi bi-pencil-square'></i></Link>
            <button onClick= {() => deletePage(props.page.id)} className='btn btn-danger' role='button' data-toggle="tooltip" title="Delete">
                Delete
              </button>
          </div>
        )
      }
    }
  
    return (
      <div style={pageStyle}>
        <div style={{flexDirection: "column"}}>
          <dt>Page #{props.page.id}: <Link to={`/pages/${props.page.id}`}>{props.page.title}</Link></dt>
          <div>Authored by {props.page.author} on {props.page.date.format('YYYY-MM-DD')}</div>
          <PageStatus date={props.page.publication_date}/>
        </div>
        <IsTheAuthor page={props.page} user={props.user} loggedIn={props.loggedIn}/>
      </div>
    );
  }

  function PageStatus(props) {
    const today=Date.now();
    if (props.date.format('YYYY-MM-DD') == 'Invalid Date') {
      return (
        <dd>Draft</dd>
      )
    } else if (new Date(props.date.format('YYYY-MM-DD')) > today) {
      return (
        <dd>Scheduled</dd>
      )
    } else if (new Date(props.date.format('YYYY-MM-DD')) <= today) {
      return (
        <dd>Published</dd>
      )
    }
  }

  function PagesLoggedIn(props) {
    return (
    <dl> 
      {props.pages.map((p) => <PageRow page={p} key={p.id} loggedIn={props.loggedIn} user={props.user}/>)}
      <Link to='addPage' className='btn btn-success' role='button'>Add Page</Link>
    </dl>
    
    )
  }

  function PagesNotLoggedIn(props) {
    const today=Date.now();
    return (
    <dl> 
      {pages.filter((p) => new Date(p.publication_date.format('YYYY-MM-DD')) <= today).map((p) => <PageRow page={p} key={p.id} loggedIn={props.loggedIn} user={props.user}/>)}
    </dl>
    )
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Welcome to CMSmall!</h1>
          <p className='lead'>We now have {pages.length} pages available.</p>
        </Col>
      </Row>
      <Row>
          {props.loggedIn ? 
            <PagesLoggedIn pages={pages} loggedIn={props.loggedIn} user={props.user}/> :
            <PagesNotLoggedIn pages={pages} loggedIn={props.loggedIn} user={props.user}/>
          }
      </Row>
      
    </>
  );
}