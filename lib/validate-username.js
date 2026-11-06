// Usernames: 3-30 characters, lowercase letters a-z, digits 0-9, and _ only.
// No spaces, capital letters, or other symbols. Invalid input is rejected,
// never auto-corrected.
const USERNAME_PATTERN = /^[a-z0-9_]{3,30}$/;

export function isValidUsername(username) {
  return USERNAME_PATTERN.test(username);
}
