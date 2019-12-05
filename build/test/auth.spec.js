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
var adminLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret'
};
describe('AUTH', function () {
  before(function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signin').send(adminLogin).end(function (err, res) {
      if (err) done(err);
      adminToken = res.body.data.token;
      done();
    });
  }); // before((done) => {
  //   const user = {
  //     firstName: 'Darth',
  //     lastName: 'Vader',
  //     email: 'darthsss@vader.com',
  //     password: 'Pasusword12',
  //     confirmPassword: 'Pasusword12',
  //   };
  //   chai
  //     .request(app)
  //     .post(`${API_PREFIX}/signup`)
  //     .send(user)
  //     .end((err, res) => {
  //       const { token } = res.body.user;
  //       validUserToken = token;
  //       done();
  //     });
  // });

  describe('/api/v1/auth/signup', function () {
    it('Should register a new user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var signupDetails, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              signupDetails = {
                firstName: 'Michael',
                lastName: 'Bridges',
                email: 'michaelbridges2019@yahoo.com',
                password: 'secretMike'
              };
              _context.next = 3;
              return _chai.default.request(_app.default).post('/api/v1/auth/signup').send(signupDetails);

            case 3:
              res = _context.sent;
              res.body.should.have.property('data');
              res.body.data.should.have.property('email').eql('michaelbridges2019@yahoo.com');
              res.body.data.should.have.property('token');
              res.should.have.status(201);
              newUserId = res.body.data.id;

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))); // it('Should NOT register a user if email exists', async () => {
    //   const signupDetails = {
    //     firstName: 'Edward',
    //     lastName: 'Smart',
    //     email: 'edd@yahoo.com',
    //     password: 'eddeddy',
    //   };
    //   const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
    //   res.should.have.status(409);
    //   res.body.should.have.property('errorMessage');
    //   res.body.errorMessage.should.equal('Email already used');
    // });
    // it('Should NOT register user with incomplete form data', async () => {
    //   const signupDetails = {
    //     firstName: '',
    //     lastName: 'Bridges',
    //     email: 'mikeBrid@gmail.com',
    //     password: 'secretMike',
    //   };
    //   const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
    //   res.should.have.status(400);
    //   res.body.should.have.property('errorMessage');
    //   res.body.errorMessage.should.be.a('array');
    //   res.body.errorMessage[0].should.equal('name requires alphabets only - min(2)');
    // });
    // it('Should NOT register user with incorrect form data', async () => {
    //   const signupDetails = {
    //     firstName: '   ',
    //     lastName: '12345',
    //     email: 'mik.com',
    //     password: 'secretMike',
    //   };
    //   const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
    //   res.should.have.status(400);
    //   res.body.should.have.property('errorMessage');
    //   res.body.errorMessage.should.be.a('array');
    //   res.body.errorMessage[2].should.equal('provide a valid email');
    // });
  }); // describe('/api/v1/auth/signin', () => {
  //   it('Should signin a user', async () => {
  //     const loginDetails = {
  //       email: 'samo@gmail.com',
  //       password: 'mysecret',
  //     };
  //     const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
  //     res.should.have.status(201);
  //     res.body.should.have.property('data');
  //     res.body.data.email.should.equal('samo@gmail.com');
  //     res.body.data.should.have.property('token');
  //   });
  //   it('Should NOT signin a user with incorrect login details', async () => {
  //     const loginDetails = {
  //       email: 'samo@gmail.com',
  //       password: 'incorrect-password',
  //     };
  //     const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
  //     res.should.have.status(400);
  //     res.body.should.have.property('errorMessage');
  //     res.body.errorMessage.should.equal('Incorrect login information');
  //   });
  //   it('Should NOT signin with incomplete form data', async () => {
  //     const loginDetails = {
  //       email: '',
  //       password: '',
  //     };
  //     const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
  //     res.should.have.status(400);
  //     res.body.should.have.property('errorMessage');
  //     res.body.errorMessage.should.be.a('array');
  //     res.body.errorMessage[0].should.equal('provide a valid email');
  //     res.body.errorMessage[1].should.equal('"password" is not allowed to be empty');
  //   });
  // });
});