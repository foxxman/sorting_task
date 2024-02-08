const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const createLineReader = ({ path }) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity,
    });

    const iterator = rl[Symbol.asyncIterator]();

    return {
        next: async () => {
            const { done, value } = await iterator.next();
            return done ? null : value;
        },
    };
}

const writeChunkToFile = async ({
    chunk,
    tempDir,
    fileNumber,
}) => {
    const chunkFilePath = `${tempDir}/chunk_${fileNumber}.txt`;
    await writeFileAsync(chunkFilePath, chunk.join('\n'))
    console.log(`Chunk ${fileNumber} writed with ${chunk.length} strings`);

    return chunkFilePath;
}

const createDir = async ({ path }) => {
    console.log('Creatiing directory...');
    await fs.promises.mkdir(path);
}

const cleanAndRemoveDir = async ({ path }) => {
    console.log('Removing directory...');

    const files = await promisify(fs.readdir)(path);

    for (const file of files) {
        const filePath = `${path}/${file}`;
        await promisify(fs.unlink)(filePath);
    }

    await promisify(fs.rmdir)(path);
}


module.exports = {
    cleanAndRemoveDir,
    writeChunkToFile,
    createLineReader,
    createDir,
}