const crypto = require("crypto");
module.exports.randoms = function (length = 10, type = "normal") {
  let strings = "";
  const bravo_set = {
    alphas: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alpahsUpr: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alpahsLow: "abcdefghijklmnopqrstuvwxyz",
    hardcoded: "~!@#$%^&*()-_=+[{}]|<,.>/?",
    numerics: "1234567890",
  };
  let abc = "";
  if (type === "normal") abc = bravo_set.alphas;
  if (type === "easy") abc = bravo_set.alpahsLow;
  if (type === "hard") abc = bravo_set.alphas + bravo_set.numerics;
  if (type === "hardcoded")
    abc = bravo_set.alphas + bravo_set.numerics + bravo_set.hardcoded;
  let index = 54;
  for (let i = 0; i < length; i++) {
    index = Math.ceil(Math.random() * (abc.length - 1));
    strings += abc[index];
  }
  return strings;
};

module.exports._hashes_ = function (pass) {
  let hash = crypto.createHash("md5");
  let hash_update = hash.update(pass, "utf-8");
  let generated_hash = hash_update.digest(["hex"]);
  return generated_hash;
};
function CheckInvalidChars(chars) {
  const invalid = " #$%^&*()-+=<>?/.,'/\"\\|[]}{`~!";
  for (let k = 0; k < chars.length; k++) {
    for (let i = 0; i < invalid.length; i++) {
      if (invalid[i] === chars[k]) {
        return 1;
      }
    }
  }
  return 0;
}
