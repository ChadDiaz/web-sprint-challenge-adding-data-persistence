const db = require("../../data/dbConfig.js");

async function getTask() {
  const task = await db("tasks");
  return task.map((task) => {
    return {
      ...task,
      task_completed: task.task_completed === 0 ? false : true,
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
