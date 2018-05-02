
module.exports = {
  setResponse: function(res, json, statusCode) {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(json));
    return res;
  }
}
