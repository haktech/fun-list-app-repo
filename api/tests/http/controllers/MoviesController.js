require("mocha");
const sinon = require("sinon");
const should = require("should");
const server = require("../../../app/http/server");
const objectUnderTest = require("../../../app/http/controllers/moviesController");
const movieService = require("../../../app/core/services/movieService");
const listener = server.listen(3003);
const request = require("supertest").agent(listener);

describe("MoviesController", () => {
  const dummyParentContext = {
    response: {},
    query: {
      query: [{ key: "title", value: "Hero" }],
      pageSize: 10,
      sort: { key: "title", direction: "asc" },
      currentPage: 1,
    },
  };

  const testSandbox = sinon.createSandbox();

  const movieServiceMock = testSandbox.mock(movieService);

  afterEach(() => {
    testSandbox.restore();
  });
  // Integration Test
  describe("getMovies", () => {
    it("should get movies", async () => {
      movieServiceMock
        .expects("getMovies")
        .withArgs(dummyParentContext.query)
        .resolves([
          {
            isSeries: false,
            _id: "610f95275aa9a92e507a5c4f",
            title: "Hero",
            desc: "Anybhitn",
            imgPath: "dummyPath",
            trailerPath: "dummyPath",
            videoPath: "dummyPath",
            stars: 5,
            genre: "Comedy",
          },
          {
            isSeries: false,
            _id: "610f95275aa9a92e507a5c4f",
            title: "Avatar",
            desc: "Nice movie",
            imgPath: "dummyPath",
            trailerPath: "dummyPath",
            videoPath: "dummyPath",
            stars: 5,
            genre: "Action",
          },
        ]);

      const expected = [
        {
          isSeries: false,
          _id: "610f95275aa9a92e507a5c4f",
          title: "Hero",
          desc: "Anybhitn",
          imgPath: "dummyPath",
          trailerPath: "dummyPath",
          videoPath: "dummyPath",
          stars: 5,
          genre: "Comedy",
        },
        {
          isSeries: false,
          _id: "610f95275aa9a92e507a5c4f",
          title: "Avatar",
          desc: "Nice movie",
          imgPath: "dummyPath",
          trailerPath: "dummyPath",
          videoPath: "dummyPath",
          stars: 5,
          genre: "Action",
        },
      ].sort();

      await objectUnderTest.getMovies(dummyParentContext);
      should.deepEqual(dummyParentContext.response.body.sort(), expected);
      movieServiceMock.verify();
      testSandbox.restore();
    });

    // API testing
    it("should return 200 when everything is good", async () => {
      testSandbox.stub(movieService, "getMovies").resolves([
        {
          isSeries: false,
          _id: "610f95275aa9a92e507a5c4f",
          title: "Hero",
          desc: "Anybhitn",
          imgPath: "dummyPath",
          trailerPath: "dummyPath",
          videoPath: "dummyPath",
          stars: 5,
          genre: "Comedy",
        },
        {
          isSeries: false,
          _id: "610f95275aa9a92e507a5c4f",
          title: "Avatar",
          desc: "Nice movie",
          imgPath: "dummyPath",
          trailerPath: "dummyPath",
          videoPath: "dummyPath",
          stars: 5,
          genre: "Action",
        },
      ]);
      await request.get("/api/movies").expect(200);
    });
  });
});
