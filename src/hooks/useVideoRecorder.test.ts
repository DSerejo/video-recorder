import { renderHook, act } from '@testing-library/react';
import useVideoRecorder from './useVideoRecorder';

describe('useVideoRecorder', () => {
    let mockMediaRecorder: any;
    let mockVideoElement: any;

    beforeEach(() => {
        mockMediaRecorder = {
            start: jest.fn(),
            stop: jest.fn(),
            ondataavailable: jest.fn(),
            onstop: jest.fn(),
        };

        mockVideoElement = {
            srcObject: null,
        };

        (global.navigator as any).mediaDevices = {
            getUserMedia: jest.fn().mockResolvedValue({
                getTracks: () => [{ stop: jest.fn() }],
            }),
        };

        window.MediaRecorder = (jest.fn() as any).mockImplementation(
            () => mockMediaRecorder,
        );

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('initial state is correct', () => {
        const { result } = renderHook(() => useVideoRecorder());
        expect(result.current.recording).toBe(false);
    });

    test('startRecording sets recording to true and status to Recording...', async () => {
        const { result } = renderHook(() => useVideoRecorder());
        result.current.videoRef.current = mockVideoElement;
        result.current.mediaRecorderRef.current = mockMediaRecorder;

        await act(async () => {
            await result.current.startRecording();
        });

        expect(result.current.recording).toBe(true);
        expect(mockMediaRecorder.start).toHaveBeenCalled();
    });

    test('stopRecording sets recording to false', () => {
        const { result } = renderHook(() => useVideoRecorder());
        result.current.mediaRecorderRef.current = mockMediaRecorder;

        act(() => {
            result.current.stopRecording();
        });

        expect(result.current.recording).toBe(false);
        expect(mockMediaRecorder.stop).toHaveBeenCalled();
    });
});