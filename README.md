# Youtubr

Check http://youtubr.xyz for the latest release!

![alt text](https://i.imgur.com/8aZqa6Z.jpg "Napkin drawing")

![alt text](http://i.imgur.com/QIr6GH7.png "Static mock-up")

## Relevant Technologies
* Angular JS - http://docs.angularjs.org/api 
* Bootstrap CSS - http://getbootstrap.com/
* LESS CSS - http://lesscss.org/ 
* Youtube Player API - http://developers.google.com/youtube/js_api_reference 
* Grunt - http://gruntjs.com/ 
* Yeoman - http://yeoman.io/

## Documentation
API endpoints
```
POST /video
	requires: {youtubeURL: string}
	optional: {startSeconds: int, endSeconds: int}
	action: Creates a new video object using the supplied parameters
	returns: new video object or 400

GET /video/<video_id>
	returns: video object matching video ID or 404
```

## Examples
http://youtubr.xyz/#/example

## TODO
* Cookie Storage
* Back-end Support
* Default/blank view
* Selection bar controls
* Minutes:Seconds inputs
