import {rowsToArray} from '../utils/helper';
import getDB, {executeQuery} from './db';
import productRepository from './productRepository';

const addTypeProductId = (products, insertId) => {
  return (products || []).map((p) => ({
    ...p,
    typeProduct: insertId,
  }));
};
class TypeProductRepository {
  constructor() {}

  findAll() {
    return executeQuery(
      'select count(p.id) as nbProduct, sum(p.stock) as stock, tp.name, tp.id from type_products tp inner join products p on p.type_product_id = tp.id group by tp.id',
    );
  }

  async findOne(id) {
    const db = await getDB();

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'select * from type_products where id = ?',
            [id],
            (_, {rows}) => {
              const item = rows.item(0);
              if (!item) {
                return reject('Not found');
              }

              tx.executeSql(
                'select * from products where type_product_id = ?',
                [id],
                (__, result) => {
                  resolve({...item, products: rowsToArray(result.rows)});
                },
              );
            },
          );
        },
        (e) => {
          console.error(e);
          reject(e);
        },
      );
    });
  }

  async insert(typeProduct = {}) {
    const {name} = typeProduct;

    const db = await getDB();

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'insert into type_products (name,created_at) VALUES (?,?)',
            [name, new Date().toString()],
            (_, {insertId}) => {
              productRepository.insert(
                addTypeProductId(typeProduct.products, insertId),
                tx,
              );
              resolve(insertId);
            },
          );
        },
        (e) => {
          console.error(e);
          reject(e);
        },
      );
    });
  }

  async update(id, typeProduct = {}) {
    const {name} = typeProduct;

    const db = await getDB();

    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'update type_products set name = ? , updated_at = ? where id = ?',
            [name, new Date().toString(), id],
            () => {
              productRepository.sync(
                addTypeProductId(typeProduct.products, id),
                tx,
              );
              resolve(id);
            },
          );
        },
        (e) => {
          console.error(e);
          reject(e);
        },
      );
    });
    //return executeQuery();
  }
}

export default new TypeProductRepository();
