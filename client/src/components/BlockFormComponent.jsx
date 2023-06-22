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
  const [selectedType, setSelectedType] = useState('');
  const [id, setId] = useState(editableBlock ? editableBlock.id : -1);
  const [type, setType] = useState(editableBlock ? editableBlock.type : '');
  const [text, setText] = useState(editableBlock ? editableBlock.text : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new block
    const block = new Block(id, type, text);
    setWaiting(true);
    if(editableBlock) {
      API.updateBlock(block)
        .then(() => navigate(`/pages/${pageId}`));
    } else {
      API.addBlock(block, pageId)
          .then(() => navigate(`/pages/${pageId}`));
    }
  }

  const handleSelectedType=(e)=>{
    console.log("e.target.value", e.target.value);
    setSelectedType(e.target.value);
    console.log(selectedType);
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
            handleSelectedType(e);
          }}>
          <option value="header">Header</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <div>
          {selectedType === "image"
              ? <Form.Control
                  as="select"
                  value={text}
                  onChange={e => {
                    console.log("e.target.value", e.target.value);
                    setText(e.target.value);
                  }}>
                  <option value="nodejs">NodejsLogo</option>
                  <option value="person">PersonLogo</option>
                  <option value="option">OptionLogo</option>
                  <option value="waiting">WaitingLogo</option>
                </Form.Control>
              : <Form.Control type="text" required={true} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
        }
          
        </div>
      </Form.Group>
      
    
    {editableBlock ? 
        <><Button variant="primary" type="submit">Update</Button> <Link to='../..' relative='path' className='btn btn-danger'>Cancel</Link></> :
        <><Button variant="primary" type="submit" disabled={waiting}>Add</Button> <Link to='..' relative='path' className='btn btn-danger'>Cancel</Link></>
      }
    </Form>
    </>
  );
}

export default BlockForm;