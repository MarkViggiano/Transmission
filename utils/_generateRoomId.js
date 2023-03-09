const VALID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

module.exports = () => {
  let size = 6;
  let code = "";
  for (let i = 0; i < size; i++) code += VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)];
  return code;
};
