const { readTalkers, writeNewTalkerData } = require('./utils/fsUtils');

/* async function main() {
  const talkers = await readTalkers()
  console.log(talkers)
}

main() */

async function main2() {
  writeNewTalkerData({
    name: 'Suelem Macedo',
    age: 31,
    id: 5,
    talk: { watchedAt: '28/02/1991', rate: 5 }
  }) 
}

main2();