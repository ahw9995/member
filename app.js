// import
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./database.js');
const requestObject = require('./request.js');
const responseObject = require('./response.js');
const bodyParser = require('body-parser');

// model
const memberModel = require('./model/member.js');

// log 설정
app.use(morgan('dev'));

// json parser 설정
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// member 추가
app.post('/member', function(req, res) {
  let parameters = requestObject.getRequestParameters(req);
  let member = new memberModel({
    firstName: parameters.firstName,
    lastName: parameters.lastName,
    companyName: parameters.companyName,
    email: parameters.email
  });
  member.save(function(error, member) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'save error[' + error + ']', member: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', member: member}, 200));
    }
  });
});

// member list 조회
app.get('/members', function(req, res) {
  memberModel.find(function(error, members) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'search error[' + error + ']', members: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', members: members}, 200));
    }
  });
});

// member list 조회
// sort 정보를 파라미터로 받음(asc, desc)
app.get('/members/sort/:sort', function(req, res) {
  let sort = 1;
  if (req.params.sort === 'desc') {
    sort = -1;
  }
  memberModel.find().sort({createdDate: sort}).exec(function(error, members) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'search error[' + error + ']', members: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', members: members}, 200));
    }
  });
});

// member list 조회
// 조회되는 정보를 firstName, lastName, email 만 가져오도록 설정
app.get('/members/name', function(req, res) {
  memberModel.find().sort().select('firstName lastName email').exec(function(error, members) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'search error[' + error + ']', members: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', members: members}, 200));
    }
  });
});

// e-mail 정보를 통해 equal 검색
app.get('/member/email/:email', function(req, res) {
  memberModel.findOne({email: req.params.email}, function(error, member) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'search error[' + error + ']', member: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', member: member}, 200));
    }
  });
});

// e-mail 정보를 통해 like 검색
app.get('/members/email/:email', function(req,  res) {
  memberModel.find({email: {$regex: '.*' + req.params.email + '.*'}}, function(error, members) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'search error[' + error + ']', members: null}, 500));
    } else {
      res.end(responseObject.setResponse(res, {result: true, message: 'success', members: members}, 200));
    }
  });
});

// member 수정
app.put('/member', function(req, res) {
  let parameters = requestObject.getRequestParameters(req);
  if (typeof parameters.email === 'undefined') {
    res.end(responseObject.setResponse(res, {result: false, message: 'Parameter error ==> [' + parameters.email + ']', members: null}, 500));
  }
  memberModel.findOne({email: parameters.email}, function(error, member) {
    if (error) {
      res.end(responseObject.setResponse(res, {result: false, message: 'update error[' + error + ']', member: null}, 500));
    } else {
      if (parameters.firstName) member.firstName = parameters.firstName;
      if (parameters.lastName) member.lastName = parameters.lastName;
      if (parameters.companyName) member.companyName = parameters.companyName;
      member.modifiedDate = Date.now();

      member.save(function(error) {
        if (error) {
          res.end(responseObject.setResponse(res, {result: false, message: 'update error[' + error + ']', member: null}, 500));
        } else {
          res.end(responseObject.setResponse(res, {result: true, message: 'success', member: member}, 200));
        }
      });
    }
  });
});

// member 삭제
app.delete('/member', function(req, res) {
  let parameters = requestObject.getRequestParameters(req);
  if (typeof parameters.email === 'undefined') {
    res.end(responseObject.setResponse(res, {result: false, message: 'Parameter error ==> [' + parameters.email + ']', members: null}, 500));
  } else {
    memberModel.remove({email: parameters.email}, function(error, output) {
      if (error) {
        res.end(responseObject.setResponse(res, {result: false, message: 'delete error[' + error + ']', member: null}, 500));
      } else {
        res.end(responseObject.setResponse(res, {result: true, message: 'member deleted'}, 200));
      }
    });
  }
});

app.listen(3000);
