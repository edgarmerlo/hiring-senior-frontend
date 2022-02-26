import * as lockr from 'lockr';
import { uuid } from 'uuidv4';

export class databaseService {
  static saveInvoice(data) {
    lockr.setPrefix('invoice_');
    const id = uuid();
    lockr.set(id, data);

    return true;
  }

  static getInvoice(uuid: string) {
    return lockr.get(uuid);
  }

  static getAll() {
    return lockr.getAll(true);
  }
}