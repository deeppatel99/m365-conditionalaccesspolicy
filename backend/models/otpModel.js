const path = require("path");
const { readCSV, appendCSV } = require("../utils/csvUtil");

const otpsFile = path.join(__dirname, "../data/otps.csv");

exports.create = async (otpRecord) => {
  await appendCSV(otpsFile, otpRecord);
};

exports.findLatestByEmail = async (email) => {
  const otps = await readCSV(otpsFile);
  return otps.reverse().find((o) => o.email === email);
};
