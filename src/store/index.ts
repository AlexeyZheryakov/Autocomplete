import { makeAutoObservable } from 'mobx';
import { IUser, IPhoto } from '../Api/Users';

interface IPhotos {
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

  addPhotos(photo: IPhoto) {
    this.photos = { ...this.photos, [photo.id]: photo.url };
  }

  setCurrentUser(currentUser: string) {
    this.currentUser = currentUser;
  }
}

export default new State();
