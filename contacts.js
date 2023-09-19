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

/**
 * Funkcja do pobierania kontaktu po ID
 * @param {string} contactId - ID kontaktu
 */
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

/**
 * Funkcja do usuwania kontaktu po ID
 * @param {string} contactId - ID kontaktu
 */
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

/**
 * Funkcja do dodawania nowego kontaktu
 * @param {string} name - Nazwa kontaktu
 * @param {string} email - Email kontaktu
 * @param {string} phone - Telefon kontaktu
 */
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
