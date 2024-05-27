function randomPick(string: string, n: number): string {
  if (n > string.length) {
    throw new Error('n cannot be greater than the length of the string')
  }
  return [...string]
    .sort(() => Math.random() - 0.5)
    .slice(0, n)
    .join('')
}

export const useGenerateId = (n: number = 7): string => {
  // Generate random characters using character codes
  let randomString = ''
  for (let i = 0; i < n; i++) {
    const randomCharCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97 // Generate a random character between 'a' and 'z' (inclusive)
    randomString += String.fromCharCode(randomCharCode)
  }

  // Combine timestamp and random string for uniqueness
  return randomPick(Date.now().toString() + randomString, n)
}
