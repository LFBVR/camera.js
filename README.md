Camera.js
=========




## Usage

Upon initalization, the library asks the user for permission, sets up the necessary getUserMedia code and starts the stream. All parameters are optional, their default values are explained below.

The `onFrame` callback function is called each time there is a new frame to be processed, with respect to the `fps` option.

If you want the video stream to also be rendered in a `<canvas>` element, set the `targetCanvas` option to an element reference.

```javascript
camera.init({
	width: 160, // default: 640
	height: 120, // default: 480
	fps: 30, // default: 30
	mirror: true,  // default: false
	targetCanvas: document.getElementById('webcam'), // default: null 

	onFrame: function(canvas) {
		// do something with image data found in the canvas argument
	},

	onSuccess: function() {
		// stream succesfully started, yay!
	},

	onError: function(error) {
		// something went wrong on initialization
	},

	onNotSupported: function() {
		// instruct the user to get a better browser
	}
});
```

To pause the video capture, call `camera.pause()`. To resume, call `camera.start()`.

## Live examples

<table>
  <tr>
    <th>ASCII Camera</th>
    <th>Predator Vision</th>
  </tr>
  <tr>
    <td><a href="http://idevelop.github.com/ascii-camera/"><img src="http://idevelop.github.com/ascii-camera/images/screenshot.png" width="267" height="200"></a></td>
    <td><a href="http://idevelop.github.com/predator-vision/"><img src="http://idevelop.github.com/predator-vision/images/screenshot.png" width="278" height="200"></a></td>
  </tr>
</table>

## Supported browsers

* Chrome &ge; 21
* Firefox &ge; 17 (requires `media.navigator.enabled = true` in `about:config`)
* Opera &ge; 12

## Author

**Andrei Gheorghe**

* [About me](http://idevelop.github.com)
* LinkedIn: [linkedin.com/in/idevelop](https://linkedin.com/in/idevelop)
* Twitter: [@idevelop](http://twitter.com/idevelop)

## License

- This code is licensed under the MIT License.



# Camera.js
> A fork from https://github.com/idevelop/camera.js

A wrapper around the HTML5 getUserMedia API, offering cross-browser access to the user's webcam video stream.

## Installing / Getting started

Will be soon published on npm registry

```shell
npm install --save camera.js
```

Here you should say what actually happens when you execute the code above.

## Developing

### Built With
List main libraries, frameworks used including versions (React, Angular etc...)

### Prerequisites
What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).


## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

Explain your code style and show how to check it.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.


## Database

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc... 

## Licensing

State what the license is and how to find the text version of the license.