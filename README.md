# Blog 

_Date: Jul 2024_

**CURRENTLY IN DEVELOPMENT**

## Description 
This project was part of one of the projects to complete in [_The Odin Project_](https://www.theodinproject.com/lessons/nodejs-blog-api) course for full-stack web development. 

The goal of this application is to build a full-stack application that allows users to be able to create blog posts and comment on them.

## Built with
- React 
- NodeJS 
- ExpressJS Framework
- Passport JWT
- MongoDB
- Mongoose ODM

## Key concepts and learnings
- **Authentication** and **Authorisation** using **Passport JWT** to allow users to create
an account, login and access protected routes depending on permissions
- **Routing** in **React** and **NodeJS** to allow frontend and backend to communicate
- Design and creation of **database models** using **MongoDB** and **Mongoose**
- **Developing API endpoints** with **CRUD** operations on posts and comments
- **State management** in React to keep track of posts
- **Testing API endpoints** using **Postman**

## Challenges
- Some challenges I've faced during this project have been building a backend without a frontend and testing the API endpoints. 
- I used Postman to simulate a client and had to think differenly when it came to creating the API endpoints that my frontend would eventually use. This meant being more thoughtful about what I would be sending in the response. 
- Figuring out how to get my frontend and backend to communicate when an API is involved. I used CORS to allow my backend to be accessed from a different domain
- Configuring my application so that one command can run both the frontend and backend simulutaneously
- Creating custom middleware to verify a user's JWT without requiring them to log in. The goal was to allow users to leave comments on posts with or without a username. Users with accounts should be able to leave a username if authenticated, while users without accounts should still be able to comment without authentication. Protecting the route for authenticated users would have blocked non-account users, so a solution was needed to handle both cases dynamically.



## Project Structure 
```
blogapi-full-stack
├── backend/
│   ├── package.json
│   ├── ...
├── frontend/
│   ├── package.json
│   ├── ...
├── .gitignore
├── README.md
├── package.json
├── package-lock.json

```

## How to run the project
1. Clone this repo on your local machine  

2. Navigate to the project and install dependencies using node package manager: 
```bash 
cd blogapi-full-stack
npm install
```

3. Install dependencies for the frontend
```bash
cd frontend
npm install
cd ..
```

4. Install dependencies for the backend
```bash
cd backend
npm install
cd ..
```

5. You will need to create a MongoDB database and get the connection string before proceeding. Create a collection for users, posts and comments.

6. Create a .env file in the frontend AND the backend
```bash
# Frontend - we want our frontend to communicate with our backend api so we need to ues the API's URL
# .env(frontend)
VITE_API = http://localhost:<port_number>/api # port number is usually 3000 for the backend

# Backend - fill in the empty strings with whatever you want
# .env (backend)
MONGODB_URL = "<connection_string>"
JWT_SECRET = ""
SESSION_SECRET = ""
ADMIN_SECRET = ""
```

7. Run the project in development:
```bash
npm run dev
```

8. Navigate to the browser and enter the following in the URL:
```bash
localhost:<port_number> # port number is usually 5173 for the frontend
```

9. If you want to test the backend with Postman you can send your requests to:
```bash
localhost:<port_number> # port number is usually 3000 for the backend
```

## Backend Model
![Model](/BackendModel.png)