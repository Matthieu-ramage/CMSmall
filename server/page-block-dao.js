/* Data Access Object (DAO) module for accessing Pages */
const sqlite = require('sqlite3');
const { Page, Block } = require('./PageAndBlockModels');

// open the database
const db = new sqlite.Database('cmsmall.sqlite', (err) => {
  if (err) throw err;
});

/** Pages **/
// get all the pages
exports.listPages = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM page';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      const pages = rows.map((p) => new Page(p.id, p.title, p.author, p.date, p.publication_date));
      resolve(pages);
    });
  });
}

// get a page given its id
exports.getPage = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM page WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err)
          reject(err);
        if (row == undefined)
          resolve({error: 'Page not found.'}); 
        else {
          const page = new Page(p.id, p.title, p.author, p.date, p.publication_date);
          resolve(page);
        }
      });
    });
  };

  // add a new page
exports.addPage = (page) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO page(title, author, date, publication_date) VALUES (?, DATE(?), ?)';
      db.run(sql, [page.title, page.author, page.date, page.publication_date], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  };


  // update an existing page
exports.updatePage = (page, pageId) => {
    return new Promise ((resolve, reject) => {
      const sql = 'UPDATE page SET title=?, publication_date=? WHERE id=?';
      db.run(sql, [page.title, page.publication_date, pageId], function(err) {
        if(err) {
          console.log(err);
          reject(err);
        }
        else resolve(this.lastID);
      });
    });
  };

 // delete an existing page
 exports.deletePage = (pageId) => {
  return new Promise ((resolve, reject) => {
    const sql = 'DELETE page WHERE id=?';
    db.run(sql, [pageId], function(err) {
      if(err) {
        console.log(err);
        reject(err);
      }
      else resolve(this.lastID);
    });
  });
};

/** BLOCK **/

// get all the block of a given page
exports.listBlocksOf = (pageId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM block WHERE pageId = ?';
      db.all(sql, [pageId], (err, rows) => {
        if (err) {
          reject(err);
        }
        const blocks = rows.map((b) => new Block(b.id, b.type, b.text));
        resolve(blocks);
      });
    });
  };
  
  // add a new block
  exports.addBlock = (block, pageId) => {
    return new Promise ((resolve, reject) => {
      const sql = 'INSERT INTO block(type, text, pageId) VALUES (?, ?, ?)';
      db.run(sql, [block.type, block.text, pageId], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  };
  
  // update an existing block
  exports.updateBlock = (block, blockId) => {
    return new Promise ((resolve, reject) => {
      const sql = 'UPDATE block SET type=?, text=? WHERE id=?';
      db.run(sql, [block.type, block.text, blockId], function(err) {
        if(err) {
          console.log(err);
          reject(err);
        }
        else resolve(this.lastID);
      });
    });
  };

  // delete an existing block
  exports.deleteBlock = (blockId) => {
    return new Promise ((resolve, reject) => {
      const sql = 'DELETE block WHERE id=?';
      db.run(sql, [blockId], function(err) {
        if(err) {
          console.log(err);
          reject(err);
        }
        else resolve(this.lastID);
      });
    });
  };