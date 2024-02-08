const fs = require('fs');
const { MinHeap } = require("./MinHeap");
const { createLineReader } = require('./filesService');

const  mergeChunks = async ({ chunkFilePaths, outputFilePath }) => {
    const chunkReaders = chunkFilePaths.map((path) => createLineReader({ path }));
  
    const heap = new MinHeap();
  
    console.log('Chunks to merge: ', chunkReaders.length);
    
    for (let i = 0; i < chunkReaders.length; i++) {
      const line = await chunkReaders[i].next();
      if (line !== null) {
        heap.push({ line, chunkIndex: i });
      }
    }
  
    const outputFileStream = fs.createWriteStream(outputFilePath);
  
    while (heap.size() > 0) {
      const { line, chunkIndex } = heap.pop();
  
      outputFileStream.write(`${line}\n`);
  
      const nextLine = await chunkReaders[chunkIndex].next();
      if (nextLine !== null) {
        heap.push({ line: nextLine, chunkIndex });
      }
    }
  
    outputFileStream.close();
    console.log('Chunks merged.');
}

module.exports = {
  mergeChunks,
}