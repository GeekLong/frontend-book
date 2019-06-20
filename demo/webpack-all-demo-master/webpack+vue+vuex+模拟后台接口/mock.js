
const getPower = require('./json/parent_getPower.json');
const reConfig = require('./json/parent_reConfig.json');
const reConList = require('./json/parent_reconlist.json');
const reGroup = require('./json/parent_reGroup.json');

function Mock(app) {
  app.get('/xxxx/yyy', function(req, res) {
    console.log('getPower111');
    res.json(getPower);
  });
  app.post('/reconfig', function(req, res) {
    console.log('reConfig111');
    res.json(reConfig);
  });
  app.post('/conlist', function(req, res) {
    console.log('reConList111');
    res.json(reConList);
  });
  app.post('/regroup', function(req, res) {
    console.log('reGroup111');
    res.json(reGroup);
  });
}

module.exports = Mock;