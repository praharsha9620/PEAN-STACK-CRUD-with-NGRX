const express = require("express");
const cachePreventer = require("cachePreventer");
const handleError = require("./handleError");
const processRequest = require("./processRequest");

const knexRouter = function ({ knex }) {

  const router = express.Router();
  const singularRoutes = router.route("/:table/:id");
  const pluralRoutes = router.route("/:table");

  pluralRoutes.get(cachePreventer, async function (req, res) {
    try {
      const { table } = processRequest(req);
      const dbRes = await knex(table);
      res.json(dbRes);
    } catch (err) {
      handleError(err, res);
    }
  });

  singularRoutes.get(cachePreventer, async function (req, res) {
    try {
      const { table, idColumn, id } = processRequest(req);
      const dbRes = await knex(table).where(idColumn, id);
      if (dbRes.length > 0) res.json(dbRes[0]);
      else res.status(404).end();
    } catch (err) {
      handleError(err, res);
    }
  });

  singularRoutes.put(async function (req, res) {
    try {
      const { table, idColumn, id } = processRequest(req);
      const dbRes = await knex(table).update(req.body).where(idColumn, id);
      res.json(dbRes);
    } catch (err) {
      handleError(err, res);
    }
  });

  pluralRoutes.post(async function (req, res) {
    try {
      const { table } = processRequest(req);
      const dbRes = await knex(table).insert(req.body);
      res.json(dbRes);
    } catch (err) {
      handleError(err, res);
    }
  });

  singularRoutes.delete(async function (req, res) {
    try {
      const { table, idColumn, id } = processRequest(req);
      const dbRes = await knex(table).del().where(idColumn, id);
      res.json(dbRes);
    } catch (err) {
      handleError(err, res);
    }
  });

  return router;
};

module.exports = knexRouter;
