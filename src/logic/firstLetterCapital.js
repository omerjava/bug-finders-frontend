export function firstLetterCapital(word) {
  if (word === undefined || word === null) return "";
  const trimmedWord = word.trim();
  if (trimmedWord.length === 0) return "";
  return trimmedWord[0].toUpperCase() + trimmedWord.substring(1);
}
