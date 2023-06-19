import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    </>
  );
}

function PageRow(props) {
  const pageStyle = {
    border: "1px solid",
    marginBottom: "0.5rem"
  };
  return (
    <div style={pageStyle}>
      <dt>Page #{props.page.id}: <Link to={`/pages/${props.page.id}`}>{props.page.title}</Link></dt>
      <div>Authored by {props.page.author} on {props.page.date.format('YYYY-MM-DD')}</div>
      <PageStatus date={props.page.publication_date}/>
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
