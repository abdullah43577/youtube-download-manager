require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookierParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookierParser());

const dbURI = `mongodb+srv://officialayo540:${process.env.PASSWORD}@ytdlcluster.iuxkaub.mongodb.net/ytdl_db`;

(async function () {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  } catch (err) {
    console.log('mongodb not connected', err);
  }
})();

// test code snippet

const fs = require('fs');
const ytdl = require('ytdl-core');

const videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID';

ytdl(videoUrl)
  .pipe(fs.createWriteStream('video.mp4'))
  .on('finish', () => {
    console.log('Video downloaded successfully!');
  })
  .on('error', (err) => {
    console.error('Error downloading video:', err);
  });
