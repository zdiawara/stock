class ProductRepository {
  constructor() {}

  insert(data, tx = null) {
    if (!data) {
      return;
    }
    const products = !data.length ? [data] : data;
    if (!products.length) {
      return;
    }
    if (tx) {
      products.forEach((product) => {
        tx.executeSql(
          'insert into products (price,stock,type_product_id,created_at) values (?,?,?,?)',
          [
            parseInt(product.price, 10),
            product.stock,
            product.typeProduct,
            new Date().toString(),
          ],
        );
      });
    }
  }

  update(data, tx = null) {
    if (!data) {
      return;
    }
    const products = !data.length ? [data] : data;
    if (!products.length) {
      return;
    }
    if (tx) {
      products.forEach((product) => {
        tx.executeSql(
          'update  products set price = ? , stock = ? , updated_at = ? where id = ?',
          [
            parseInt(product.price, 10),
            product.stock,
            new Date().toString(),
            product.id,
          ],
        );
      });
    }
  }

  sync(products, tx = null) {
    if (!products) {
      return;
    }

    const toUpdate = products.filter((p) => p.id);
    // Modifie les produits existants
    if (toUpdate.length) {
      this.update(toUpdate, tx);
    }

    tx.executeSql(
      `delete from products where type_product_id in (${toUpdate
        .map((p) => p.typeProduct)
        .join(',')})  and id not in(${toUpdate.map((p) => p.id).join(',')})`,
    );

    const toCreate = products.filter(
      (p) => p.id === null || p.id === undefined,
    );
    // Insert les nouveaux produits
    if (toCreate.length) {
      this.insert(toCreate, tx);
    }
  }
}

export default new ProductRepository();
