import React, { useEffect, useState } from 'react';
import useVideoRecorder from '../../hooks/useVideoRecorder';
import './VideoRecorder.scss';
import useDrive from '../../hooks/gapi/useDrive';
import streamVideoChunks from '../../utils/streamVideoChunks';
import { useNavigate } from 'react-router-dom';
import { listFiles } from '../../drive/driveService';

const VideoElement = ({videoRef}: {videoRef: React.RefObject<HTMLVideoElement>}) => {

  return (
    <video ref={videoRef} autoPlay className="video-element w-100 h-100"></video>
  );
};

const VideoRecorder: React.FC = () => {
  const { 
    videoRef, 
    recording, 
    startRecording, 
    stopRecording, 
    startStreaming, 
    recordingTime, 
    formatTimeInMinutesSeconds,
    recordingId,
    latestChunk,

  } = useVideoRecorder();
  const { initializeUpload, folderId, resumableUploadUrl } = useDrive();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    startStreaming();
  }, [startStreaming]);

  useEffect(() => {
    if(recordingId && folderId) {
      initializeUpload(folderId, recordingId);
    }
  }, [recordingId, folderId]);

  useEffect(() => {
    if(latestChunk && resumableUploadUrl) {
      if(!recording){
        setUploading(true);
      }
      streamVideoChunks(resumableUploadUrl, latestChunk, !recording, (streamedChunk) => {
        if(!recording) {
          
          const checkFileUpload = async () => {
            const files = await listFiles(folderId!, recordingId!);
            if (files.length > 0) {
              setUploading(false);
              navigate('/gallery');
            } else {
              setTimeout(checkFileUpload, 2000); // Retry after 2 seconds
            }
          };
          setTimeout(() => {
            checkFileUpload();
          }, 1000);
          
        }
      });
    }
  }, [resumableUploadUrl, latestChunk]);


  return (
    <div className="video-recorder-container position-relative">
      <div className="video-container">
        <VideoElement videoRef={videoRef} />
        <div className="controls-container position-absolute bottom-0 start-50 translate-middle-x mb-3">
          {recording ? (
            <button className="stop-button" onClick={stopRecording}>
              <span className="material-icons">stop</span>
            </button>
          ) : (
            <button className="start-button" onClick={startRecording} disabled={uploading}>
              <span className="material-icons">videocam</span>
            </button>
          )}
        </div>
        <div className="status-container">
          {recording && <p>Recording Time: {formatTimeInMinutesSeconds(recordingTime)}</p>}
        </div>
      </div>
    </div>
  );
};


export default VideoRecorder;