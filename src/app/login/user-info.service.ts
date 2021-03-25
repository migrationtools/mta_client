import {Injectable} from '@angular/core';
export interface UserInStorage {
  userId: string;
  email: string;
  displayName: string;
  token: string;
  firstTime: boolean;
  role: string;
}
export interface StoreInfoStorage {
  name: string;
  id: string;
}
export interface ClientInfoStorage {
  name: string;
  id: string;
}
export interface LoginInfoInStorage {
  success: boolean;
  message: string;
  landingPage: string;
  user?: UserInStorage;
}
@Injectable()
export class UserInfoService {
  public currentUserKey = 'user';
  public storage: Storage = sessionStorage;
  constructor() {}
  storeUserInfo(userInfoString: string) {
    this.storage.setItem(this.currentUserKey, userInfoString);
  }
  removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
  }
  storeStoreInfo(storeInfoString: string) {
    this.storage.setItem(this.currentUserKey + '_STORE', storeInfoString);
  }
  removeStoreInfo() {
    this.storage.removeItem(this.currentUserKey + '_STORE');
  }
  storeClientInfo(clientInfoString: string) {
    this.storage.setItem(this.currentUserKey + '_CLIENT', clientInfoString);
  }
  removeClientInfo() {
    this.storage.removeItem(this.currentUserKey + '_CLIENT');
  }
  clearAllFromStorage() {
    const me = this;
    me.removeUserInfo();
    me.removeStoreInfo();
    me.removeClientInfo();
    me.clearDataInStorage('selectedStore');
  }
  getUserInfo(): UserInStorage | null {
    try {
      const userInfoString: string = this.storage.getItem(this.currentUserKey);
      if (userInfoString) {
        const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
        return userObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  getUserRole(): string | null {
    try {
      const userInfoString: string = this.storage.getItem(this.currentUserKey);
      if (userInfoString) {
        const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
        return userObj.role;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  setDataInStorage(key: string, val: string) {
    this.storage.setItem(key, val);
  }
  getDataInStorage(key: string) {
    return this.storage.getItem(key);
  }
  clearDataInStorage(key: string) {
    this.storage.removeItem(key);
  }
  getStoreInfo(): StoreInfoStorage | null {
    try {
      const storeInfoString: string = this.storage.getItem(this.currentUserKey + '_STORE');
      if (storeInfoString) {
        const storeObj: StoreInfoStorage = JSON.parse(this.storage.getItem(this.currentUserKey + '_STORE'));
        return storeObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  getClientInfo(): ClientInfoStorage | null {
    try {
      const clientInfoString: string = this.storage.getItem(this.currentUserKey + '_CLIENT');
      if (clientInfoString) {
        const clientObj: ClientInfoStorage = JSON.parse(this.storage.getItem(this.currentUserKey + '_CLIENT'));
        return clientObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  isLoggedIn(): boolean {
    return this.storage.getItem(this.currentUserKey) ? true : false;
  }
  getUserName(): string {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.displayName;
    }
    return 'not an user';
  }
  getStoredToken(): string | null {
    const userObj: UserInStorage = this.getUserInfo();
    console.log('userObj' + userObj);
    if (userObj !== null) {
      return userObj.token;
    }
    return null;
  }
}
