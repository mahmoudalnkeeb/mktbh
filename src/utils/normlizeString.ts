function normalizeString(str: string): string {
  str = str.toLowerCase();
  str = str.normalize('NFC');
  str = str.normalize('NFD');
  str = str.normalize('NFKC');
  str = str.normalize('NFKD');
  str = removeDots(str);
  return str.split(' ').join('');
}

function removeDots(str: string): string {
  str = str.replace(/[ًٌٍَُِّْٕٖٜٟٓٔٗ٘ٙٚٛٝٞ]/g, '');
  str = str.replace(/[أإآ]/g, 'ا');
  str = str.replace(/[ئي]/g, 'ى');
  str = str.replace('ؤ', 'و');
  str = str.replace('ة', 'ه');
  return str;
}

export default normalizeString;
