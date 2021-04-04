const router = require("express").Router();
const Project = require("./model.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Project.getProject();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const project = req.body;

  if (!project.project_name) {
    console.log(1);
    const err = new Error();
    err.status = 400;
    err.message = `project must contain project_name`;
    next(err);
  } else {
    try {
      const newProject = await Project.addProject(project);
      res.status(200).json(newProject);
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
