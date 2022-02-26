import * as lockr from 'lockr';
import { uuid } from 'uuidv4';

export class databaseService {
  static saveInvoice(data) {
    lockr.setPrefix('invoice_');
    const id = uuid();
    lockr.set(id, { ...data , id });

    return id;
  }

  static getInvoice(uuid: string) {
    lockr.setPrefix('invoice_');
    const record = lockr.get(uuid);
    return record;
  }

  static getAll(useId = false) {
    lockr.setPrefix('invoice_');
    return lockr.getAll(useId);
  }
}