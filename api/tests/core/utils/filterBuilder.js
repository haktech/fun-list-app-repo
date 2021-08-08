const sinon = require("sinon");
const should = require("should");
const objectUnderTest = require("../../../app/core/utils/filterBuilder");
const testSandbox = sinon.createSandbox();

describe("FilterBuilder", () => {
  describe("getFilter", () => {
    beforeEach(() => {
      testSandbox.useFakeTimers();
    });

    afterEach(() => {
      testSandbox.restore();
    });

    it("should return filters", () => {
      const providedQuery = {
        query: '[{ "key": "title", "value": "Hero" }]',
        pageSize: 10,
        sort: '{ "key": "title", "direction": "asc" }',
        currentPage: 1,
      };

      const expectedFilter = new Map();
      let query = {};
      query["title"] = "Hero";
      expectedFilter.set("query", query);
      expectedFilter.set("sort", [["title", "asc"]]);
      expectedFilter.set("pageSize", 10);
      expectedFilter.set("skip", 0);

      /* act */
      const actual = objectUnderTest.getFilter(providedQuery);
      /* assert */
      should.deepEqual(actual, expectedFilter);
    });
  });
});
