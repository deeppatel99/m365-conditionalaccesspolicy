const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

function parseCSV(content) {
  const [header, ...lines] = content.trim().split("\n");
  const keys = header.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return keys.reduce((obj, key, idx) => ({ ...obj, [key]: values[idx] }), {});
  });
}

function stringifyCSV(data) {
  const keys = Object.keys(data[0]);
  const lines = data.map((obj) => keys.map((k) => obj[k]).join(","));
  return [keys.join(","), ...lines].join("\n");
}

const readCSV = (file) =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(file)) return resolve([]);
    fs.readFile(file, "utf8", (err, data) => {
      if (err) return reject(err);
      resolve(parseCSV(data));
    });
  });

const appendCSV = (file, record) =>
  new Promise(async (resolve, reject) => {
    const exists = fs.existsSync(file);
    const line = Object.values(record).join(",");
    if (!exists) {
      const header = Object.keys(record).join(",") + "\n";
      fs.writeFile(file, header + line + "\n", (err) =>
        err ? reject(err) : resolve()
      );
    } else {
      fs.appendFile(file, line + "\n", (err) =>
        err ? reject(err) : resolve()
      );
    }
  });

// Find a record by key (e.g., email)
async function findRecord(file, key, value) {
  const records = await readCSV(file);
  return records.find((r) => r[key] === value);
}

// Update a record by key (e.g., email)
async function updateRecord(file, key, value, updateObj) {
  const records = await readCSV(file);
  const idx = records.findIndex((r) => r[key] === value);
  if (idx === -1) return false;
  records[idx] = { ...records[idx], ...updateObj };
  await overwriteCSV(file, records);
  return true;
}

// Overwrite the entire CSV file
async function overwriteCSV(file, records) {
  if (!records.length) return;
  const csv = stringifyCSV(records);
  return fs.promises.writeFile(file, csv + "\n");
}

function generateUserId() {
  return randomUUID();
}

module.exports = {
  readCSV,
  appendCSV,
  findRecord,
  updateRecord,
  overwriteCSV,
  generateUserId,
};
