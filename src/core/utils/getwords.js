const fs = require('fs');
const path = require('path');

const getWords = () => {
  const words = fs.readFileSync(path.resolve(__dirname, '../data/words.txt'), 'utf8')
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length === 5)
    .filter(word => /^[a-z]+$/.test(word));

  return words;
}

// save file filtered words as json
const saveWordsAsJson = (words) => {
  fs.writeFileSync(path.resolve(__dirname, '../data/filtered-words.json'), JSON.stringify(words));
}

const words = getWords();

saveWordsAsJson(words);