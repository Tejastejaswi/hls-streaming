const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the video files statically
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      </head> 
      <body>
        <video id="video" controls width="640" height="360"></video>

        <script>
          const video = document.getElementById('video');
          const videoSrc = '/videos/output.m3u8';

          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play();
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', () => {
              video.play();
            });
          } else {
            alert('HLS is not supported in your browser.');
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
