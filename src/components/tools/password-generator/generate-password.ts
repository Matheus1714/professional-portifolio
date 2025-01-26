export function generatePassword({
  length,
  uppercase,
  lowercase,
  numbers,
  symbols,
}) {
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };

  let availableChars = '';
  if (uppercase) availableChars += charset.uppercase;
  if (lowercase) availableChars += charset.lowercase;
  if (numbers) availableChars += charset.numbers;
  if (symbols) availableChars += charset.symbols;

  if (!availableChars.length) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
}