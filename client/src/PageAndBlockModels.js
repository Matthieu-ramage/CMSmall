'use strict';

/* Same of week 09, but 1) with require() instead of import and 2) without any internal methods */

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

  /* Method to enable the proper serialization to string of the dayjs object. 
  Needed for the useLocation hook of react router when passing the answer to the edit form (AnswerComponent and AnswerForm). */
  this.serialize = () => {
    return {id: this.id, title: this.title, author: this.author, date: this.date.format('YYYY-MM-DD'), publication_date: this.publication_date.format('YYYY-MM-DD'), blocks: this.blocks};
  }
}

export { Block, Page };