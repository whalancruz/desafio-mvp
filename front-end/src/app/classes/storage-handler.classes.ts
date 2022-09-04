import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageHandler {

  setKey(storage_key: string, key_value: string): void {
    if (localStorage.getItem(storage_key) && localStorage.getItem(storage_key) !== null && localStorage.getItem(storage_key) !== '') {
      localStorage.removeItem(storage_key);
    }
    localStorage.setItem(storage_key, key_value);
  }

  getKey(storage_key): string {
    return localStorage.getItem(storage_key);
  }

  getAllKeys(): Storage {
    return localStorage;
  }

  removeKey(storage_key: string): void {
    localStorage.removeItem(storage_key);
  }

  clearAllKeys(): void {
    localStorage.clear();
  }
}
