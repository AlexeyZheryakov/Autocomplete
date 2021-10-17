import { makeAutoObservable } from 'mobx';
import { IUser } from '../Api/Users';

class State {
  users: Array<IUser> = [];

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
}

export default new State();
