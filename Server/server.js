require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookierParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookierParser());

const dbURI = `mongodb+srv://officialayo540:${process.env.PASSWORD}@ytdlcluster.iuxkaub.mongodb.net/${process.env.DATABASE}`;

(async function () {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  } catch (err) {
    console.log('mongodb not connected', err);
  }
})();

app.use(router);

// ? User Stories
// * There'd be a form in the client side to receive the youtube URL and a button to submit the form
// * on inputChange make request to the server to get the required infos
// * On Click of a btn from the client side, make a post request to a specified endpoint ('/download') and download the movie
