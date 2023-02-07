const express = require('express');
const { readTalkers, writeNewTalkerData } = require('./utils/fsUtils');

/* async function main() {
  const talkers = await readTalkers()
  console.log(talkers)
}

main() */

/* async function main2() {
  writeNewTalkerData({
    name: 'Suelem Macedo',
    age: 31,
    id: 5,
    talk: { watchedAt: '28/02/1991', rate: 5 }
  }) 
}

main2(); */

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

