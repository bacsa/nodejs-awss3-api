//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';
// Config
const environment = process.env.NODE_ENV;
const api_url = process.env.API_URL || 'http://localhost:4000/api/';
const port = process.env.NODE_PORT || '4000';
const appName = process.env.APP_NAME || 'AWSS3 API';

const router = require('express').Router();

var awss3Controller = require('../controllers/awss3.controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Buckets', () => {
    beforeEach((done) => { //Before each test we empty the database
        chai.request(api_url + 's3')
            .delete('/bucket/teszteles-111')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            }); 
    });
/*
  * Test the /GET route
  */
  describe('/GET Buckets', () => {
      it('it should GET all the buckets', (done) => {
        chai.request(api_url + 's3')
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST Create Bucket', () => {
      it('it should create a new Bucket', (done) => {
          let bucket = {
              bucketname: "teszteles-111"
          }
        chai.request(api_url + 's3')
            .post('/')
            .send(bucket)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });

  });

});