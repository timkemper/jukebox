# jukebox
Angular Jukebox

The purpose of this project was to create an audio player that could be easily added to a website.  

The motivation was to host some demo songs off of my music website to allow small venue owners to hear samples of some of the music that I play.  It is created in angular.  

To utilize you can download the code and build it in angular:
 
`ng build --prod --aot --base-href /<directory you will put files in>/`
 
or you can just copy the code from the dist directory, placing in the subdirectory of your webserver, then placing your audio files in a directory named assets along with a jukebox.json file (see example file) that defines the path to the audiofiles and text metadata that will appear in the ui as well as text that appears at the top of the page.
 
Here's a screenshot of how it looks on my website:
 [[https://github.com/timkemper/repository/blob/master/docs/jukebox-screenshot.png|alt=jukebox screenshot]]

If you just want to use the pre-built code in your website:

- Copy the contents of the dist directory over to your web server directory
- Modify the index.html to point to the directory you put the files in. For example if you directory is demos then it would look like: `base href="/demos/"`
- Replace the audio files in the assets directory with your own audio files
- Modify the jukebox.json file in the assets directory to point to your own files and have your own title.


If you want to build the application to play with or extend it:

- Create a new angular project: `ng new jukebox`
- Replace the src directory with the one from this project
- Replace the .angular-cli.json file with the one from this project
- Run `npm install --save bootstrap` to pull in bootstrap
- Make changes 
- Rebuild with `ng build --prod --aot --base-href /<directory to deploy in>/`
- Follow directions above for pre-built code to use in your web server.



