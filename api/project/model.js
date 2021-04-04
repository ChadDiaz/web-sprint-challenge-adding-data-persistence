const db = require("../../data/dbConfig.js");

async function getProject() {
  const projects = await db("projects");
  return projects.map((project) => {
    return {
      ...project,
      project_completed: project.project_completed === 0 ? false : true,
    };
  });
}

async function getProjectById(project_id) {
  const project = await db("projects").first("*").where({ project_id });
  return projects.map((project) => {
    return {
      ...project,
      project_completed: project.project_completed === 0 ? false : true,
    };
  });
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
