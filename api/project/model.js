const db = require("../../data/dbConfig.js");
const mappers = require("./mappers.js");

async function getProject() {
  let query = await db("projects as p");
  return query;
}

async function getProjectById(project_id) {
  const newProject = await db("projects").first("*").where({ project_id });
  return newProject;
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
