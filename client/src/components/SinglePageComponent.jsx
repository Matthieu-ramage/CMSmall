import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';
import Blocks from './BlockComponent';

function SinglePage(props) {
  // get the questionId from the URL to retrieve the right question and its answers
  const params = useParams();
  const page = props.pages[params.pageId-1];
  const [blocks, setBlocks] = useState([]);
  
  const getBlocks = async () => {
    const blocks = await API.getBlock(params.pageId);
    setBlocks(blocks);
  }

  useEffect(()=> {
    // get all the blocks of this page from API
    getBlocks();
  }, []);
  
  return (
    <>
    {/* The check on "question" is needed to intercept errors due to invalid URLs (e.g., /questions/5 when you have two questions only) */}
    {page ? <>
      <PageDescription page={page} />
      <Blocks blocks={blocks} loggedIn={props.loggedIn}></Blocks></> :
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