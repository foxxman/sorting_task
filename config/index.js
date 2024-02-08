const config = {
    memorySize: 128 * 1024, // available memory in bytes
    inputFilePath: 'inputFile.txt', // name of the unsorted file
    outputFilePath: 'sortedFile.txt', // file for writing sorted lines
    numLines: 10000, // generate file for testing
    tempDir: 'temp',
}

module.exports = config