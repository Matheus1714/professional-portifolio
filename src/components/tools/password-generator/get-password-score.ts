export function getPasswordScore(password: string): number {
  if (!password.length) return 0;

  let score = 0;

  const lengthScore = Math.min(password.length * 4, 40); // Máximo de 40 pontos para comprimento
  score += lengthScore;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(password);

  if (hasUppercase) score += 15;
  if (hasLowercase) score += 15;
  if (hasNumbers) score += 20;
  if (hasSymbols) score += 20;

  if (password.length < 8) score -= 20;

  return Math.max(1, Math.min(100, score));
}
