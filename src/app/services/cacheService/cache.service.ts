import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private storage: any;
  private session: any;
  constructor() {
    this.storage = localStorage;
    this.session = sessionStorage;
  }


  /**
   *
   */
  getSession(key: string) {
    return JSON.parse(this.session.getItem(key));
  }

  /**
   * Set item in session
   */
  setSession(key: string, value: any) {
  this.session.setItem(key, JSON.stringify(value));
  }

  /**
   * Clear All session items
   */
  clearSession() {
  this.session.clear();
  }

  /**
   * Delete key item from session
   */
  deleteSession(key: string) {
  this.session.removeItem(key);
  }

  /**
   * Get item from storage
   */
  getStorage(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

  /**
   * set items on storage
   */
  setStorage(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * clear all items in storage
   */
  clearStorage() {
    this.storage.clear();
  }

  deleteStorage(key: string) {
    this.storage.removeItem(key);
  }
}
