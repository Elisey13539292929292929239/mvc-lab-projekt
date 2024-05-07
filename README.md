# A Collection of Favorite Recipes

## Introduction

This is a recipe management application that allows users to browse, add, edit, rate, and comment on recipes. The application is built on Node.js using SSR (server-side rendering) and the MVC architectural pattern.

## Features

- **User registration and authentication**: Users can register and authenticate with the application in order to save their recipes and share them with others.
- **Recipe storage**: A recipe storage system is implemented, allowing users to save their recipes to a database.
- **Recipe browsing**: Users can browse recipes.
- **Recipe detail page**: Each recipe has a detail page that displays the recipe's title, description, ingredients, instructions and reviews from other users.
- **Adding recipes**: Users can add new recipes, including the title, description, ingredients, instructions and categories.
- **Editing recipes**: Users can edit their own recipes.
- **Deleting recipes**: Users can delete their own recipes.
- **Review system**: Users can leave reviews on other users' recipes.
  
## Technologies

- **express-session**: "^1.18.0",
- **express**: ^4.19.2
- **bcrypt**: "^5.1.1",
- **js-cookie**: "^3.0.5",
- **mongoose**: "^7.6.3",
- **nodemon**: "^3.1.0",
- **pug**: "^3.0.2"

## Running the application

To get this application running on your local machine, follow these steps:

1. **Clone the repository:**
   Execute the following command in your terminal to clone the repository:
   ```bash
   git clone https://github.com/warnaz/project.git

2. Navigate to the project directory: Change your current working directory to the cloned repository:
   ```bash
   cd project

3. Install dependencies: Install the required node modules:
    ```bash
    npm install

4. Start the server: Launch the application server:
    ```bash
    npm start

Open the application: Open your web browser and go to: http://localhost:3000


