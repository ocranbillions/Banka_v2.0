/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/app';

chai.use(chaiHttp);
const should = chai.should();

describe('/', () => {
  it('display Welcome to Banka!', async () => {
    const res = await chai.request(server).get('/');
    res.should.have.status(200);
  });
});
