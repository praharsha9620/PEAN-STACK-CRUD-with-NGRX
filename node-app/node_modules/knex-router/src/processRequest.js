const processRequest = function processRequest (req) {
  return {
    id: req.params["id"], table: req.params["table"], idColumn: req.query["idColumn"] || "id"
  }
};

module.exports = processRequest;
