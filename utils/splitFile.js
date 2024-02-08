const fs = require('fs');
const readline = require('readline');
const { writeChunkToFile } = require('./filesService');

const splitFile = async ({ inputFilePath, tempDir, memorySize }) => {
    const chunkFilePaths = [];
  
    const inputFileLines = readline.createInterface({
      input: fs.createReadStream(inputFilePath),
      crlfDelay: Infinity,
    });
  
    let chunk = [];
    console.log('Reading lines to chanks...');
  
    for await (const line of inputFileLines) {
      chunk.push(line);
      const isOverflow = Buffer.from(chunk.join('\n')).length >= memorySize;
      
      if ( isOverflow ) {
        console.log('Buffer overflow: ', Buffer.from(chunk.join('\n')).length);
        const sortedChunk = chunk.sort();

        const chunkFilePath = await writeChunkToFile({
            chunk: sortedChunk,
            tempDir,
            fileNumber: chunkFilePaths.length,
        })
        chunkFilePaths.push(chunkFilePath);

        chunk = [];
      }
    }
  
    if (chunk.length > 0) {
    const sortedChunk = chunk.sort();
      const lastChunkFilePath = await writeChunkToFile({
        chunk: sortedChunk,
        tempDir,
        fileNumber: chunkFilePaths.length,
      });
      chunkFilePaths.push(lastChunkFilePath);
    }
  
    return chunkFilePaths;
}

module.exports = {
    splitFile,
}