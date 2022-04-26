const fs = require("fs").promises;
const { nanoid } = require("nanoid");
require("colors");
const contactsPath = "./db/contacts.json";

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const contact = contactsArray.find((item) => item.id === contactId);
  console.log(`we found a contact ${contact.name}`.green);
  console.log(contact);
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const filteredContacts = contactsArray.filter(
    (item) => item.id !== contactId
  );
  const deletedContact = contactsArray.find((item) => item.id === contactId);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  console.log(`User ${deletedContact.name} deleted`.green);
  console.log(deletedContact);
}

async function addContact(name, email, phone) {
  const contactObject = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  const contactsArray = await listContacts();
  contactsArray.push(contactObject);
  fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  console.log(`Added user ${name} to contacts list`.green);
  console.log(contactObject);
}

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
