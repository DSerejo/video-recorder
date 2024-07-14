import streamVideoChunks from './streamVideoChunks';

describe('streamVideoChunks', () => {
  test('calls onChunk with the provided chunk', () => {
    const chunk = new Blob(['chunk'], { type: 'video/webm' });
    const onChunk = jest.fn();
    streamVideoChunks(chunk, onChunk);
    expect(onChunk).toHaveBeenCalledWith(chunk);
  });
});