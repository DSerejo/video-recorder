import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoRecorder from './VideoRecorder';
import useVideoRecorder from '../../hooks/useVideoRecorder';

jest.mock('../../hooks/useVideoRecorder');

describe('VideoRecorder Component', () => {
  const mockUseVideoRecorder = {
    videoRef: { current: null },
    recording: false,
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    status: 'Idle'
  };

  beforeEach(() => {
    (useVideoRecorder as jest.Mock).mockReturnValue(mockUseVideoRecorder);
  });

  test('renders Start Recording button', () => {
    render(<VideoRecorder />);
    expect(screen.getByText(/Start Recording/i)).toBeInTheDocument();
  });

  test('calls startRecording on button click', () => {
    render(<VideoRecorder />);
    fireEvent.click(screen.getByText(/Start Recording/i));
    expect(mockUseVideoRecorder.startRecording).toHaveBeenCalled();
  });

  test('calls stopRecording on button click when recording', () => {
    mockUseVideoRecorder.recording = true;
    render(<VideoRecorder />);
    fireEvent.click(screen.getByText(/Stop Recording/i));
    expect(mockUseVideoRecorder.stopRecording).toHaveBeenCalled();
  });
});