const db = require("../../data/dbConfig.js");

function getResource() {
  return db("resources");
}

async function getResourceById(resource_id) {
  return await db("resources").first("*").where({ resource_id });
}

async function addResource(body) {
  const newId = await db("resources").insert(body);
  return getResourceById(newId[0]);
}

module.exports = {
  getResource,
  getResourceById,
  addResource,
};
