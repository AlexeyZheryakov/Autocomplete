import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
}

export interface IPhoto {
  id: number;
  url: string;
}

const UsersApi = {
  getUsers: () => axios.get<Array<IUser>>('https://jsonplaceholder.typicode.com/users'),
  getPhoto: (id: number) => axios.get<IPhoto>(`https://jsonplaceholder.typicode.com/photos/${id}`),
};

export default UsersApi;
