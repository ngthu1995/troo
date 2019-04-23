var expect = require("chai").expect;
var assert = require("assert");
var request = require("request");
var supertest = require("supertest");

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("GET /", function() {
  // #1 should return home page

  it("should return home page", function(done) {
    // calling home page api
    request.get("/", (err, res) => {
      expect(200);
      done();
    });
  });
});

describe("GET /abc", function() {
  // #1 should return 404

  it("should return home 404", function(done) {
    // calling home page api with invalid query
    request.get("/abc", (err, res) => {
      expect(404);
      done();
    });
  });
});

describe("GET /shop", function() {
  // #1 should return 404

  it("should return shop page", function(done) {
    // calling home page api
    request.get("/shop", (err, res) => {
      expect(200);
      done();
    });
  });
});

describe("GET /product/articles", function() {
  // #1 should return 404

  it("should return products page", function(done) {
    // calling home page api
    request.get(
      "/product/article?sortBy=createdAt&order=desc&limit=100",
      (err, res) => {
        expect(200);
        done();
      }
    );
  });
});

describe("GET /product/articles_by_id", function() {
  // #1 should return 404

  it("should return inidvidual product page", function(done) {
    // calling home page api
    request.get(
      "/product/articles_by_id?id=5b2d3648ca6a03cd33af924c&type=array",
      (err, res) => {
        expect(200);
        done();
      }
    );
  });
});

describe("GET /product/lifestyles", function() {
  // #1 should return 404

  it("should return lifestyle page", function(done) {
    // calling home page api
    request.get("product/lifestyles", (err, res) => {
      expect(200);
      done();
    });
  });
});
