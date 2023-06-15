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
  return (
    <>
      <dt>Page #{props.page.id}: <Link to={`/pages/${props.page.id}`}>{props.page.title}</Link></dt>
      <dd>Authored by {props.page.author} on {props.page.date.format('YYYY-MM-DD')}</dd>
    </>
  );
}