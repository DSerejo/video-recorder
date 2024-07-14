const streamVideoChunks = (chunk: Blob, onChunk: (chunk: Blob) => void) => {
  onChunk(chunk);
};

export default streamVideoChunks;