import { useState, useRef } from 'react';
import streamVideoChunks from '../utils/streamVideoChunks';

const useVideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState<string>('Idle');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = async () => {
    setStatus('Starting recording...');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      const chunk = event.data;
      streamVideoChunks(chunk, (streamedChunk) => {
        console.log('Streaming chunk:', streamedChunk);
        // Here you can handle the streamed chunk, e.g., send it to a server
      });
    };

    mediaRecorder.onstop = () => {
      setStatus('Recording stopped');
    };

    mediaRecorder.start(1000);
    setRecording(true);
    setStatus('Recording...');
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setStatus('Stopping recording...');
    }
  };

  return { videoRef, recording, startRecording, stopRecording, status };
};

export default useVideoRecorder;