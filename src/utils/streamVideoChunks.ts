import { uploadChunk } from "../drive/driveService";

let startByte = 0;
const chunkQueue: Blob[] = [];
let pendingChunk: Blob | null = null;
let isUploading = false;

const processQueue = async (resumableUploadUrl: string, end: boolean) => {
  if (isUploading || chunkQueue.length === 0) return;
  isUploading = true;

  while (chunkQueue.length > 0) {
    const chunk = chunkQueue.shift()!;
    
    await uploadChunk(resumableUploadUrl, chunk, startByte, startByte + chunk.size - 1, end);
    
    if (end) {
      startByte  = 0;
    }else{
      startByte += chunk.size;
    }
  }

  isUploading = false;
};

const streamVideoChunks = async (resumableUploadUrl: string, chunk: Blob, end: boolean, onChunk: (chunk: Blob) => void) => {
  chunk = addToPendingChunk(chunk);
  let adjustedChunk: Blob;
  if(!end){
    const chunkMultipleSize = 256 * 1024;
    const restOfchunkSize = chunk.size % chunkMultipleSize;
    const chunkSize = chunk.size - restOfchunkSize;
  
    adjustedChunk = chunk.slice(0, chunkSize);
    pendingChunk = chunk.slice(chunkSize, chunk.size);
  }else{
    adjustedChunk = chunk;
    pendingChunk = null;
  }
  chunkQueue.push(adjustedChunk);
  await processQueue(resumableUploadUrl, end);
  onChunk(adjustedChunk);
};



function addToPendingChunk(chunk: Blob) {
  if(pendingChunk) {
    return new Blob([pendingChunk, chunk]);
  }
  else {
    return chunk;
  }
}

export default streamVideoChunks;