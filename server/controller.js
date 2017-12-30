const Promise = require('bluebird');
const dbController = require('./db/dbController');

exports.get = (techId) => {
  console.log('getting snippets');
  return dbController.getSnippets(techId).then((snippets) => {
    return {
      snippets: {
        react: snippets
      }
    }
  });
}

exports.post = (req, res, techId) => {
  return new Promise((resolve, reject) => {
    let JSONSnippet = '';
    req.on('data', (chunk) => {
      JSONSnippet += chunk;
    });
    req.on('end', () => {
      if(!JSONSnippet) {
        reject('err');
      } else {
        snippetObj = JSON.parse(JSONSnippet);
        snippetObj.technologyId = techId;
        dbController.addSnippet(snippetObj).then((savedSnippet) => {
          resolve(savedSnippet);
        });
      }
    });
  })
}