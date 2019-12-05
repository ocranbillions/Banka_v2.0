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
describe('USERS', function () {
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
  describe('GET api/v1/users', function () {
    it('Admin/staff should get all users',
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
              return _chai.default.request(_app.default).get('/api/v1/users/').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context.sent;
              res.should.have.status(200);
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.be.a('object');
              res.body.data[0].id.should.equal(1);
              res.body.data[0].email.should.equal('mikejones@gmail.com');
              res.body.data[0].firstname.should.equal('Mike');
              res.body.data[0].lastname.should.equal('Jones');
              res.body.data[0].type.should.equal('staff');
              res.body.data[0].isadmin.should.equal(true);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('Should NOT get access to /users if user is not logged in',
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
              return _chai.default.request(_app.default).get('/api/v1/users/');

            case 2:
              res = _context2.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('You must be logged in to access this route');

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('Should NOT authorize user with invalid token',
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
              return _chai.default.request(_app.default).get('/api/v1/users/').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context3.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Invalid token');

            case 6:
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
              return _chai.default.request(_app.default).get('/api/v1/users/').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context4.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Auth failed!');

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('Should deny non-staff',
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
              return _chai.default.request(_app.default).get('/api/v1/users/').set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context5.sent;
              res.should.have.status(403);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Forbidden: The requested page can only be accessed by a staff');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('GET api/v1/users/1', function () {
    it('Admin/staff should can get user by id',
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
              return _chai.default.request(_app.default).get('/api/v1/users/1').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context6.sent;
              res.should.have.status(200);
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.id.should.equal(1);
              res.body.data.email.should.equal('mikejones@gmail.com');
              res.body.data.firstname.should.equal('Mike');
              res.body.data.lastname.should.equal('Jones');
              res.body.data.type.should.equal('staff');
              res.body.data.isadmin.should.equal(true);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('Should NOT get access to /users if user is not logged in',
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
              return _chai.default.request(_app.default).get('/api/v1/users/1');

            case 2:
              res = _context7.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('You must be logged in to access this route');

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('Should NOT authorize user with invalid token',
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
              return _chai.default.request(_app.default).get('/api/v1/users/1').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context8.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Invalid token');

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('Should fail if it lacks valid authentication',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/users/1').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context9.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Auth failed!');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('GET api/v1/users/joe@gmail.com/accounts', function () {
    it('Admin/staff or account owner should get their accounts',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/users/joe@gmail.com/accounts').set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context10.sent;
              res.should.have.status(200);
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.be.a('object');

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('Should NOT get access to /users if user is not logged in',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/users/joe@gmail.com/accounts');

            case 2:
              res = _context11.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('You must be logged in to access this route');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    it('Should NOT authorize user with invalid token',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai.default.request(_app.default).get('/api/v1/users/joe@gmail.com/accounts').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context12.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Invalid token');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('Should fail if it lacks valid authentication',
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
              return _chai.default.request(_app.default).get('/api/v1/users/joe@gmail.com/accounts').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context13.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Auth failed!');

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  var newUserId;
  describe('POST/DELETE /api/v1/users', function () {
    it('Admin should create a new user/staff',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var newStaff, res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              newStaff = {
                firstName: 'Shola',
                lastName: 'Stevens',
                email: 'shola_steve@gmail.com',
                isAdmin: false,
                password: 'secret'
              };
              _context14.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/users/').set('Authorization', "Bearer ".concat(adminToken)).send(newStaff);

            case 3:
              res = _context14.sent;
              res.should.have.status(201);
              res.body.should.have.property('data');
              res.body.data.email.should.equal('shola_steve@gmail.com');
              res.body.should.have.property('status');
              newUserId = res.body.data.id;

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('Should not create a new staff if data is incomplete',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var newStaff, res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              newStaff = {
                firstName: '',
                lastName: 'Stevens',
                email: '',
                isAdmin: true,
                password: 'secret'
              };
              _context15.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/users/').set('Authorization', "Bearer ".concat(adminToken)).send(newStaff);

            case 3:
              res = _context15.sent;
              res.should.have.status(400);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.be.a('array');
              res.body.errorMessage[0].should.equal('name requires alphabets only - min(2)');
              res.body.errorMessage[1].should.equal('provide a valid email');

            case 9:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it('Should NOT create a new staff if email already exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var newStaff, res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              newStaff = {
                firstName: 'Samson',
                lastName: 'Ogbonna',
                email: 'samo@gmail.com',
                password: '123456'
              };
              _context16.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/auth/signup').send(newStaff);

            case 3:
              res = _context16.sent;
              res.should.have.status(409);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Email already used');

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('Admin should be able to delete a user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var res;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return _chai.default.request(_app.default).delete("/api/v1/users/".concat(newUserId)).set('Authorization', "Bearer ".concat(adminToken));

            case 2:
              res = _context17.sent;
              res.should.have.status(200);
              res.body.should.have.property('status');
              res.body.should.have.property('message');
              res.body.message.should.equal('User successfully deleted');

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('Client shount not be able to delete a user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var res;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _chai.default.request(_app.default).delete("/api/v1/users/".concat(newUserId)).set('Authorization', "Bearer ".concat(clientToken));

            case 2:
              res = _context18.sent;
              res.should.have.status(403);
              res.body.should.have.property('status');
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Forbidden: You are not an admin');

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('Should NOT get access to /users if user is not logged in',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var res;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/users/');

            case 2:
              res = _context19.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('You must be logged in to access this route');

            case 6:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('Should NOT authorize user with invalid token',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/users/').set('Authorization', '$INVALIDTOKEN');

            case 2:
              res = _context20.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Invalid token');

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    it('Should fail if it lacks valid authentication',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var res;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return _chai.default.request(_app.default).post('/api/v1/users/').set('Authorization', 'Bearer $sometoken');

            case 2:
              res = _context21.sent;
              res.should.have.status(401);
              res.body.should.have.property('errorMessage');
              res.body.errorMessage.should.equal('Auth failed!');

            case 6:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
  });
});