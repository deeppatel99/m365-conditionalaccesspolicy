const path = require("path");
const {
  readCSV,
  appendCSV,
  findRecord,
  updateRecord,
} = require("../utils/csvUtil");

const usersFile = path.join(__dirname, "../data/users.csv");

exports.findByEmail = async (email) => {
  return await findRecord(usersFile, "email", email);
};

exports.findByDomain = async (domain) => {
  const users = await readCSV(usersFile);
  return users.find((user) => user.domain === domain);
};

exports.create = async (user) => {
  await appendCSV(usersFile, user);
};

exports.updateByEmail = async (email, updateObj) => {
  return await updateRecord(usersFile, "email", email, updateObj);
};

exports.getAll = async () => {
  return await readCSV(usersFile);
};
