const router = require('express').Router();
const User = require('../models/UserModel');

function sendErrorMessage(status, res, message) {
  return res.status(status).json({ status: 'fail', message });
}

function sendResponse(status, res, data) {
  return res.status(status).json({ status: 'success', data });
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return sendErrorMessage(400, res, 'All fields are require');
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return sendErrorMessage(401, res, 'Incorrect email or password');
    }

    // 3) If everything ok, send token to client
    sendResponse(200, res, user);
  } catch (e) {
    sendErrorMessage(400, res, e.message);
    console.log(e);
    return;
  }
});

router.post('/createAccount', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return sendErrorMessage(400, res, 'All fields are require');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorMessage(400, res, 'Email already exists');
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    // 3) If everything ok, send token to client
    sendResponse(201, res, newUser);
  } catch (e) {
    sendErrorMessage(400, res, e.message);
    return;
  }
});

module.exports = router;
