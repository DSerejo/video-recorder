import { useState, useRef } from 'react';
import Timer from '../utils/timer';

const useVideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [latestChunk, setLatestChunk] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timer = useRef<Timer | null>(null);

  const formatTimeInMinutesSeconds = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const startStreaming = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };
  const startRecording = async () => {
    await startStreaming();
    setRecordingId(Date.now().toString() + '.webm');
    if (!timer.current) {
      timer.current = new Timer();
    }
    timer.current.reset();
    timer.current.start();
    timer.current.onTick((time) => {
      setRecordingTime(time);
    });
    const mediaRecorder = new MediaRecorder(videoRef.current?.srcObject as MediaStream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      const chunk = event.data;
      setLatestChunk(chunk);
    };

    mediaRecorder.onstop = () => {
      setRecording(false);
    };

    mediaRecorder.start(5000);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setRecording(false);
      mediaRecorderRef.current.stop();
      timer.current?.stop();
    }
  };

  return { 
    videoRef, 
    recording, 
    startRecording, 
    stopRecording, 
    startStreaming, 
    mediaRecorderRef, 
    recordingTime, 
    formatTimeInMinutesSeconds,
    recordingId,
    latestChunk,
  };
};

  export default useVideoRecorder;