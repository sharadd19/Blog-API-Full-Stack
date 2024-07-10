#! /usr/bin/env node

console.log(
    "This script populates some test posts and users to your database."
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const PostModel = require("./models/PostModel");
  const UserModel = require("./models/UserModel");
  const CommentModel = require("./models/CommentModel")
  const posts = [];
  const users = [];
  const comments = []
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createComments();
    await createPosts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  
  async function createUser(index, firstName, lastName, username, password, isAdmin) {
    const userDetail = {
      firstName: firstName,
      lastName: lastName, 
      username: username, 
      password: password, 
      isAdmin: isAdmin
    };
  
    const user = new UserModel(userDetail);
    await user.save();
    users[index] = user;
    console.log(`Added user: ${lastName}, ${firstName}`);
  }

  async function createComment(index, description, author, date) {
    const commentDetail = {
      description: description, 
      author: author, 
      date: date
    };
  
    const comment = new CommentModel(commentDetail);
    await comment.save();
    comments[index] = comment;
    console.log(`Added comment: ${description}`);
  }
  
  async function createPost(index, title, description, author, date, comment) {
    const postDetail = {
      title: title, 
      description: description, 
      author: author, 
      date: date,
    };

    if (comment != false) postDetail.comment = comment;
  
    const post = new PostModel(postDetail);
    await post.save();
    posts[index] = post;
    console.log(`Added post: ${title}`);
  }

  
  
  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
      createUser(0, "Sharad", "Patel", "sharadical", "123", true),
      createUser(1, "Pritesh", "Patel", "PritzTheCoolest", "123", true ),
      createUser(2, "Dalvir", "Birdee", "davos_b_303", "123", false ),
      createUser(3, "Haaris", "Butt", "Haariz", "123", false ),
      createUser(4, "Yusuf", "Rafique", "yrafique", "123", false),
    ]);
  }
  
  async function createComments() {
    console.log("Adding comments");
    await Promise.all([
      createComment(0, "Hello", users[0], "2024-06-30"),
      createComment(1, "Konichiwa", users[1], "2024-06-30"),
      createComment(2, "Anyong", users[2], "2024-06-30"),
      createComment(3, "Hola", users[2], "2024-06-30"),
      createComment(4, "Sasrikaal", users[1], "2024-06-30"),
      createComment(5, "Bonjour", users[0], "2024-06-30"),
    ]);
  }

  async function createPosts() {
    console.log("Adding posts");
    await Promise.all([
      createPost(0, "Carrot", "Heals the eyes", users[0], "1997-08-19", [comments[0], comments[3]]),
      createPost(1, "Potato", "Feeds the soul", users[0], "1997-08-19", [comments[1], comments[2]]),
      createPost(2, "Chicken", "Energises the muscles", users[1], "1997-08-19", [comments[4], comments[2]]),
      createPost(3, "Beef", "Satisfies the stomach", users[1], "1997-08-19", comments[1]),
      createPost(4, "Pork", "Satiates the belly", users[1], "1997-08-19"),
      createPost(5, "Cheese", "Smells terrible", users[2], "1997-08-19"),
      createPost(6, "Milk", "Develops the bones", users[2], "1997-08-19", comments[5]),
      createPost(7, "Yoghurt", "Promotes the gut", users[2], "2124-02-19"),
      createPost(8, "Apple", "One of your five a day", users[3], "2124-02-19"),
      createPost(9, "Blueberries", "Nutritiously delicious ", users[3], "2124-02-19", comments[2]),
      createPost(10, "Banana", "Great for a smoothie", users[3], "2124-02-19"),
      createPost(11, "Orange", "Tantalises the tastebuds", users[3], "2124-02-19")
    ]);
  }

  