const db = require('./connection');

exports.getSnippets = () => {
  return db.Snippet.findAll({
    include: [{
        model: db.Tag,
        through: {
          attributes: ['name']
        }
    },{
      model: db.Tip,
      through: {
        attributes: ['text']
      }
    }]
  }).catch((err) => {
    console.log(err);
  }).then((result) => {
    let snippets = result.map((element) => {
      var cleanObj = {};
      cleanObj.title = element.title;
      cleanObj.linkdocs = element.linkdocs;
      cleanObj.snippetBody = element.snippetBody;
      cleanObj.tags = element.tags.map((tag) => {
        return tag.name;
      });
      cleanObj.tips = element.tips.map((tip) => {
        return tip.text;
      });
      return cleanObj;
    });
    console.log(snippets);
    return snippets;
  });
}