import { renderHook, act } from '@testing-library/react';
import useVideoRecorder from './useVideoRecorder';

describe('useVideoRecorder', () => {
  test('initial state is correct', () => {
    const { result } = renderHook(() => useVideoRecorder());
    expect(result.current.recording).toBe(false);
    expect(result.current.status).toBe('Idle');
  });

  test('startRecording sets recording to true and status to Recording...', async () => {
    const { result } = renderHook(() => useVideoRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    expect(result.current.recording).toBe(true);
    expect(result.current.status).toBe('Recording...');
  });

  test('stopRecording sets recording to false and status to Stopping recording...', () => {
    const { result } = renderHook(() => useVideoRecorder());
    act(() => {
      result.current.stopRecording();
    });
    expect(result.current.recording).toBe(false);
    expect(result.current.status).toBe('Stopping recording...');
  });
});