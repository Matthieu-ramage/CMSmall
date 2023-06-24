import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nodejsLogo from '../image/nodejs.png'
import optionLogo from '../image/option.png'
import personLogo from '../image/person.png'
import waitingLogo from '../image/waiting.png'
import API from '../API';

function Blocks(props) {
  const params = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [blocks, setBlocks] = useState([]);
  
  const getBlocks = async () => {
    const blocks = await API.getBlock(params.pageId);
    setBlocks(blocks);
  }

  useEffect(()=> {
    // get all the blocks of this page from API
    getBlocks();
  }, [refreshKey]);

    return (
      <>
        <Row>
          <Col lg={10} className="mx-auto">
            <BlockTable blocks={blocks} loggedIn={props.loggedIn}></BlockTable>
          </Col> 
        </Row>
      </>
    );

  function BlockTable(props) {
  const [sortOrder, setSortOrder] = useState('none');

  const deleteBlock = (id) => {
    console.log(id);
    API.deleteBlock(id).then(setRefreshKey(refreshKey+1));
  };

  function BlockActions(props) {
    if (props.loggedIn) {
      return <td>
          <Link to={`editBlock/${props.block.id}`} className='btn btn-primary' state={props.block.serialize()}><i className='bi bi-pencil-square'></i></Link>
          <button style={{marginLeft:"5px"}}onClick= {() => deleteBlock(props.block.id)} className='btn btn-danger' role='button' data-toggle="tooltip" title="Delete">
                  Delete
                </button>
          </td>
    }
  }
  

  function IsLoggedIn(props) {
    if (props.loggedIn) {
      return (
        <Link to='addBlock' className='btn btn-success' role='button'>Add Block</Link>
      )
    }
  }

  function BlockRow(props) {
      return(
          <tr><BlockData block={props.block}/><BlockActions block={props.block} loggedIn={props.loggedIn}/></tr>
      );
  }

  function BlockData(props) {
    if (props.block.type == "header") {
      return(
        <BlockHeaderRow block={props.block}/>
      );
    } else if (props.block.type == "text") {
      return(
        <BlockTextRow block={props.block}/>
      );
    } else if (props.block.type == "image") {
      return(
        <BlockImageRow block={props.block}/>
      );
    }
  }

  function BlockHeaderRow(props) {
    return (
    <td>{props.block.text}</td>
    )
  } 

  function BlockTextRow(props) {
    return (
    <td>{props.block.text}</td>
    )
  }

  function BlockImageRow(props) {
    const srcImg = getImage(props.block.text)
    return (
      <img src={srcImg} style={{width:"50px", height:"50px"}}></img>
    )
  }

  function getImage(imageName) {
    if (imageName == "nodejs") {
      return (nodejsLogo)
    } else if (imageName == "option") {
      return (optionLogo)
    } else if (imageName == "person") {
      return (personLogo)
    } else if (imageName == "waiting") {
      return (waitingLogo)
    }
  }

  const sortedBlocks = [...props.blocks];
      if (sortOrder === 'asc')
          sortedBlocks.sort((a,b) => a.id - b.id);
      else if (sortOrder === 'desc')
          sortedBlocks.sort((a,b) => b.id - a.id);

      return (
          <>
          <Table striped style={{width:"50%"}}>
              <tbody>
              {
                  sortedBlocks.map((block) => <BlockRow block={block} key={block.id} loggedIn={props.loggedIn}/>)
              }
              </tbody>
          </Table>

          <IsLoggedIn loggedIn={props.loggedIn}/>
          
          </>
      );
  }
}

export default Blocks;
