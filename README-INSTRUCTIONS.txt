CREWBRIEF — WEBSITE UPDATE GUIDE

The website is hosted from this GitHub repository:
https://github.com/jarrydthomas-svg/crewbrief

MAIN FILES

index.html      Website sections and visible wording
styles.css      Leather, stitching, colours and mobile layout
app.js          Search, document lists and video player behaviour
videos.js       Safety bulletin and training video details
documents.js    List of uploaded PDF documents
daily-flha.html Daily FLHA form
documents/      PDF files shown in the document libraries

ADD OR CHANGE A VIDEO

1. Open videos.js in GitHub.
2. Select the pencil icon.
3. Copy one complete video block, including its { and }.
4. Paste it below the last block, with a comma between blocks.
5. Enter the YouTube ID, title, description and duration.
6. Use category "Safety Bulletins" or "Training Videos".
7. Select Commit changes.

YouTube example:
https://youtu.be/ABC123xyz
The YouTube ID is ABC123xyz.

ADD A PDF

1. Open the documents folder in GitHub.
2. Select Add file, then Upload files.
3. Upload the PDF and commit the change.
4. Open documents.js and add a matching document block.
5. Use one of these exact categories:
   Standard Operating Procedures
   Hazard Assessments
   Policies & Guidelines
   Competencies
   Safety Resources

Example:
{
  title: "2.06 Lock Out Tag Out",
  category: "Standard Operating Procedures",
  file: "documents/2.06_Lock_Out_Tag_Out.pdf"
}

ADD A NEW MAIN TOPIC

The dashboard button and the matching content section are both in index.html.
Copy an existing topic-card and its matching content-section, then change the
heading, link and section id. Styling is inherited automatically from styles.css.

IMPORTANT

- Upload videos to YouTube, not GitHub.
- Keep employee tickets and competencies private once individual records are used.
- Test every new link after GitHub Pages finishes publishing.
