class FilterBuilder {
  getFilter(searchCriteria) {
    let mapper = new Map();
    if (!searchCriteria) {
      return mapper;
    }

    if (searchCriteria.query) {
      let query = {};
      for (let keyValue of JSON.parse(searchCriteria.query)) {
        query[`${keyValue.key}`] = keyValue.value;
      }
      mapper.set("query", query);
    }

    if (searchCriteria.sort) {
      const { key, direction } = JSON.parse(searchCriteria.sort);
      mapper.set("sort", [[key, direction]]);
    }

    if (searchCriteria.pageSize) {
      mapper.set("pageSize", Number(searchCriteria.pageSize));

      const skip =
        searchCriteria.currentPage && searchCriteria.currentPage > 1
          ? searchCriteria.currentPage * searchCriteria.pageSize
          : 0;

      mapper.set("skip", skip);
    }

    return mapper;
  }
}

module.exports = new FilterBuilder();
