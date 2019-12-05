/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('https://my-banka.herokuapp.com', () => {
  it('display Welcome to Banka!', async () => {
    const res = await chai.request(server).get('/');
    res.should.have.status(200);
  });
});
