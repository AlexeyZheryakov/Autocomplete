import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
}

const UsersApi = {
  getUsers: () => axios.get<Array<IUser>>('https://jsonplaceholder.typicode.com/users'),
};

export default UsersApi;
