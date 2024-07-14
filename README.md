# Blog 



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

# Key concepts and learnings
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
Clone this repo on your local machine and install the node package manager using the following command:
```bash
npm install
```

After this you can run the project by using the following command:
```bash
npm run dev
```

This will run the frontend and backend simulataneously. 
Navigate to 
```bash
localhost:<port_number>
```

If you want to test the backend with postman you can use 
```bash
localhost:3000/
```
to send your requests

## Backend Model
![Model](/BackendModel.png)