const teacherModel = require('../models/teacherModel')

const express = require('express'),
  router = express.Router()

/* Route is /teacher */
router.get('/', async (req, res) => {
  try {
    /* Get data from MongoDB */
    const allUsers = await userModel.find({})
    const numUsers = allUsers.length
    /* Create an empty array the size needed so no re-allocations will be needed
       at any time as might happen with array.push() */
    let reversedUsers = new Array(numUsers)
    /* The loop walks backwards from the last index value to the first pulling out that
       array value with the i index and filling the array from the front.
       This is Big O(N) */
    for (let i = numUsers - 1; i >= 0; i--) {
      reversedUsers[numUsers - i - 1] = allUsers[i]
    }

    res.status(200).json({"msg": "Success", "allUsers": reversedUsers})
  } catch (error) {
      res.status(200).json({"msg": "Error", "err": error})
  }
})

module.exports = router