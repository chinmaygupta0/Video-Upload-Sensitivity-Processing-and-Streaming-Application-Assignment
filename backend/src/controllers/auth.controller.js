const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password || !organizationName) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create organization
    const organization = await Organization.create({
      name: organizationName
    });

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      organizationId: organization._id
    });

    // 6️⃣ Update organization createdBy
    organization.createdBy = user._id;
    await organization.save();

    // 7️⃣ Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, organizationId: organization._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 8️⃣ Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server error during registration"
    });
  }
};


/**
 * LOGIN USER
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, organizationId: user.organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server error during login"
    });
  }
};
