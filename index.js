const config = require("./config");
const { cleanAndRemoveDir, createDir } = require("./utils/filesService");
const { mergeChunks } = require("./utils/mergeChunks");
const { splitFile } = require("./utils/splitFile");

async function externalSort({
  inputFilePath,
  outputFilePath,
  memorySize,
  tempDir,
}) {
  try {
    await createDir({ path: tempDir })

    const chunkFilePaths = await splitFile({ inputFilePath, tempDir, memorySize });
    
    await mergeChunks({ chunkFilePaths, outputFilePath });
  } catch (error) {
    console.log(error.message);
  } finally {
    cleanAndRemoveDir({ path: tempDir })
    console.log('Sorted file saved as:', outputFilePath);
  }
}

externalSort(config);