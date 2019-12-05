"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _accountRoutes = _interopRequireDefault(require("./routes/accountRoutes"));

var _transactionRoutes = _interopRequireDefault(require("./routes/transactionRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// routes
var server = (0, _express.default)();
server.use((0, _cors.default)());
server.use(_bodyParser.default.json());
server.use(_bodyParser.default.urlencoded({
  extended: false
})); // swagger

server.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
server.get('/', function (req, res) {
  res.send('Welcome to Banka!');
});
server.use('/api/v1/auth', _authRoutes.default); // server.use('/api/v1/users', userRoutes);
// server.use('/api/v1/accounts', accountRoutes);
// server.use('/api/v1/transactions', transactionRoutes);

var port = process.env.PORT || 3001;
server.listen(port, function () {
  console.log("server is listening on port ".concat(port, "!"));
}); // Export for testing

var _default = server;
exports.default = _default;