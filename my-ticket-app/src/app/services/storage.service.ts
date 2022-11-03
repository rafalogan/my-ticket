import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setStorage(key: string, value: any) {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }

    return false;
  }

  getStorage(key: string) {
    return this.storage && this.storage.getItem(key) && this.storage.getItem(key) !== 'undefined'
      ? JSON.parse(this.storage.getItem(key) as string)
      : null;
  }

  celarStorages() {
    if (this.storage) {
      this.storage.clear();
      return true;
    }

    return false;
  }

  deleteStorage(key: string) {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }

    return false;
  }
}
