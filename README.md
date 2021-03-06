# RPGCharacterCreator

This is a Character creator project that I have been working on while learning NodeJS and Express. The project allows a user to register an account, login, create a new PRGCharacter
(Currently only DnD-5e is availible), and save the character to the user account. The character is viewable only to the author by defualt, and is editable. 
A PDF can be generated for printing.

Currently a good amount of work is needed, but I am to a state where I'm willing to show it.
---
### Requirements
- ### Node installation on Windows
  https://nodejs.org/en/download/
- Docker
  To run the project directly you will want an installation of Docker which can be found here...
  https://www.docker.com/products/docker-desktop
---
### Running Project
  Install project dependencies needed
  ```shell
  npm ci
  ```
  Pull the docker images needed from the project directory from a new terminal
  ```shell
  docker-compose pull
  ```
  Run the project using the docker-compose up --build command
  ```shell
  docker-compose up --build
  ```
  
  ## :mag: Technologies ##
  - [5e-database](http://dnd5eapi.co/)
  - [expressjs](https://expressjs.com/)
  - [passportjs](https://www.passportjs.org/)
  - [<%= EJS %>](https://ejs.co/)
  - [pdf-lib](https://pdf-lib.js.org/)
  - [mongoose](https://mongoosejs.com/docs/4.x/)
  - [redis](https://redis.io/)
  
