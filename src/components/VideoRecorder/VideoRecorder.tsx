import React from 'react';
import useVideoRecorder from '../../hooks/useVideoRecorder';

const VideoRecorder: React.FC = () => {
  const { videoRef, recording, startRecording, stopRecording, status } = useVideoRecorder();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <video ref={videoRef} autoPlay className="w-100"></video>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          {recording ? (
            <button className="btn btn-danger" onClick={stopRecording}>
              Stop Recording
            </button>
          ) : (
            <button className="btn btn-primary" onClick={startRecording}>
              Start Recording
            </button>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;