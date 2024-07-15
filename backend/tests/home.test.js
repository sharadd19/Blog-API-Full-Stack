require("dotenv").config();
const homeRoute = require("../routes/HomeRoute");
const {
  connectDB,
  clearDB,
  closeDB,
} = require("../tests/mongoDBCongigTesting");
const request = require("supertest");
const express = require("express");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Create a valid mock JWT token for tests
const createMockToken = (user) => {
  const payload = {
    sub: user._id,
    user: user,
    iat: Date.now(),
  };
  const secret = process.env.JWT_SECRET; // Use the same secret as your checkJWT middleware
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const createApp = () => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", homeRoute);
  return app;
};

describe("Home Routes", () => {
  let app;
  let token;
  let user

  beforeAll(async () => {
    await connectDB();
  });

  // Before each test we want to clear the database, create a user and posts
  beforeEach(async () => {
    app = createApp();

    await clearDB();

    user = new UserModel({
      firstName: "Sharad",
      lastName: "Patel",
      username: "sharadical",
      password: "123",
      isAdmin: true,
    });

    await user.save();

    console.log(`Created User ${user.username} successfully`);

    if (!user) {
      console.log(`failed to create user`);
    }

    await PostModel.create([
      {
        title: "Test Post 1",
        description: "This is test post 1",
        date: "2124-02-19T00:00:00.000Z",
        author: user._id,
        comment: null,
      },
      {
        title: "Test Post 2",
        description: "This is test post 2",
        date: "2124-02-19T00:00:00.000Z",
        author: user._id,
        comment: null,
      },
    ]);

    console.log("Create Post successfully");
  });

  it("GET /home should return list of posts without authentication", async () => {
    const response = await request(app).get("/api/home");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.postList)).toBeTruthy();
    expect(response.body.postList.length).toBe(2);

    response.body.postList.forEach((post) => {
      expect(post).toHaveProperty("_id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("description");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("author");
      expect(post).toHaveProperty("comment");
    });
    
    // Since we haven't authenticated, we should not have a user object in the request
    expect(response.body.user).toBe(null);
  });

  it("GET /home should return list of posts with a user if authenticated", async () => {
    // Create a token with the logged in user's information
    token = createMockToken(user);
    const response = await request(app)
      .get("/api/home")
      .set("Authorization", `Bearer ${token}`); // Add the token to the authorization header so that the checkJWT middleware can add the user object to the request

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.postList)).toBeTruthy();
    expect(response.body.postList.length).toBe(2);

    response.body.postList.forEach((post) => {
      expect(post).toHaveProperty("_id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("description");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("author");
      expect(post).toHaveProperty("comment");
    });

    // We should have the user object in the response populated
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user).toHaveProperty("firstName");
    expect(response.body.user).toHaveProperty("lastName");
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).toHaveProperty("password");
    expect(response.body.user).toHaveProperty("isAdmin");
  });

  afterAll(async () => {
    await closeDB();
  });
});
