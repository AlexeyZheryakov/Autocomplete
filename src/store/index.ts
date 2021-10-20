import { makeAutoObservable } from 'mobx';
import { IUser } from '../Api/Users';

export interface IPhotos {
  [key: string]: string;
}

class State {
  users: Array<IUser> = [];

  photos: IPhotos = {};

  currentUser: string = '';

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: Array<IUser>) {
    this.users = users;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  addPhotos(photos: IPhotos) {
    this.photos = photos;
  }

  setCurrentUser(currentUser: string) {
    this.currentUser = currentUser;
  }
}

export default new State();
