# Blog 



## Description 
I created this application to allow users to be able to create blog posts and comment on them 
It is a full-stack application with the front end built with React, backend built with NodeJS and ExpressJS and MongoDB as the database.

The reason I used React and NodeJS is that both provide lots of flexibility, and there are lots of libraries to utilise. In addition to this, there is plenty of support available. 

This propject was part of one of the projects to complete in _The Odin Project_ course for full-stack web development. 

Some challenges I've faced during this project have been building a backend without a frontend to test. Instead I used Postman to simulate a client and had to think differenly when it came to creating the API endpoints that my frontend would eventually use. This meant being more thoughtful about what I would be sending in the requst and response. 


## Project Structure 

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

## How to run the project
You will need to install the node package manager using the following command:
`npm install`

After this you can run the project by using the following command:
`npm run dev` 
This will run the frontend and backend simulataneously. 

Navigate to `localhost:<port_number>` to get to the home page


# Backend Model
[Model](/BackendModel.png)