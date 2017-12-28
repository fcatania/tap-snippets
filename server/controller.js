const Promise = require('bluebird');
const dbController = require('./db/dbController');

exports.get = () => {
  console.log('getting snippets');
  return dbController.getSnippets().then((snippets) => {
    return {
      snippets: {
        react: snippets
      }
    }
  });
}