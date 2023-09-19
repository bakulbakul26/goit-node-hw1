const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku", err);
            return;
        }
        const contacts = JSON.parse(data);
        console.table(contacts);
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku", err);
            return;
        }
        const contacts = JSON.parse(data);
        const contact = contacts.find((c) => c.id === contactId);
        console.log(contact);
    });
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku", err);
            return;
        }
        let contacts = JSON.parse(data);
        contacts = contacts.filter((c) => c.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error("Błąd zapisu pliku", err);
            }
        });
    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku", err);
            return;
        }
        const contacts = JSON.parse(data);
        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error("Błąd zapisu pliku", err);
            }
        });
    });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
