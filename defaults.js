'use strict';

const noop = () => {
};

const DEFAULT_OPTIONS = {
    fps: 30,
    width: 640,
    height: 480,
    mirror: false,
    targetCanvas: null,
    onSuccess: noop,
    onError: noop,
    onNotSupported: noop,
    onFrame: noop
};

export default DEFAULT_OPTIONS;