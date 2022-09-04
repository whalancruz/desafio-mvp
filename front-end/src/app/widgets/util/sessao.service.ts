import { Injectable } from '@angular/core';
import { StorageHandler } from 'src/app/classes/storage-handler.classes';

@Injectable({
  providedIn: 'root',
})
export class HairSalonTokenService {

  constructor(
    public storageHandler: StorageHandler
  ) { }

  setKey(key: string, value: string) {
    sessionStorage.setItem(key, value);
  };

  getKey(key: string) {
    let value: string = null;

    value = sessionStorage.getItem(key) || null;

    return value;
  };

  removeKey(key: string) {
    sessionStorage.removeItem(key);
  };

}
