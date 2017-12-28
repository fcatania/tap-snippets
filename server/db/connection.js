const Sequelize = require('sequelize');
const db = new Sequelize('tap_snippets', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

let Snippet = db.define('snippet', {
  title: Sequelize.STRING,
  linkdocs: Sequelize.STRING,
  snippetBody: Sequelize.TEXT
});

let Tip = db.define('tip', {
  text: Sequelize.TEXT
});

let Tag = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  }
});

Snippet.belongsToMany(Tip, {through: 'snippet_tip'});
Snippet.belongsToMany(Tag, {through: 'snippet_tag'});
Tip.belongsToMany(Snippet, {through: 'snippet_tip'});
Tag.belongsToMany(Snippet, {through: 'snippet_tag', foreignKey: 'name'});

db.sync();

exports.Snippet = Snippet;
exports.Tip = Tip;
exports.Tag = Tag;
exports.db = db;
