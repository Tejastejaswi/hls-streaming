#  Understanding HLS Streaming with Node.js and HLS.js

This project is a minimal example of how **HLS (HTTP Live Streaming)** works using a **Node.js Express server** and the **HLS.js** library on the frontend.

It helped me explore how video streaming actually works behind the scenes.

---

##  Project Overview

- **Backend**: Express.js serves static video chunks (`.ts`) and a playlist file (`.m3u8`).
- **Frontend**: Uses HLS.js to fetch and play HLS video streams inside a `<video>` element.
- **Goal**: Understand how HLS works under the hood and how it differs from range-based `.mp4` streaming.

---

##  Folder Structure

HLS-STREAMING/
├── videos/
│ ├── output.m3u8
│ ├── segment0.ts
│ ├── segment1.ts
│ └── ...
├── server.js


##  Key Learnings & FAQs

### 1.  What is **HLS**?

**HLS (HTTP Live Streaming)** is a popular media streaming protocol developed by Apple.  
It allows streaming of audio/video over HTTP in small chunks, adapting playback to changing network conditions.

---

### 2.  What does it mean when we say **HLS uses HTTP**?

- HLS = **HTTP** Live Streaming.
- It uses regular HTTP (which runs over TCP) to deliver video content.
- Chunks are fetched just like images or HTML pages.

####  How does it work?
- The video is broken into small `.ts` chunks.
- A `.m3u8` playlist/index file lists all these chunks.
- The browser (or HLS.js) requests them via HTTP.

---

### 3.  How does the flow of code work?

When you open [http://localhost:3000](http://localhost:3000):

1. Express serves an HTML page.
2. The page includes:
   - The `<video>` tag.
   - The HLS.js library.
3. HLS.js:
   - Loads `/videos/output.m3u8`.
   - Parses it and requests `.ts` chunks.
   - Uses **Media Source Extensions (MSE)** to feed the chunks into the video element.
4. The video plays!

---

### 4.  When is `/videos` being requested?

- Express statically serves the `/videos` route from the `videos/` folder.
- HLS.js automatically requests:
  - `/videos/output.m3u8`
  - All `.ts` segments listed inside that playlist.

---

### 5.  How does `<video>` work with **HLS.js**?

- The `<video>` tag is just a shell.
- HLS.js loads the playlist and segments via JavaScript.
- It injects the video data into the `<video>` element using **MSE**.
- You **don't need to set** `video.src` manually — HLS.js does that.

---

### 6.  Who fetches the `.ts` chunks — browser or HLS.js?

- In **most browsers** (like Chrome or Firefox):  
  `HLS.js` fetches the chunks using JavaScript (Fetch or XHR).
- In **Safari**:  
  The browser **natively supports HLS** and handles everything automatically.

---

### 7.  Is there a real difference between **range-based streaming** and **HLS** (if no adaptive quality is used)?

- **Range-based streaming**:  
  - Uses HTTP Range headers to load parts of a single large `.mp4` file.
- **HLS**:
  - Loads small `.ts` files listed in an `.m3u8` playlist.

The main differences become apparent when you use:
- Adaptive bitrate streaming
- Error recovery
- Live streaming

---

### 8.  How does HLS know where the segments are?

- The `.m3u8` playlist contains all segment paths in order.
- HLS.js parses this file and fetches the `.ts` chunks accordingly.

---

##  Key Takeaways

 Even a basic HLS setup shows important concepts:

- Chunked delivery of media
- Playlist-based navigation (`.m3u8`)
- JavaScript-powered fetching and decoding via MSE

📌 Compared to simple `.mp4` range-based streaming, **HLS is more resilient**, enables **adaptive quality**, and supports **live broadcasting**.

---



## 📝 Coming Next...

I plan to:
- Automate the conversion of `.mp4` to `.m3u8` + `.ts` chunks using FFmpeg
- Automate the upload and cleanup process
- Dockerize the app for production use

Stay tuned!
