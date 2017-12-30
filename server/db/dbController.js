const db = require('./connection');

exports.getSnippets = (techId) => {
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
    }],
    where: {
      technologyId: techId
    }
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
    console.log('THE SNIPPETS', snippets);
    return snippets;
  });
}

exports.addSnippet = (snippet) => {
  console.log('ADDDDDD SNIP', snippet);
  return db.Snippet.create(snippet).then((storedSnippet) => {
    let tags = _createTagObjs(snippet.tags);
    let tips = _createTipObjs(snippet.tips);
    tags.forEach(tag => {
      db.Tag.findOrCreate({where: {name: tag.name}})
      .spread((storedTag, created) => {
        storedSnippet.addTag(storedTag);
      }); 
    });      
    tips.forEach(val => {
      storedSnippet.createTip(val);
    });
    return storedSnippet;
  });
}


let _createTagObjs = (arrayOfTags) => {
  return arrayOfTags.map((val) => {
    return {
      name: val
    }
  });
}

let _createTipObjs = (arrayOfTags) => {
  return arrayOfTags.map((val) => {
    return {
      text: val
    }
  });
}