// Import required packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/homeRoutes');
const helpers = require('./utils/helpers');
require('dotenv').config();


// Import sequelize and initialize session to store session data
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize app and define PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Import secret from .env and configure a session
const secret = process.env.SESSION_SECRET;

const sess = {
    secret,
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Set the view engine to handlebars
app.engine('handlebars', hbs.engine);
// Tell Express to use handlebars as the view engine
app.set('view engine', 'handlebars');

// Set up session management middleware
app.use(session(sess));

// Import necessary middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Synchronize Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});