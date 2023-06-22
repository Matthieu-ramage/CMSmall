import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../API';

export default function PageList(props) {

  return (
    <>
      <Row>
        <Col>
          <h1>Welcome to CMSmall!</h1>
          <p className='lead'>We now have {props.pages.length} pages available.</p>
        </Col>
      </Row>
      <Row>
        <dl>
          {
            props.pages.map((p) => <PageRow page={p} key={p.id}/>)
          }
        </dl>
      </Row>

      <Link to='addPage' className='btn btn-success' role='button'>Add Page</Link>
    </>
  );
}

function PageRow(props) {
  const pageStyle = {
    border: "1px solid",
    marginBottom: "0.5rem",
    display: "flex",
    flexDirection: "row"
  };
  
  const deletePage = (id) => {
    return API.deletePage(id);
  };

  return (
    <div style={pageStyle}>
      <div style={{flexDirection: "column"}}>
        <dt>Page #{props.page.id}: <Link to={`/pages/${props.page.id}`}>{props.page.title}</Link></dt>
        <div>Authored by {props.page.author} on {props.page.date.format('YYYY-MM-DD')}</div>
        <PageStatus date={props.page.publication_date}/>
      </div>
      <button style = {{right: "20px", marginTop: "20px", position: "absolute"}} onClick= {() => deletePage(props.page.id)} className='btn btn-danger' role='button' data-toggle="tooltip" title="Delete">
          Delete
        </button>
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