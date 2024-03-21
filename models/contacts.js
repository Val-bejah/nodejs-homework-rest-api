// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => {
      throw error;
    });
};

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts.find((contact) => contact.id === contactId);
    })
    .catch((error) => {
      throw error;
    });
};

const removeContact = async (contactId) => {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      let contacts = JSON.parse(data);
      contacts = contacts.filter((contact) => contact.id !== contactId);
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => `Contact with ID ${contactId} removed successfully.`);
    })
    .catch((error) => {
      throw error;
    });
};

const addContact = async (newContact) => {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      newContact.id = Date.now().toString();
      contacts.push(newContact);
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => newContact);
    })
    .catch((error) => {
      throw error;
    });
};

const updateContact = (contactId, updatedFields) => {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        throw new Error("Contact not found.");
      }
      contacts[index] = { ...contacts[index], ...updatedFields };
      return fs
        .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        .then(() => contacts[index]);
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
