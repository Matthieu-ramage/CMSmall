import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Blocks from './BlockComponent';

function SinglePage(props) {
  const params = useParams();
  const page = props.pages[params.pageId-1];
  
  return (
    <>
    {page ? <>
      <PageDescription page={page} />
      <Blocks pageId={params.pageId} loggedIn={props.loggedIn}></Blocks></> :
      <p className='lead'>The selected page does not exist!</p>
    } 
    </>
  );
}

function PageDescription(props) {
  return (
    <>
      <Row>
        <PageHeader pageTitle={props.page.title} author={props.page.author} />
      </Row>
    </>
  );
}

function PageHeader(props) {
  return (
    <>
      <h1 as="p">
        <strong>{props.pageTitle}</strong>
      </h1>
      <Col as="p" className="text-end">
        Authored by <span className="badge rounded-pill text-bg-secondary text-end">{props.author}</span>
      </Col>
    </>
  );
}

export default SinglePage;