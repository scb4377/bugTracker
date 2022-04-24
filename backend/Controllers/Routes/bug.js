const route = require("express").Router();
const Bug = require("../../Models/bugModel");
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Create bug
route.post("/createBug", async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add text to fields");
  }

  const { name, status, details, assigned, author, comments } = req.body;
  const steps = Object.values(req.body.steps);
  const bug = await Bug.create({
    name,
    status,
    details,
    steps,
    assigned,
    author,
    comments,
  });

  res.status(200).json(bug);
});

// Add comment
route.put("/leaveComment/:id", async (req, res) => {
  const today = new Date()
  // console.log(today.format('dd-m-yy'))
  // Destructure from body
  const { user, comment } = req.body;
  // Put in array to push to comments
  let arr = [user, comment, today];
  // Find Bug
  const bug = await Bug.findById(req.params.id);

  if (!bug) {
    res.status(400);
    throw new Error("Bug not found");
  }

  // Update bug
  let updatedBug = await Bug.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { $each: [arr] } } },
    { new: true }
  );

  res.json(updatedBug);
});

// Update bug
route
  .put("/updateBug/:id", async (req, res) => {
    const { name, status, details, steps, assigned, author } =
      req.body;
    const stepsArr = Object.values(steps);
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      res.status(400);
      throw new Error("Bug not found");
    }

    const checkForRestOfUpdates = () => {
      let tempBug = null;

      tempBug = Bug.findByIdAndUpdate(
        req.params.id,
        { name, details, status, assigned, author, steps: stepsArr },
        { new: true }
      );

      return tempBug;
    };
    let updatedBug = null;

    if (name || details || author || assigned || status || steps) {
      updatedBug = await checkForRestOfUpdates();
    }

    res.status(200).json(updatedBug);
  })

  // Get bugs
  .get("/", async (req, res) => {
    const bugs = await Bug.find();

    res.status(200).json(bugs);
  });

module.exports = route;
