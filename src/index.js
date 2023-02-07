const express = require('express');
const { readTalkers } = require('./utils/fsUtils');
const randomToken = require('./utils/randomToken');

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

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readTalkers();
    return res.status(200).send(talkers);
  } catch (error) {
    return res.status(200).send([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talker = await readTalkers();
    const talker1 = talker.find(({ id }) => id === +(req.params.id));
    if (!talker1) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    } 
      return res.status(200).json(talker1);
  } catch (error) {
      return res.status(200).send([]);
  }
});

app.post('/login', (_req, res) => {
  const token = randomToken();
  return res.status(200).json({ token });
});