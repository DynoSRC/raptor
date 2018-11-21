const jsx = require('react-jsx');

exports.getTemplate = function(name) {
  return jsx.server(fs.readFileSync(`./jsx/${name}.jsx`, 'utf-8'));
};
