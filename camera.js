'use strict';

import { merge } from 'lodash';
import DEFAULT_OPTIONS from './defaults';

export default class Camera {
  constructor(captureOptions) {
    this.options = merge({}, DEFAULT_OPTIONS, captureOptions);
  }

  async init() {
    return this.initVideoStream();
  }

  initVideoStream() {
    return new Promise((resolve, reject) => {
      const { width, height } = this.options;
      this.video = document.createElement('video');
      this.video.setAttribute('width', width);
      this.video.setAttribute('height', height);

      const getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      );

      if (!getUserMedia) {
        reject(Error('NOT_SUPPORTED'));
      }

      getUserMedia.call(
        navigator,
        { video: true },
        (s) => {
          this.stream = s;

          if (this.video.mozSrcObject !== undefined) { // hack for Firefox < 19
            this.video.mozSrcObject = this.stream;
          } else {
            const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
            this.video.src = (URL && URL.createObjectURL(this.stream)) || this.stream;
          }

          resolve(this.initCanvas());
        },
        reject
      );
    });
  }

  initCanvas() {
    const { container, width, height, mirror } = this.options;
    this.canvas = container || document.createElement('canvas');
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);

    this.context = this.canvas.getContext('2d');

    // mirror video
    if (mirror) {
      this.context.translate(this.canvas.width, 0);
      this.context.scale(-1, 1);
    }

    return this.start();
  }

  start() {
    const { video } = this;
    const { onFrame, fps } = this.options;
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
    const { video, context, canvas } = this;
    context.drawImage(video, 0, 0, video.width, video.height);
    return canvas;
  }

  pause() {
    const { renderTimer, video } = this;

    if (renderTimer) {
      clearInterval(renderTimer);
    }

    video.pause();
  }

  stop() {
    const { video, stream } = this;
    this.pause();

    // STOP CAMERA NOT JUST FEED
    stream.getTracks().forEach(track => track.stop());

    if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = null;
    } else {
      video.src = '';
    }
  }
}
