const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validationLogin = require('./middlewares/validationLogin');
const { readTalkers, writeNewTalkerData } = require('./utils/fsUtils');
const randomToken = require('./utils/randomToken');
const { tokenValidation, nameValidation, ageValidation, 
  talkValidation, 
  watchedAtValidation, rateValidation } = require('./middlewares/validationNewTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkersPath = '../talker.json';

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

app.post('/login', validationLogin, (_req, res) => {
  const token = randomToken();
    return res.status(200).json({ token });
});

app.post('/talker', tokenValidation, 
nameValidation, ageValidation, 
talkValidation, watchedAtValidation, 
rateValidation, async (req, res) => {
  try {
    const talker = await readTalkers();
    const newTalker = { id: talker.length + 1, ...req.body };
    await writeNewTalkerData([...talker, newTalker]);
      return res.status(201).json(newTalker);
  } catch (error) {
      return res.status(200).send([]);
  }
});

app.put('/talker/:id', tokenValidation, 
nameValidation, ageValidation, 
talkValidation, watchedAtValidation, 
rateValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talker = await readTalkers();
    const index = talker.findIndex((element) => element.id === +id);
    talker[index] = { id: +id, name, age, talk };
    const updateTalker = JSON.stringify(talker);
    await fs.writeFile(path.resolve(__dirname, talkersPath), updateTalker);
      return res.status(200).send(talker[index]);
  } catch (error) {
      return res.status(200).send([]);
  }
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkers();
  const index = talker.findIndex((element) => element.id === +id);
  const updateTalker = JSON.stringify(index);
  await fs.writeFile(path.resolve(__dirname, talkersPath), updateTalker);
      return res.status(204).send();
});