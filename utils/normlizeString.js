/**
 *
 * @param {string} string
 */
function normlizeString(string) {
  let str;
  str = string.toLowerCase();
  str = str.normalize('NFC');
  str = str.normalize('NFD');
  str = str.normalize('NFKC');
  str = str.normalize('NFKD');
  str = removeDots(str);
  return str.split(' ').join('');
}

/**
 *
 * @param {string} arString
 */
function removeDots(arString) {
  let str = arString.replace(/[ًٌٍَُِّْٕٖٜٟٓٔٗ٘ٙٚٛٝٞ]/g, '');
  str = str.replace(/[أإآ]/g, 'ا');
  str = str.replace(/[ئي]/g, 'ى');
  str = str.replace('ؤ', 'و');
  str = str.replace('ة', 'ه');
  return str;
}

module.exports = normlizeString;
