import { makeAutoObservable } from 'mobx';
import { IUser } from '../Api/Users';

export interface IPhotos {
  [key: string]: string;
}

class State {
  users: Array<IUser> = [];

  photos: IPhotos = {};

  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: Array<IUser>) {
    this.users = users;
  }

  setError(error: string) {
    this.error = error;
  }

  addPhotos(photos: IPhotos) {
    this.photos = photos;
  }
}

export default new State();
