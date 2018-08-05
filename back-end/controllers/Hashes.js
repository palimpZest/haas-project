const Hash = require('../models/Hash');

let data = 'seald is awesome';
let algorithm = 'md5';
let iteration = 1;
let hash = 'efa2e29e0163e3c120cb295902602395';

// if (algorithm === 'md5') {
// } else if (algorithm === 'sha1') {
// } else if (algorithm === 'sha256') {
// };

const Hashes = {
  create: function(req, res) {
    console.log(res);
    Hash.create({
      data,
      algorithm,
      iteration,
      hash
    });
    res.end();
  }
};

module.exports = Hashes;
