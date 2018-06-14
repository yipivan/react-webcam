import React, { Component } from 'react';
import { BrowserQRCodeReader, VideoInputDevice, BrowserQRCodeSvgWriter, MultiFormatReader } from '@zxing/library';

class App extends Component {
  componentDidMount() {
    const codeReader = new MultiFormatReader();

    codeReader.getVideoInputDevices()
      .then(videoInputDevices => {
        videoInputDevices.forEach(
          device => console.log(`${device.label}, ${device.deviceId}`)
        );
        const firstDeviceId = videoInputDevices[0].deviceId;
        codeReader.decodeFromInputVideoDevice(firstDeviceId, 'video')
          .then(result => {
            console.log(result.text);
            const codeWriter = new BrowserQRCodeSvgWriter('result');
            const svgElement = codeWriter.write(result, 300, 300);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div className="App">
        <video id="video" width="300" height="200" style={{border: '1px solid gray'}}></video>
        <div id="result"></div>
      </div>
    );
  }
}

export default App;
