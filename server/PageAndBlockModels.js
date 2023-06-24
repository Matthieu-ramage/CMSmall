'use strict';

const dayjs = require('dayjs');

function Page(id, title, author, date, publication_date) {
  this.id = id;
  this.title = title,
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