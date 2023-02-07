const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } 
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  const emailValidation = regex.test(email); /* //Ajuda da Nathália Andrade */
  const passwordValidation = password.length >= 6;
  if (!emailValidation) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  if (!passwordValidation) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = validationLogin;