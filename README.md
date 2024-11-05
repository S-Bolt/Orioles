# Orioles Fan Blog Project
Welcome to the Orioles Fan Blog! This application provides an interactive platform for Baltimore Orioles fans to share opinions, discuss game highlights, and connect with other fans.

## Table of Contents
- [Project Overview](#project-overview)
- [Features] (#features)
- [Technologies Used](#technologies-used)
Setup and Installation
Environment Variables
Usage
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The Orioles Fan Blog is a full-stack web application that provides a blog-based platform for fans of the Baltimore Orioles baseball team. Users can read, comment on, and interact with blog posts about the Orioles, while registered members can create accounts to join the community. Admins can manage posts, and all posts include features like comments and images.

##  Features
User Authentication: Sign up and log in to access the full range of features.
Blog Creation: Admin and Writers can create and edit blog posts, adding images and text content.
Profile Management: Users can update personal profiles, including profile pictures stored on Amazon S3.
Image Uploads: Blog posts and user profiles support image uploads, managed through Amazon S3.
Commenting and Interaction: Users can comment on blog posts and interact with content.
Search and Filtering: Search for posts by keywords, authors, or date ranges.

## Technologies Used

### Frontend
React: For building the user interface.
React Router: For routing between different pages.
Tailwind CSS: For styling and responsive design.
JWT: For token-based authentication.

### Backend
Node.js: JavaScript runtime environment.
Express: Web framework for the server.
Sequelize: ORM for managing PostgreSQL.
AWS S3: Cloud storage for images.
PostgreSQL: Database for storing application data.

## Project Structure

Orioles/
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── ...
│   └── ...
├── server/               # Backend (Express + Node.js)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── uploads/
│   └── ...
└── README.md

## Contributing

1. Fork the repository.
2. Clone the forked repository.
3. Create a new branch.
4. Make your changes and test thoroughly.
5. Submit a pull request.
