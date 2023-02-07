const fs = require('fs').promises; //promises é mais performática.
const path = require('path')
const talkersPath = '../../data/talker.json';

async function readTalkers() {
try {
  const data = await fs.readFile(path.resolve(__dirname, talkersPath));
  const talkers = JSON.parse(data)

  return talkers;
} catch(error) {
  console.error(`Erro na leitura do arquivo: ${error}`)
}
}

readTalkers();

async function writeNewTalkerData(newTalker) {
  try {
    const oldTalkers = await readTalkers()
    const allTalkers = JSON.stringify([...oldTalkers, newTalker])

    await fs.writeFile(path.resolve(__dirname, talkersPath), allTalkers)
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  } 
}

module.exports = {
  readTalkers,
  writeNewTalkerData
};