# Camera.js
> A fork from https://github.com/idevelop/camera.js

A wrapper around the HTML5 getUserMedia API, offering cross-browser access to the user's webcam video stream.

## Installing / Getting started

Will be soon published on npm registry

```shell
npm install --save lfcamera
```

Here you should say what actually happens when you execute the code above.

## Usage

Upon initalization, the library asks the user for permission, sets up the necessary getUserMedia code and starts the stream. All parameters are optional, their default values are explained below.

The `onFrame` callback function is called each time there is a new frame to be processed, with respect to the `fps` option.

If you want the video stream to also be rendered in a `<canvas>` element, set the `container` option to an element reference.


```javascript
import Camera from 'camera.js';

const camera = new Camera({
	width: 160, // default: 640
	height: 120, // default: 480
	fps: 30, // default: 30
	mirror: true,  // default: false
	container: document.getElementById('webcam'), // default: null 

	onFrame: function(canvas) {
		// do something with image data found in the canvas argument
	}, // default: null. Don't set it if you want to use your own intervals to take snapshots
});

camera.init()
    .then(() => {
         // do something when the stream is set up
    })
    .catch((error) => {
        // in case anything happens while setting up the camera
    });
    

```

## Developing

### Prerequisites

NodeJS

### Setting up Dev

```shell
git clone https://github.com/LFBVR/camera.js
cd camera.js
npm install
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Tests are coming

```shell
npm run tests
```

## Supported browsers

* Chrome &ge; 21
* Firefox &ge; 17 (requires `media.navigator.enabled = true` in `about:config`)
* Opera &ge; 12

## Licensing

- This code is licensed under the MIT License.