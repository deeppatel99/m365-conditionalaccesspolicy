const path = require("path");
const {
  readCSV,
  appendCSV,
  findRecord,
  updateRecord,
} = require("../utils/csvUtil");

// Path to the users CSV file
const usersFile = path.join(__dirname, "../data/users.csv");

// Find a user by email
exports.findByEmail = async (email) => {
  return await findRecord(usersFile, "email", email);
};

// Find a user by domain
exports.findByDomain = async (domain) => {
  const users = await readCSV(usersFile);
  return users.find((user) => user.domain === domain);
};

// Create a new user
exports.create = async (user) => {
  await appendCSV(usersFile, user);
};

// Update a user by email
exports.updateByEmail = async (email, updateObj) => {
  return await updateRecord(usersFile, "email", email, updateObj);
};

// Get all users
exports.getAll = async () => {
  return await readCSV(usersFile);
};
