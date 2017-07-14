'use strict';

import merge from "lodash.merge";
import DEFAULT_OPTIONS from "./defaults";

export default class Camera {
    constructor(captureOptions) {
        this.options = merge({}, DEFAULT_OPTIONS, captureOptions);
    }

    async init() {
        return this._initVideoStream();
    }

    _initVideoStream() {
        return new Promise((resolve, reject) => {
            const {width, height} = this.options;
            const video = (this.video = document.createElement("video"));
            video.setAttribute('width', width);
            video.setAttribute('height', height);

            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            if (!getUserMedia) {
                reject(Error('NOT_SUPPORTED'));
            }

            getUserMedia(
                {video: true},
                (s) => {
                    const stream = (this.stream = s);

                    if (video.mozSrcObject !== undefined) { // hack for Firefox < 19
                        video.mozSrcObject = stream;
                    } else {
                        const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
                        video.src = (URL && URL.createObjectURL(stream)) || stream;
                    }

                    resolve(this._initCanvas());
                },
                reject
            );
        });
    }

    _initCanvas() {
        const {targetCanvas, width, height, mirror} = this.options;
        const canvas = (this.canvas = targetCanvas || document.createElement("canvas"));
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        const context = (this.context = canvas.getContext('2d'));

        // mirror video
        if (mirror) {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        }

        return this.start();
    }

    start() {
        const {video, context, canvas} = this;
        const {onFrame, fps} = this.options;
        video.play();

        this.renderTimer = setInterval(
            () => {
                try {
                    context.drawImage(video, 0, 0, video.width, video.height);
                    onFrame(canvas);
                } catch (e) {
                    // TODO
                }
            },
            Math.round(1000 / fps)
        );
    }

    pause() {
        const {renderTimer, video} = this;
        if (renderTimer) {
            clearInterval(renderTimer);
        }
        video.pause();
    }

    stop() {
        const {video, stream} = this;
        
        this.pause();

        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = null;
        } else {
            video.src = "";
            // STOP CAMERA NOT JUST FEED
            stream.getTracks().forEach(track => track.stop());
        }
    }
}
