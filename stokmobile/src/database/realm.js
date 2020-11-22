import * as schemas from './schemas';

const Realm = require('realm');

let realm = new Realm({
  path: 'stock.realm',
  schema: Object.values(schemas),
  schemaVersion: 1,
});
//console.log(realm.path);
realm.write(() => {
  //realm.deleteAll();
});
export default realm;
