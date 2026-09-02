CREWBRIEF — ADDING OR CHANGING YOUTUBE VIDEOS

The only file you need to edit is:

    videos.js

YOUR WEBSITE STARTS EMPTY

There are no videos or video files in the website. A YouTube player appears only
after you add a YouTube video ID and a visitor clicks its training card.

HOW TO ADD YOUR FIRST VIDEO

1. Open videos.js in GitHub.
2. Click the pencil icon (Edit this file).
3. Replace this line:

       window.CREWBRIEF_VIDEOS = [];

   with the example video block included in the comments directly below it.
4. Replace YOUR_YOUTUBE_VIDEO_ID and the other example details.
5. Click Commit changes.

HOW TO FIND THE YOUTUBE ID

If the link is:
https://youtu.be/ABC123xyz

The YouTube ID is:
ABC123xyz

If the link is:
https://www.youtube.com/watch?v=ABC123xyz

The YouTube ID is still:
ABC123xyz

HOW TO ADD MORE VIDEOS

Copy one complete video block in videos.js, including the opening { and closing }.
Paste it below the last video block, put a comma between the blocks, and change
the details. The category button is created automatically from the category name.

IMPORTANT

- Upload videos to YouTube, not GitHub.
- Unlisted YouTube videos work on this website.
- Do not upload MP4 files to the repository.
- Keep the filename videos.js exactly as it is.
