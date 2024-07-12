const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/user')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/register", async (req, res) => {
    const { name, email, password} = req.body;
    console.log('inside register');
    console.log(name, email, password);

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const response = await User.create({
            name,
            email,
            password: encryptedPassword,
            
        });
        return res.json({ success: "User Registered Successfully" });
    } catch (error) {
        // console.log(error);
        res.status(400).send({ message: error });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email +" "+password);

    try {
        const exist = await User.findOne({ email });
        if (!exist) {
            console.log("User does not exist");
            return res.status(400).send("User does not exist");
        }

        const match = await bcrypt.compare(password, exist.password);
        if (!match) {
            console.log("Password does not match");
            return res.status(400).send("Password does not match"); 
        }

        const token = jwt.sign({ email: exist.email, name: exist.name ,id:exist._id}, process.env.JWT_SECRET);
        console.log("Login successful");
        return res.send({
            msg: "Login Successfully",
            data: token
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: "error",
            msg: "An error occurred while login" 
        });
    }
});




module.exports = router;
