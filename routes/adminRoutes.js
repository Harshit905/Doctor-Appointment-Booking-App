const express = require("express");
const authmiddleware = require('../middlewares/authmiddleware')
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authmiddleware,async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send({
        success: true,
        message: "All Users Data List",
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while fetching users data",
        error,
      });
    }
  });

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authmiddleware,  async (req, res) => {
    try {
      const doctors = await Doctor.find({});
      res.status(200).send({
        success: true,
        message: "All Doctors Data List",
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while fetching Doctors data",
        error,
      });
    }
  });

// POST ACCOUNT STATUS
router.post( "/changeAccountStatus",authmiddleware,async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "Approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  });

module.exports = router;
