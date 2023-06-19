import { Page } from './PageAndBlockModels.js';
import { Block } from './PageAndBlockModels.js';
const SERVER_URL = 'http://localhost:3001';

const getPages = async () => {
  const response = await fetch(SERVER_URL + '/api/pages');
  if(response.ok) {
    const pagesJson = await response.json();
    return pagesJson.map(p => new Page(p.id, p.title, p.author, p.date, p.publication_date));
  }
  else
    throw new Error('Internal server error');
}

const getBlock = async (pageId) => {
  const response = await fetch(SERVER_URL + `/api/pages/${pageId}/blocks`);
  const blocksJson = await response.json();
  if(response.ok) {
    return blocksJson.map(b => new Block(b.id, b.type, b.text));
  }
  else
    throw blocksJson;
}

const addBlock = async (block, pageId) => {
  const response = await fetch(`${SERVER_URL}/api/pages/${pageId}/blocks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({type: block.type, text: block.text})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = {getPages, getBlock, addBlock, logIn, logOut, getUserInfo};
export default API;