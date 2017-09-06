# jukebox
Angular Jukebox

The purpose of this project was to create an audio player that could be easily added to a website.  The motivation was to host some demo songs off of my music website to allow small venue owners to hear samples of some of the music that I play.  It is created in angular.  To utilize you can download the code and build it in angular:
 ng build --prod --aot --base-href /<directory you will put files in>/
 or you can just copy the code from the dist directory, placing in the subdirectory of your webserver, then placing your audio files in a directory named assets along with a jukebox.json file (see example file) that defines the path to the audiofiles and text metadata that will appear in the ui as well as text that appears at the top of the page.
 Here's a screenshot of how it looks on my website:
 
