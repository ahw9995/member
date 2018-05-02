var bodyParser = require('body-parser');

module.exports = {
  getRequestParameters: function(req) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var companyName = req.body.companyName;
    var email = req.body.email;
    return {firstName: firstName, lastName: lastName, companyName: companyName, email: email};
  }
}
