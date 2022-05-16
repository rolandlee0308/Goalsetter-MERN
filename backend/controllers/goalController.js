const asyncHandler = require('express-async-handler')
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
const getGoals = asyncHandler(async (req,res) => {
    res.status(200).json({message:'get goals'})
})

/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
 const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text){
      res.status(400)
      throw new Error('Please add a text field')
    }
    res.status(200).json({message:'set goals'})
})
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
 const updateGoal = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})
/**
 * It's a function that takes in a request and a response object and returns a json object with a message property.
 * @param req - The request object. This contains information about the HTTP request that raised the event.
 * @param res - The response object.
 * @access private
 */
 const deleteGoal = asyncHandler(async (req,res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}