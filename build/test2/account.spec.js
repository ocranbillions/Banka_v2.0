"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai.default.use(_chaiHttp.default);

var should = _chai.default.should();

var adminToken;
var clientToken;
var adminLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret'
};
var clientLogin = {
  email: 'joe@gmail.com',
  password: 'joeboy123'
};
describe('ACCOUNTS', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signin').send(adminLogin).end(function (err, res) {
      if (err) done(err);
      adminToken = res.body.data.token;
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
  describe('api/v1/accounts', function () {
    it('Admin should get all accounts',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context.sent;
              res.should.have.status(200);
              res.body.should.have.property('data');
              res.body.should.have.property('status');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should NOT get access /accounts if user is not logged in',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/');

            case 2:
              res = _context2.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage').eql('You must be logged in to access this route');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should NOT authenticate user with invalid token',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context3.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage').eql('Invalid token');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('Should fail if it lacks valid authentication',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context4.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage').eql('Auth failed!');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Non staff should not have access',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/').set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context5.sent;
              res.should.have.status(403);
              res.body.should.have.property('errorMessage').eql('Forbidden: The requested page can only be accessed by a staff');

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('GET /api/v1/accounts/:accountNumber', function () {
    it('Should get a single account',
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
              return _chai.default.request(_app.default).get('/api/v1/accounts/4194194410').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context6.sent;
              res.should.have.status(200);
              res.body.should.have.property('data');
              res.body.should.have.property('status');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('Should NOT get an invalid account number',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/accounts/77854').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context7.sent;
              res.should.have.status(404);
              res.body.should.have.property('errorMessage').eql('The account with the given number was not found');

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  it('Should get all transactions on an account',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _chai.default.request(_app.default).get('/api/v1/accounts/9852136521/transactions').set('Authorization', "Bearer ".concat(adminToken));

          case 2:
            res = _context8.sent;
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.should.have.property('status');

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }))); // // Test case for creating an account

  var accNum;
  describe('POST /api/v1/accounts', function () {
    it('Should create an account',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var newAccount, res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              newAccount = {
                type: 'savings',
                openingBalance: 5000.00
              };
              _context9.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/accounts/').set('Authorization', "Bearer ".concat(adminToken)).send(newAccount);

            case 3:
              res = _context9.sent;
              res.should.have.status(201);
              res.body.should.have.property('data');
              res.body.data.type.should.equal('savings');
              res.body.should.have.property('status');
              accNum = res.body.data.accountnumber;

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('Should NOT create an account with incomplete form data',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var newAccount, res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              newAccount = {
                owneremail: '',
                type: 'savings',
                openingBalance: '67500.00'
              };
              _context10.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/accounts/').set('Authorization', "Bearer ".concat(adminToken)).send(newAccount);

            case 3:
              res = _context10.sent;
              res.should.have.status(400);
              res.body.should.have.property('errorMessage');

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  }); // // Test case for changing an account status

  describe('PATCH /api/v1/accounts/:accountNumber', function () {
    it('Should change an account status',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var formData, res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              formData = {
                status: 'dormant'
              };
              _context11.next = 3;
              return _chai.default.request(_app.default).patch('/api/v1/accounts/5421214520').set('Authorization', "Bearer ".concat(adminToken)).send(formData);

            case 3:
              res = _context11.sent;
              res.should.have.status(201);
              res.body.should.have.property('data');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should NOT change an account status with invalid acc number',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var formData, res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              formData = {
                status: 'dormant'
              };
              _context12.next = 3;
              return _chai.default.request(_app.default).patch('/api/v1/accounts/54546546544646').set('Authorization', "Bearer ".concat(adminToken)).send(formData);

            case 3:
              res = _context12.sent;
              res.should.have.status(404);
              res.body.should.have.property('errorMessage').eql('The account with the given number was not found');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should allow only admin to change account status',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _chai.default.request(_app.default).patch("/api/v1/accounts/".concat(accNum)).set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context13.sent;
              res.should.have.status(403);
              res.body.should.have.property('errorMessage').eql('Forbidden: You are not an admin');

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  }); // Test case for deleting an account

  describe('DELETE /api/v1/accounts/:accountNumber', function () {
    it('Should delete an account',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _chai.default.request(_app.default).delete("/api/v1/accounts/".concat(accNum)).set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context14.sent;
              res.should.have.status(202);
              res.body.should.have.property('status');
              res.body.should.have.property('message').eql('Account successfully deleted');

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('Should NOT delete an invalid acccount',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _chai.default.request(_app.default).delete('/api/v1/accounts/5232').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context15.sent;
              res.should.have.status(404);
              res.body.should.have.property('errorMessage').eql('The account with the given number was not found');

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('should allow only admin to delete',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _chai.default.request(_app.default).delete("/api/v1/accounts/".concat(accNum)).set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context16.sent;
              res.should.have.status(403);
              res.body.should.have.property('errorMessage').eql('Forbidden: You are not an admin');

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
  });
});