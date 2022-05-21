const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
