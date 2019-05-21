//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';
// Config
const environment = process.env.NODE_ENV;
const s3_api_url = process.env.API_URL || 'http://localhost:4000/api/s3';
const port = process.env.NODE_PORT || '4000';
const appName = process.env.APP_NAME || 'AWSS3 API';

const router = require('express').Router();

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;


chai.use(chaiHttp);
//Our parent block
describe('Buckets', () => {
    before((done) => { //Before each test we empty the database
        done();
    });
/*
  * Test the /GET route
  */
  describe('/GET Buckets', () => {
      it('it should GET all the buckets', (done) => {
        chai.request(s3_api_url)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                
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
        chai.request(s3_api_url)
            .post('/')
            .send(bucket)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
      });

  });

});