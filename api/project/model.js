const db = require("../../data/dbConfig.js");

function getProject() {
  return db("projects");
}

async function getProjectById(project_id) {
  return await db("projects").first("*").where({ project_id });
}

async function addProject(body) {
  const newId = await db("projects").insert(body);
  return getProjectById(newId[0]);
}

module.exports = {
  getProject,
  getProjectById,
  addProject,
};
