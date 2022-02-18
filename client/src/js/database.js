import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateDb')) {
        console.log('Sorry, jateDb already exists');
        return;
      }
      db.createObjectStore('jateDb', { keyPath: 'id', autoIncrement: true });
      console.log('jateDb successfully created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('PUT to the database');
const jateDb = await openDB('jateDb', 1);
//needs to be store name
const tx = jateDb.transaction('jateDb', 'readwrite');
const store = tx.objectStore('jateDb');
const request = store.put({ id: 1, value: content });
const result = await request;
console.log('Your data has been saved to the database!', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('GET all from the database');
  const jateDb = await openDB('jateDb', 1);
  const tx = jateDb.transaction('jateDb', 'readonly');
  const store = tx.objectStore('jateDb');
  const request = store.get(1);
  const result = await request;
  return result;
};
initdb();
