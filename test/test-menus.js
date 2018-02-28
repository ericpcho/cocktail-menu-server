"use strict";

const TEST_DATABASE_URL = "mongodb://localhost/cocktail-menu-test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const { Menus } = require("../menus");
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
  return Menus.insertMany(arr).then(res => {
    randomId = res[0]._id;
  });
}

describe("Menus endpoint", () => {
  before(() => {
    return dbConnect(TEST_DATABASE_URL);
  });

  beforeEach(() => {
    return seedData();
  });

  afterEach(() => {
    return Menus.remove({});
  });

  after(() => {
    return dbDisconnect();
  });

  describe("/api/menus", () => {
    it("POST should submit all menuItems to the database", () => {
      return chai
        .request(app)
        .post("/api/menus")
        .send({
          menuItems: [
            {
              cocktailName: faker.lorem.word(),
              ingredients: [
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word()
              ],
              alcohol: "testAlcohol",
              baseLiquid: faker.lorem.word(),
              thumbnail: faker.image.imageUrl(),
              recipe: faker.lorem.sentences()
            },
            {
              cocktailName: faker.lorem.word(),
              ingredients: [
                faker.lorem.word(),
                faker.lorem.word(),
                faker.lorem.word()
              ],
              alcohol: "Vodka",
              baseLiquid: faker.lorem.word(),
              thumbnail: faker.image.imageUrl(),
              recipe: faker.lorem.sentences()
            }
          ]
        })
        .then(res => {
          res.should.have.status(201);
          return Menus.find({ alcohol: "testAlcohol" });
        });
    });

    it("GET BY ID retrieve a single menu item from the database", () => {
      return chai
        .request(app)
        .get(`/api/menus/${randomId}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("object");
          res.body.should.include.keys("_id", "menuItems");
          res.body._id.should.not.be.null;
          res.body.menuItems.forEach(menuItem => {
            menuItem.should.be.an("object");
          });
        });
    });
  });
});
