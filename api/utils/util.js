export default class Util {
  constructor() {
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(status, data) {
    this.status = status;
    this.data = data;
    this.type = 'success';
  }

  setError(status, message) {
    this.status = status;
    this.message = message;
    this.type = 'error';
  }

  send(res) {
    if (this.type === 'success') {
      return res.status(this.status).json({
        status: this.status,
        data: this.data,
      });
    }
    // Else return error
    return res.status(this.status).json({
      status: this.status,
      message: this.message,
    });
  }
}