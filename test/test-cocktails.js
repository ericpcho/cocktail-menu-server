"use strict";

const TEST_DATABASE_URL = "mongodb://localhost/cocktail-menu-test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const { Cocktails } = require("../cocktails");
const { app, runServer } = require("../server");
const faker = require("faker");
const { dbConnect, dbDisconnect } = require("../db-mongoose");
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

let randomId;

function seedData() {
  const seedAlcohol = ["Whiskey", "Vodka", "Rum", "Tequila", "Gin"];

  const arr = [];
  for (let i = 1; i <= 5; i++) {
    arr.push({
      cocktailName: faker.lorem.word(),
      ingredients: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      alcohol: seedAlcohol.pop(),
      baseLiquid: faker.lorem.word(),
      thumbnail: faker.image.imageUrl(),
      recipe: faker.lorem.sentences()
    });
  }
  return Cocktails.insertMany(arr);
}

describe("Cocktails endpoint", () => {
  before(() => {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(() => {
    return seedData();
  });

  afterEach(() => {
    return Cocktails.remove({});
  });

  after(() => {
    return dbDisconnect();
  });

  describe("/api/cocktails", () => {
    it("GET should return all cocktails", () => {
      return chai
        .request(app)
        .get("/api/cocktails")
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("array");
          res.body.length.should.equal(5);
          res.body.forEach(cocktail => {
            cocktail.should.be.an("object");
            cocktail.should.include.keys(
              "_id",
              "cocktailName",
              "ingredients",
              "alcohol",
              "baseLiquid",
              "thumbnail",
              "recipe"
            );
            cocktail._id.should.not.be.null;
            cocktail.ingredients.forEach(ingredient => {
              ingredient.should.be.a("string");
            });
          });
        });
    });
  });
});
