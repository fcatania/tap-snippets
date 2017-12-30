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
      snippetObj = JSON.parse(JSONSnippet);
      if(!_isSnippetValid(snippetObj)) {
        reject({ err: 'Wrong snippet structure.'});
      } else {
        snippetObj.technologyId = techId;
        dbController.addSnippet(snippetObj).then((savedSnippet) => {
          resolve(savedSnippet);
        });
      }
    });
  })
}

_isSnippetValid = (sentSnippet) => {

  let testObj = {
    title: 'someething',
    snippetBody: 'a body',
    linkdocs: 'www.google.com',
    tags: [],
    tips: []
  }
  if(Object.keys(testObj).length !== Object.keys(sentSnippet).length) {
    return false;
  }

  for(key in testObj) {
    if(sentSnippet[key] === undefined) {
      return false;
    }
  }
  return true;
}