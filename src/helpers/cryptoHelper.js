/**
 * Crypto Helper
 * Company Name: Ginger Technologies
 * Authour: Suchithra.S
 * Created Date: July 21, 2023
 * Description:
 *
 */
const crypto = require("crypto");

// Set your custom encryption key and a static IV here

const algorithm = "aes-256-ecb"; // Use ECB mode
const key = createEncryptionKeyFromStr("GingerTechWABACRM@2023");

// Function to create a 32-byte key from the provided string
function createEncryptionKeyFromStr(keyString) {
  const keyBuffer = Buffer.alloc(32);
  keyBuffer.write(keyString, "utf8");
  return keyBuffer;
}

// Function to encrypt data using AES-256 encryption

function encryptData(inptext) {
  let text = inptext.toString();
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), "");
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptData(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), "");
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  createEncryptionKeyFromStr,
  encryptData,
  decryptData,
};
