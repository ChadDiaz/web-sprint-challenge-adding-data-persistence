const router = require("express").Router();
const Task = require("./model.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Task.getTask();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const task = req.body;

  if (!task.task_description || !task.task_completed) {
    const err = new Error();
    err.status = 400;
    err.message = `task must contain name and if completed`;
    next(err);
  } else {
    try {
      const newTask = await Task.addTask(task);
      res.status(200).json(newTask);
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
