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