const DATE_FIELDS =
  'created_at DATE NOT NULL, updated_at DATE NULL, deleted_at DATE NULL';

export const typeProductTable = `CREATE TABLE TYPE_PRODUCTS (
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    ${DATE_FIELDS}
  );`;

export const productTable = `CREATE TABLE IF NOT EXISTS PRODUCTS (
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(50) NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    type_product_id INTEGER NOT NULL,
    ${DATE_FIELDS},
    FOREIGN KEY (type_product_id) REFERENCES TYPE_PRODUCT(ID)
);`;
