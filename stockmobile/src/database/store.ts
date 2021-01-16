import Datastore from "nedb-promises";
import { Model } from "../types";

class Store<T extends Model> {
  private db: Datastore;

  constructor(source: string) {
    this.db = new Datastore({
      filename: `./${source}.db`,
      autoload: true,
    });
  }

  public getDB() {
    return this.db;
  }

  /**
   *
   * @param options
   */
  public findAll(options: Object = {}): Promise<Array<T>> {
    return this.db.find(options);
  }

  /**
   *
   * @param id
   */
  findOne(id: string): Promise<T> {
    return this.db.findOne({ _id: id });
  }

  /**
   *
   * @param _id
   * @param element
   */
  async update(_id: string, element: Object): Promise<number> {
    const query = { _id };
    const updateQuery = { $set: element };
    const options = { upsert: false };

    return this.db.update(query, updateQuery, options);
  }

  /**
   *
   * @param data
   */
  create(data: T): Promise<T> {
    return this.db.insert(data);
  }

  /**
   *
   * @param element
   */
  async save(element: T): Promise<T> {
    const { _id, ...rest } = element;
    let saved = _id ? await this.findOne(_id) : null;
    if (!saved) {
      return this.create(element);
    }

    return new Promise(async (resolve, reject) => {
      try {
        await this.db.update({ _id: saved?._id }, rest);
        resolve(element);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *
   * @param data
   */
  async saveAll(data: Array<T>) {
    return await Promise.all(data.map((element) => this.save(element)));
  }

  /**
   *
   * @param data
   */
  delete(_id: string): Promise<any> {
    return this.db.remove({ _id }, { multi: false });
  }

  /**
   *
   * @param options
   */
  deleteAll(options: Object = {}): Promise<number> {
    return this.db.remove(options, { multi: true });
  }
}

export default Store;
