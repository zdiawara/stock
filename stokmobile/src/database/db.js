import SQLite from 'react-native-sqlite-storage';
import * as tables from './tables';

const getDB = () => {
  return new Promise((resolve, reject) => {
    //SQLite;
    //this.sqlite.DEBUG(true);
    //this.sqlite.enablePromise(true);
    SQLite.openDatabase(
      {
        name: 'test11.db',
        location: 'default',
      },
      async (db) => {
        createTableIfNeed(db).then(() => {
          resolve(db);
        });
      },
      (error) => {
        console.error('ERROR Init DB');
        reject(error);
      },
    );
  });
};

function createTableIfNeed(db) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // tentative de select
        tx.executeSql('select id from products', [], (_, r) => {
          resolve();
        });
      },
      () => {
        console.info('Création des tables ...');
        db.transaction(
          (tx) => {
            // Creation des tables
            Object.values(tables).forEach((table) => {
              tx.executeSql(table);
            });
          },

          (er) => {
            console.error('Erreur lors de la création des tables ...', er);
            reject(er);
          },

          () => {
            console.info('Les tables ont été crées avec success');
            resolve();
          },
        );
      },
    );
  });
}

export const getTransaction = async () => {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        resolve(tx);
      },
      (e) => {
        console.error(e);
        reject(e);
      },
    );
  });
};

export const executeQuery = async (query = '', params = []) => {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
};

export default getDB;
