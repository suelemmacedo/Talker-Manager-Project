const fs = require('fs').promises; // promises é mais performática.
const path = require('path');

const talkersPath = '../talker.json';

async function readTalkers() {
try {
  const data = await fs.readFile(path.resolve(__dirname, talkersPath));
  const talkers = JSON.parse(data);
  
  return talkers;
} catch (error) {
  return error.message;
}
}

readTalkers();

async function writeNewTalkerData(newTalker) {
  try {
    const oldTalkers = await readTalkers();
    const allTalkers = JSON.stringify([...oldTalkers, newTalker]);

    await fs.writeFile(path.resolve(__dirname, talkersPath, 'utf-8'), allTalkers);
  } catch (error) {
    return error.message;
  } 
}

module.exports = {
  readTalkers,
  writeNewTalkerData,
};