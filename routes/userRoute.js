const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const authmiddleware = require('../middlewares/authmiddleware')
const { validateTeacherRegisterInput } = require("../validation/register");
router.post('/register', async (req, res) => {
    try {
        // Form validation
        const { errors, isValid } = validateTeacherRegisterInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(200).send(errors);
        }

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "User Exists Already", success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({ message: "User created successfully", success: true })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating user", success: false, error })
    }
})

router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(200).send({ message: "Password is Incorrect", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res.status(200).send({ message: "Login Successful", success: true, data: token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Logging in", success: false, error });
    }
});

router.post('/get-user-by-id', authmiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        const userInfo = user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: "User dose not Exist", success: false });

        }
        else {
            return res.status(200).send({
                success: true, data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Getting User Info", success: false, error });
    }
})

router.post('/apply-doctor-account', authmiddleware, async (req, res) => {
    try {
        const newdoctor = new Doctor({ ...req.body, status: "Pending" });
        const savedDoctor = await newdoctor.save();
        console.log('Saved Doctor:', savedDoctor);
        const adminUser = await User.findOne({ isAdmin: true });
        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a Doctor Account`,
            data: {
                doctorId: newdoctor._id,
                name: newdoctor.firstName + " " + newdoctor.lastName
            },
            onClickPath: "/admin/doctors"
        })
        const updatedUser = await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        updatedUser.password = undefined;
        console.log('Updated User:', updatedUser);
        res.status(200).send({
            success: true,
            message: "Doctor Account Applied Successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Applying Doctor Account", success: false, error })
    }
})

router.post('/mark-all-notifications-as-seen', authmiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications)
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error marking all as seen", success: false, error })
    }
})

router.post('/delete-all-notifications', authmiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Deleted all notifications",
            data: updatedUser
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Deleting all notifications", success: false, error })
    }
})
module.exports = router;