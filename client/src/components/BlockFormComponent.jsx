import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Block } from '../PageAndBlockModels';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import API from '../API';

function BlockForm(props) {
  let { pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editableBlock = location.state;

  const [waiting, setWaiting] = useState(false);
  const [id, setId] = useState(editableBlock ? editableBlock.id : -1);
  const [type, setType] = useState(editableBlock ? editableBlock.type : '');
  const [text, setText] = useState(editableBlock ? editableBlock.text : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new block
    const block = new Block(id, type, text);
    setWaiting(true);
    API.addBlock(block, pageId)
        .then(() => navigate(`/page/${pageId}`));
        //.catch() handle any errors from the server
    
    
  }

  return (
    <>
    {waiting && <Alert variant="secondary">Please, wait for the server's answer...</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={e => {
            console.log("e.target.value", e.target.value);
            setType(e.target.value);
          }}>
          <option value="header">Header</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" required={true} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      
    <><Button variant="primary" type="submit" disabled={waiting}>Add</Button> <Link to='..' relative='path' className='btn btn-danger'>Cancel</Link></>
      
    </Form>
    </>
  );
}

export default BlockForm;