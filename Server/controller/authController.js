const fs = require('fs');
const ytdl = require('ytdl-core');

const welcome_get = (req, res) => {
  res.status(200).json({ message: 'Welcome to the server!' });
};

const register_post = (req, res) => {
  res.status(200).json({ message: 'the endpoint for registering ran' });
};

const login_post = (req, res) => {
  res.status(200).json({ message: 'the endpoint for logging user in ran' });
};

// const download_api_post = async (req, res) => {
//   try {
//     const info = await ytdl.getInfo(req.body.url);
//     // get the thumnail of the video
//     const thumbnail = info.videoDetails.thumbnails[0].url;

//     // Create a dictionary to store one format per quality level
//     const videoFormatsDict = {};

//     // Iterate through formats and keep only one format per quality level
//     info.formats.forEach((format) => {
//       if (format.mimeType.includes('video/mp4')) {
//         const qualityLabel = format.qualityLabel;
//         if (!videoFormatsDict[qualityLabel]) {
//           videoFormatsDict[qualityLabel] = {
//             quality: qualityLabel,
//             itag: format.itag,
//             mimeType: format.mimeType,
//             url: format.url,
//             downloadLink: `/download?itag=${format.itag}&url=${encodeURIComponent(format.url)}`,
//           };
//         }
//       }
//     });

//     // Convert the dictionary values back to an array
//     const videoFormats = Object.values(videoFormatsDict);

//     // get the url for streaming the video
//     const videoUrl = videoFormats[0].url;

//     res.status(200).json({ thumbnail: thumbnail, videoUrl: videoUrl, videoFormats: videoFormats });
//   } catch (err) {
//     res.status(500).json({ message: 'error downloading movie, make sure the youtube URL is correct' });
//   }
// };

const download_api_post = async (req, res) => {
  try {
    const info = await ytdl.getInfo(req.body.url);
    // get the thumnail of the video
    const thumbnail = info.videoDetails.thumbnails[0].url;

    // Get the available video formats
    const videoFormats = info.formats
      .filter((format) => format.mimeType.includes('video/mp4'))
      .map((format) => {
        return {
          quality: format.qualityLabel,
          itag: format.itag,
          mimeType: format.mimeType,
          url: format.url,
          downloadLink: `/download?itag=${format.itag}&url=${encodeURIComponent(format.url)}`,
        };
      });

    // get the url for streaming the video
    const videoUrl = videoFormats[0].url;

    res.json({ thumbnail: thumbnail, videoUrl: videoUrl, videoFormats: videoFormats });
  } catch (err) {
    res.status(500).json({ message: 'error downloading movie' });
  }
};

module.exports = { welcome_get, register_post, login_post, download_api_post };
