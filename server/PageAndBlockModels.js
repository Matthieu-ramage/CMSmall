'use strict';

/* Same of week 09, but 1) with require() instead of import and 2) without any internal methods */

const dayjs = require('dayjs');

function Page(id, author, date, publication_date) {
  this.id = id;
  this.author = author,
  this.date = dayjs(date);
  this.publication_date = publication_date;
}

function Block(id, type, text) {
  this.id = id;
  this.type = type;
  this.text = text;
}

module.exports = { Page, Block };