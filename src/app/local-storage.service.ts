import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = this.storage.getItem(key);
    return value? JSON.parse(value):null;
  }

  getAll(key:string): any[]{
    const values = this.storage.getItem(key);
    return values? JSON.parse(values) : [];
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
