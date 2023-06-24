'use strict';

import dayjs from 'dayjs';

function Block(id, type, text) {
  this.id = id;
  this.type = type;
  this.text = text;

  this.serialize = () => {
    return {id: this.id, type: this.type, text: this.text};
  }
}

function Page(id, title, author, date, publication_date) {
  this.id = id;
  this.title = title,
  this.author = author,
  this.date = dayjs(date);
  this.publication_date = dayjs(publication_date);
  this.blocks = [];

  this.addBlock = (block) => {
    this.blocks.push(block);
  }

  this.getBlocks = () => {
    return [...this.blocks];
  }

  this.init = () => {
    this.blocks.push(
      new Block(1, 'Header', 'Block 1 '),
      new Block(2, 'Text', "Hello world")
    );
  }

  this.serialize = () => {
    return {id: this.id, title: this.title, author: this.author, date: this.date.format('YYYY-MM-DD'), publication_date: this.publication_date.format('YYYY-MM-DD'), blocks: this.blocks};
  }
}

function User(userId, username, name, role) {
  this.userId = userId;
  this.username = username;
  this.name = name;
  this.role = role;
}

export { Block, Page, User };