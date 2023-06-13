const authMiddleware = require("../middlewares/authMiddleware");
const Report = require("../models/reportModel");
const router = require("express").Router();

//add attempt
router.post("/add-attempt", authMiddleware, async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.send({
      message: "Attempt saved",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get all attempts

router.post("/get-all-attempts", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find();
    res.send({
      message: "Attempts fetched",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//get all attempts by 1 user
router.post("/get-all-attempts-by-user", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId });
    res.send({
      message: "Attempts fetched",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router