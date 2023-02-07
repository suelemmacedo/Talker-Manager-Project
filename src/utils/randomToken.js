const crypto = require('crypto');

function randomToken() {
  return crypto.randomBytes(8).toString('hex');
/* Ivan quem me explicou como fazer essa função */
}

module.exports = randomToken;