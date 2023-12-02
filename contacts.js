const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const listContacts = await fs.readFile(contactsPath);
    return JSON.parse(listContacts.toString());
  } catch (error) {
    console.log("error: ", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log("error: ", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const contactIndex = allContacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const deletedContact = allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return deletedContact;
  } catch (error) {
    console.log("error: ", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newArray = [newContact, ...allContacts];
    await fs.writeFile(contactsPath, JSON.stringify(newArray));
    return newContact;
  } catch (error) {
    console.log("error: ", error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
