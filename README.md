# Blog 



## Description 
This propject was part of one of the projects to complete in [_The Odin Project_](https://www.theodinproject.com/lessons/nodejs-blog-api#project-solution) course for full-stack web development. 

The goal of this application is to build an API to allow users to be able to create blog posts and comment on them.

## Built with
- React 
- NodeJS
- ExpressJS
- Passport
- MongoDB

The main reason for using these are that they provide lots of flexibility, have plenty of support, and a myriad of libraries to utilise.

## Challenges
Some challenges I've faced during this project have been building a backend without a frontend to test. Instead I used Postman to simulate a client and had to think differenly when it came to creating the API endpoints that my frontend would eventually use. This meant being more thoughtful about what I would be sending in the requst and response. 


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
You will need to install the node package manager using the following command:
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

## Backend Model
![Model](/BackendModel.png)