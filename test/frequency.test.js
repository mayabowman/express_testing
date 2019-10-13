'use strict'

const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /frequency', () => {
  it('returns 400 response if s param is not provided', () => {
    return supertest(app) 
      .get('/frequency')
      .expect(400, 'Invalid request');
  });

  it('returns a valid json response', () => {
    return supertest(app)
      .get('/frequency')
      .query({s: 'mayabowman'})
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it('returns an object', () => {
    return supertest(app) 
      .get('/frequency')
      .query({s: 'mayabowman'})
      .then(res => {
        expect(res.body).to.be.an('object');
      });
  });

  it('contains unique, average and highest keys', () => {
    return supertest(app)
      .get('/frequency')
      .query({s: 'mayabowman'})
      .then(res => {
        expect(res.body).to.include.keys('unique', 'average', 'highest');
      });
  });

  it('returns expected result for a given string', () => {
    const correctObj = {
      m: 2,
      a: 3,
      y: 1,
      b: 1,
      o: 1,
      w: 1,
      n: 1,
      unique: 7,
      average: 1.42857143,
      highest: 'a'
    };

    return supertest(app)
      .get('/frequency')
      .query({s: 'mayabowman'})
      .then(res => {
        expect(res.body).to.deep.equal(correctObj);
      });
  });
});