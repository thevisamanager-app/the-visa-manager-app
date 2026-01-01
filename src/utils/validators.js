export function validateDate(d) {
  return /^\d{6}$/.test(d); // YYMMDD
}

export function validatePassportNumber(num) {
  return /^[A-Z0-9]{6,9}$/.test(num);
}
