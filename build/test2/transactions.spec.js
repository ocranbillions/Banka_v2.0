"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai.default.use(_chaiHttp.default);

var should = _chai.default.should();

var staffToken;
var clientToken;
var staffLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret'
};
var clientLogin = {
  email: 'joe@gmail.com',
  password: 'joeboy123'
};
describe('TRANSACTIONS', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signin').send(staffLogin).end(function (err, res) {
      if (err) done(err);
      staffToken = res.body.data.token;
      done();
    });
  });
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signin').send(clientLogin).end(function (err, res) {
      if (err) done(err);
      clientToken = res.body.data.token;
      done();
    });
  });
  describe('api/v1/transactions', function () {
    it('Should get all transactions',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/transactions/').set('Authorization', "Bearer ".concat(staffToken));

            case 2:
              res = _context.sent;
              res.body.should.have.property('data');
              res.should.have.status(200);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Non staff should not have access',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/accounts/').set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context2.sent;
              res.should.have.status(403);
              res.body.should.have.property('errorMessage').eql('Forbidden: The requested page can only be accessed by a staff');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should NOT get access to /transactions route if user is not logged in',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/transactions/');

            case 2:
              res = _context3.sent;
              res.body.should.have.property('errorMessage').eql('You must be logged in to access this route');
              res.should.have.status(401);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should NOT authenticate user with invalid token',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/transactions/').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context4.sent;
              res.body.should.have.property('errorMessage').eql('Invalid token');
              res.should.have.status(401);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should fail if it lacks valid authentication',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/transactions/').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context5.sent;
              res.body.should.have.property('errorMessage').eql('Auth failed!');
              res.should.have.status(401);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  it('Should get specific transaction',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var res;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _chai.default.request(_app.default).get('/api/v1/transactions/1').set('Authorization', "Bearer ".concat(staffToken));

          case 2:
            res = _context6.sent;
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('type');
            res.body.should.have.property('status');
            res.should.have.status(200);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should be able to credit an account',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var transaction, res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            transaction = {
              amount: 1000
            };
            _context7.next = 3;
            return _chai.default.request(_app.default).post('/api/v1/transactions/3301123235/credit').set('Authorization', "Bearer ".concat(staffToken)).send(transaction);

          case 3:
            res = _context7.sent;
            res.body.should.have.property('data');
            res.should.have.status(201);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should be able to debit an account',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var transaction, res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            transaction = {
              amount: 1000
            };
            _context8.next = 3;
            return _chai.default.request(_app.default).post('/api/v1/transactions/4194194410/debit').set('Authorization', "Bearer ".concat(staffToken)).send(transaction);

          case 3:
            res = _context8.sent;
            res.body.should.have.property('data');
            res.should.have.status(201);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
});