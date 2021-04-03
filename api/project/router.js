const router = require("express").Router();
const Project = require("./model.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Project.getResource();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const post = req.body;
  try {
    const newPost = await Project.addProject(post);
    if (!newPost.project_name) {
      const err = new Error();
      err.status = 400;
      err.message = "resource must contain a resource_name";
      next(err);
    } else {
      res.status(201).json(newPost);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
