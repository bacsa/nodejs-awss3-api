//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = require('assert');
// const server = require('../app');


describe('test', () => {
  it('should return a string', () => {
    expect('awss3api').to.equal('awss3api');
  });
});