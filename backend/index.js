// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.use(cookieParser());
// const allowedOrigins = [
//   "https://web-crafter-hub.vercel.app",
//   "http://localhost:5173",
// ];
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// const MONGODB_URI = process.env.MONGODB_URI;
// const JWT_SECRET = process.env.JWT_SECRET;
// const PORT = process.env.PORT || 3000;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-image_profile_pic-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// app.use(express.static(path.join(__dirname, "public")));

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log(`db connected at ${PORT}`);
//   })
//   .catch((err) => {
//     console.log(err, "Db not connected");
//   });

// const secretkey = JWT_SECRET;

// const protectedRoute = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.send("token not available");
//   }

//   try {
//     const decoded = jwt.verify(token, secretkey);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: "Invalid token" });
//   }
// };

// const tokenCreation = (res, userID) => {
//   return jwt.sign({ userID }, secretkey, { expiresIn: "1h" });
// };

// const userMessage = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", userMessage);

// const userSchema = mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//     },
//     profilePic: {
//       type: String,
//       default: "",
//     },
//     blogs: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Blog",
//         default: [],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const CrafterUser = mongoose.model("CrafterUser", userSchema);

// const blogschema = new mongoose.Schema(
//   {
//     blogPic: {
//       type: String,
//       default: "",
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     title: String,
//     city: String,
//     content: String,
//   },
//   { timestamps: true }
// );

// const Blog = mongoose.model("Blog", blogschema);

// app.get("/", (req, res) => {
//   const link = "https://web-crafter-hub.vercel.app";
//   res.send(
//     `Welcome to web crafter, Visit this <a href="${link}">${link}</a> or copy and paste it into your web URL.`
//   );
// });

// app.post("/api/signup", async (req, res) => {
//   const { fullName, email, password, confirm_password, gender } = req.body;

//   try {
//     const user = await CrafterUser.findOne({ email });
//     if (user) {
//       return res.status(400).send("User already registered. Please login.");
//     }
//     if (password !== confirm_password) {
//       res.status(422).send("password not matched");
//     }

//     const boypic = "https://avatar.iran.liara.run/public/boy";
//     const girlpic = "https://avatar.iran.liara.run/public/girl";

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await CrafterUser.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       confirm_password: hashedPassword,
//       gender,
//       profilePic: gender === "male" ? boypic : girlpic,
//     });

//     const token = tokenCreation(res, newUser._id);

//     res.status(201).send(token);
//     console.log(newUser);
//   } catch (error) {
//     console.error("Error in Signup:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await CrafterUser.findOne({ email: email });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     const matchPassword = await bcrypt.compare(password, user.password);
//     if (!matchPassword) {
//       return res.status(401).send("Invalid password");
//     }

//     const token = tokenCreation(res, user._id);
//     res.send(token);
//   } catch (error) {
//     res.status(500).send("Error logging in");
//   }
// });

// // -------------------------------------------------------------------------------------------------------------------------------------------------------

// app.get("/profile/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     // console.log(userId);
//     const user = await CrafterUser.findById(userId).populate("blogs");
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send(user);
//     console.log("profile data:", user);
//   } catch (error) {
//     console.log("Error in profile route:", error);
//     res.status(500).send("Error in profile route: " + error.message);
//   }
// });

// app.post("/createBlog", upload.single("blogFile"), async (req, res) => {
//   const { title, city, content, userId } = req.body;
//   console.log(req.body);

//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   try {
//     let user = await CrafterUser.findById(userId);
//     if (!user) {
//       res.send("user not found");
//     }
//     const newBlog = await Blog.create({
//       title,
//       author: userId,
//       city,
//       content,
//       blogPic: req.file.filename.toLowerCase(),
//     });

//     await CrafterUser.findByIdAndUpdate(userId, {
//       $push: { blogs: newBlog._id },
//     });

//     res.status(200).send(newBlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating blog");
//   }
// });

// app.get("/edit/:id", async (req, res) => {
//   try {
//     // console.log("Edit route ID: ", req.params.id);
//     const blog = await Blog.findById(req.params.id);
//     res.send(blog);
//   } catch (error) {
//     console.log("Error in edit route:", error);
//     res.status(500).send("Error in edit route: " + error.message);
//   }
// });

// app.patch("/update/:id", upload.single("blogFile"), async (req, res) => {
//   try {
//     // console.log("Update route ID: ", req.params.id);
//     const blogId = req.params.id;
//     const { title, city, content } = req.body;
//     const blogPic = req.file.filename;
//     console.log(req.file);

//     if (!blogPic && !title && !city && !content) {
//       return res.status(400).send("No fields provided for update");
//     }

//     const updatedBlogFields = {};
//     if (blogPic) updatedBlogFields.blogPic = blogPic;
//     if (title) updatedBlogFields.title = title;
//     if (city) updatedBlogFields.city = city;
//     if (content) updatedBlogFields.content = content;
//     const updatedblog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         ...(blogPic && { blogPic }),
//         ...(title && { title }),
//         ...(city && { city }),
//         ...(content && { content }),
//       },
//       { new: true }
//     );

//     if (!updatedblog) {
//       return res.status(404).send("User not found");
//     }

//     res.send(updatedblog);
//   } catch (error) {
//     console.log("Error in profile route:", error);
//     res.status(500).send("Error in profile route");
//   }
// });

// app.delete("/delete/:id", async (req, res) => {
//   try {
//     // console.log("Delete route ID: ", req.params.id);
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     res.status(200).send("Blog deleted");
//   } catch (error) {
//     console.log("Error in profile route:", error);
//     res.status(500).send("Error in profile route: " + error.message);
//   }
// });

// // -------------------------------------------------------------------------------------------------------------------------------------------------------

// app.post("/api/contact", async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   try {
//     const userFeedback = await Message.create({
//       name,
//       email,
//       subject,
//       message,
//     });
//     res.send("Successfully message recieved");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/api/data", async (req, res) => {
//   try {
//     const user = await CrafterUser.find({});
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
const allowedOrigins = [
  "https://web-crafter-hub.vercel.app",
  "http://localhost:5173",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-image_profile_pic-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`db connected at ${PORT}`);
  })
  .catch((err) => {
    console.error("Db not connected:", err);
  });

const secretkey = JWT_SECRET;

const protectedRoute = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send("token not available");
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

const tokenCreation = (res, userID) => {
  return jwt.sign({ userID }, secretkey, { expiresIn: "1h" });
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
    fullName: {
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
    gender: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const CrafterUser = mongoose.model("CrafterUser", userSchema);

const blogschema = new mongoose.Schema(
  {
    blogPic: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrafterUser",
    },
    title: String,
    city: String,
    content: String,
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogschema);

app.get("/", (req, res) => {
  const link = "https://web-crafter-hub.vercel.app";
  res.send(
    `Welcome to web crafter, Visit this <a href="${link}">${link}</a> or copy and paste it into your web URL.`
  );
});

app.post("/api/signup", async (req, res) => {
  const { fullName, email, password, confirm_password, gender } = req.body;

  try {
    const user = await CrafterUser.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered. Please login.");
    }
    if (password !== confirm_password) {
      res.status(422).send("password not matched");
    }

    const boypic = "https://avatar.iran.liara.run/public/boy";
    const girlpic = "https://avatar.iran.liara.run/public/girl";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await CrafterUser.create({
      fullName,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boypic : girlpic,
    });

    const token = tokenCreation(res, newUser._id);

    res.status(201).send(token);
    console.log(newUser);
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await CrafterUser.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).send("Invalid password");
    }

    const token = tokenCreation(res, user._id);
    res.send(token);
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await CrafterUser.findById(userId).populate("blogs");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error("Error in profile route:", error);
    res.status(500).send("Error in profile route: " + error.message);
  }
});

app.post("/createBlog", upload.single("blogFile"), async (req, res) => {
  const { title, city, content, userId } = req.body;
  console.log(req.body);

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    let user = await CrafterUser.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newBlog = await Blog.create({
      title,
      author: userId,
      city,
      content,
      blogPic: req.file.filename.toLowerCase(),
    });

    await CrafterUser.findByIdAndUpdate(userId, {
      $push: { blogs: newBlog._id },
    });

    res.status(200).send(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  } catch (error) {
    console.error("Error in edit route:", error);
    res.status(500).send("Error in edit route: " + error.message);
  }
});

app.patch("/update/:id", upload.single("blogFile"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, city, content } = req.body;
    const blogPic = req.file.filename;

    if (!blogPic && !title && !city && !content) {
      return res.status(400).send("No fields provided for update");
    }

    const updatedBlogFields = {};
    if (blogPic) updatedBlogFields.blogPic = blogPic;
    if (title) updatedBlogFields.title = title;
    if (city) updatedBlogFields.city = city;
    if (content) updatedBlogFields.content = content;
    const updatedblog = await Blog.findByIdAndUpdate(
      blogId,
      {
        ...(blogPic && { blogPic }),
        ...(title && { title }),
        ...(city && { city }),
        ...(content && { content }),
      },
      { new: true }
    );

    if (!updatedblog) {
      return res.status(404).send("Blog not found");
    }

    res.send(updatedblog);
  } catch (error) {
    console.error("Error in update route:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send("Blog deleted");
  } catch (error) {
    console.error("Error in delete route:", error);
    res.status(500).send("Internal server error: " + error.message);
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
    res.send("Successfully message received");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const users = await CrafterUser.find({});
    if (!users) {
      return res.status(404).send("Users not found");
    }
    res.send(users);
  } catch (error) {
    console.error("Error in data route:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
