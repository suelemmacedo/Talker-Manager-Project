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
   return fs.writeFile(path.resolve(__dirname, talkersPath), JSON.stringify(newTalker, null, 2));
}

module.exports = {
  readTalkers,
  writeNewTalkerData,
};