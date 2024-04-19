require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
const allowedOrigins = [
  "https://localhost:5173",
  "https://web-crafter-hub.vercel.app",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`db connected at ${PORT}`);
  })
  .catch((err) => {
    console.log(err, "Db not connected");
  });

const secretkey = JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json("token not available");
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const tokenCreation = (user) => {
  return jwt.sign({ user }, secretkey, { expiresIn: "1h" });
};

const userMessage = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", userMessage);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
  },
  { timestamps: true }
);

const apiUser = mongoose.model("apiUser", userSchema);

app.get("/", (req,res)=> {
  res.send(`Welcome to web crafter, visti here: ${"https://web-crafter-hub.vercel.app"}`)
})
app.post("/api/register", async (req, res) => {
  const { username, fullname, email, password, dob } = req.body;

  const existingUser = await apiUser.findOne({ email: email });
  if (existingUser) {
    res.json("User already exists, Please Login");
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await apiUser.create({
      username,
      fullname,
      email,
      password: hashPassword,
      dob,
    });

    const token = tokenCreation(newUser);
    res.send(token);
  } catch (error) {
    res.status(500).json("Error registering user");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await apiUser.findOne({ email: email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json("Invalid password");
    }

    const token = tokenCreation(user);
    res.send(token);
  } catch (error) {
    res.status(500).json("Error logging in");
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const userFeedback = await Message.create({
      name,
      email,
      subject,
      message,
    });
    res.send("Successfully message recieved");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const user = await apiUser.find({});
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
