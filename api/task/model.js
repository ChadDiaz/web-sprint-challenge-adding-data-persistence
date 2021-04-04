const db = require("../../data/dbConfig.js");

async function getTask() {
  const tasks = await db
    .select(
      "tasks.task_id",
      "tasks.task_description",
      "tasks.task_notes",
      "tasks.task_completed",
      "projects.project_name",
      "projects.project_description"
    )
    .from("tasks")
    .join("projects", "tasks.project_id", "=", "projects.project_id");

  return tasks.map((task) => {
    return {
      ...task,
      task_completed: task.task_completed == 0 ? false : true,
    };
  });
}

async function getTaskById(id) {
  const [task] = await db("tasks").where({ task_id: id });
  return {
    ...task,
    task_completed: task.task_completed == 0 ? false : true,
  };
}

async function addTask(body) {
  const newId = await db("tasks").insert(body);
  return getTaskById(newId[0]);
}

module.exports = {
  getTask,
  getTaskById,
  addTask,
};
