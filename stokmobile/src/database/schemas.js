import models from './models';

export const typeProduct = {
  name: models.typeProduct,
  primaryKey: 'code',
  properties: {
    code: 'string',
    name: 'string',
    products: {type: 'list', objectType: models.product},
  },
};

export const Product = {
  name: models.product,
  primaryKey: 'code',
  properties: {
    code: 'string',
    name: 'string?',
    price: 'float',
    stock: {type: 'int', default: 0},
    typeProduct: models.typeProduct,
  },
};
