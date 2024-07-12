const express = require('express');
const app = express();
const router = express.Router();
const authenticate = require('../middleware/middleware');
const User = require('../models/user');



module.exports = router;