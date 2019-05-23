import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNAudioRecord } = NativeModules;
const EventEmitter = new NativeEventEmitter(RNAudioRecord);

const AudioRecord = {};

AudioRecord.init = options => RNAudioRecord.init(options);
AudioRecord.start = () => RNAudioRecord.start();
AudioRecord.stop = () => RNAudioRecord.stop();
AudioRecord.pause = () => RNAudioRecord.pause();
AudioRecord.restart = () => RNAudioRecord.restart();

const eventsMap = {
  data: 'data',
  done: 'done',
};

AudioRecord.on = (event, callback) => {
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }
  EventEmitter.removeAllListeners(nativeEvent);
  return EventEmitter.addListener(nativeEvent, callback);
};

export default AudioRecord;
