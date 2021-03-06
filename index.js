'use strict';
var _InCallManager = require('react-native').NativeModules.InCallManager;

class InCallManager {
    constructor() {
        this.recordPermission = 'unknow';
        this.checkRecordPermission = this.checkRecordPermission.bind(this);
        this.requestRecordPermission = this.requestRecordPermission.bind(this);
        this.checkRecordPermission();
    }

    start(setup) {
        setup = (setup === undefined) ? {} : setup;
        let auto = (setup.auto === false) ? false : true;
        let media = (setup.media === 'video') ? 'video' : 'audio';
        let ringback = (!!setup.ringback) ? (typeof setup.ringback === 'string') ? setup.ringback : "" : "";
        _InCallManager.start(media, auto, ringback);
    }

    stop(setup) {
        setup = (setup === undefined) ? {} : setup;
        let busytone = (!!setup.busytone) ? (typeof setup.busytone === 'string') ? setup.busytone : "" : "";
        _InCallManager.stop(busytone);
    }

    turnScreenOff() {
        _InCallManager.turnScreenOff();
    }

    turnScreenOn() {
        _InCallManager.turnScreenOn();
    }

    setKeepScreenOn(enable) {
        enable = (enable === true) ? true : false;
        _InCallManager.setKeepScreenOn(enable);
    }

    setSpeakerphoneOn(enable) {
        enable = (enable === true) ? true : false;
        _InCallManager.setSpeakerphoneOn(enable);
    }

    setForceSpeakerphoneOn(_flag) {
        let flag = (typeof _flag === "boolean") ? (_flag) ? 1 : -1 : 0;
        _InCallManager.setForceSpeakerphoneOn(flag);
    }

    setMicrophoneMute(enable) {
        enable = (enable === true) ? true : false;
        _InCallManager.setMicrophoneMute(enable);
    }

    startRingtone(ringtone) {
        ringtone = (typeof ringtone === 'string') ? ringtone : "_DEFAULT_";
        _InCallManager.startRingtone(ringtone);
    }

    stopRingtone() {
        _InCallManager.stopRingtone();
    }

    stopRingback() {
        _InCallManager.stopRingback();
    }

    async checkRecordPermission() {
		// --- on android which api < 23, it will always be "granted"
        let result = await _InCallManager.checkRecordPermission();
        this.recordPermission = result;
        return result;
    }

    async requestRecordPermission() {
		// --- on android which api < 23, it will always be "granted"
        let result = await _InCallManager.requestRecordPermission();
        this.recordPermission = result;
        return result;
    }
}

export default new InCallManager();
