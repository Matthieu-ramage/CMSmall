import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Page } from '../PageAndBlockModels';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import API from '../API';

function PageForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const editablePage = location.state;
  
    const [waiting, setWaiting] = useState(false);
    const [id, setId] = useState(editablePage ? editablePage.id : -1);
    const [title, setTitle] = useState(editablePage ? editablePage.title : '');
    const [author, setAuthor] = useState(editablePage ? editablePage.author : '');
    const [date, setDate] = useState(editablePage ? editablePage.date : '');
    const [publication_date, setPublicationDate] = useState(editablePage ? editablePage.publication_date : '');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const page = new Page(id, title, author, date, publication_date);
        if(editablePage) {
          API.updatePage(page);
        } else {
          setWaiting(true);
          const newId = await API.addPage(page)
          navigate(`/addPage/${newId}/addBlock`);
        }
        
        
        
      }
      return (
        <>
        {waiting && <Alert variant="secondary">Please, wait for the server's answer...</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" required={true} value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
          </Form.Group>
          { editablePage ?
             <></> : 
             <div>
              <Form.Group className='mb-3'>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" required={true} value={author} onChange={(event) => setAuthor(event.target.value)}></Form.Control>
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" required={true} value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
              </Form.Group>
            </div>
            
          }
          <Form.Group className='mb-3'>
            <Form.Label>Publication Date</Form.Label>
            <Form.Control type="text" value={publication_date} onChange={(event) => setPublicationDate(event.target.value)}></Form.Control>
          </Form.Group>
        
        {editablePage ? 
            <><Button variant="primary" type="submit">Update</Button> <Link to='../../..' relative='path' className='btn btn-danger'>Cancel</Link></> :
            <><Button variant="primary" type="submit" disabled={waiting}>Create</Button> <Link to='..' relative='path' className='btn btn-danger'>Cancel</Link></>
          }
        </Form>
        </>
      );
    }

    export default PageForm;