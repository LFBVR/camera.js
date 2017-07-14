'use strict';

import merge from "lodash.merge";
import DEFAULT_OPTIONS from "./defaults";

export default class Camera {
    constructor(captureOptions) {
        this.options = merge({}, DEFAULT_OPTIONS, captureOptions);

        if (!captureOptions.container) {
            throw Error('You should specify a container for your camera');
        }
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
                    }
                    else {
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
        const {container, width, height, mirror} = this.options;
        const canvas = (this.canvas = container || document.createElement("canvas"));
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
        const {video} = this;
        const {onFrame, fps} = this.options;
        video.play();

        if (onFrame) { // only draw if callback specified
            return;
        }

        this.renderTimer = setInterval(
            this.tick(onFrame),
            Math.round(1000 / fps)
        );
    }

    tick(onFrame) {
        return () => {
            try {
                onFrame(this.getFrame());
            } catch (e) {
                // TODO
            }
        };
    }

    getFrame() {
        const {video, context, canvas} = this;
        context.drawImage(video, 0, 0, video.width, video.height);
        return canvas;
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

        // STOP CAMERA NOT JUST FEED
        stream.getTracks().forEach(track => track.stop());

        if (video.mozSrcObject !== undefined) {
            return video.mozSrcObject = null;
        }
        video.src = "";
    }
}
