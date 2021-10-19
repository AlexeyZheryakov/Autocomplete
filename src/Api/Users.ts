import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IPhoto {
  id: number;
  url: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); //таймаут для того что бы увидеть прелоадер

const UsersApi = {
  getUsers: async () => {
    await delay(1500);
    const response = await axios.get<Array<IUser>>(`${process.env.REACT_APP_API_URL}/users`);
    return response;
  },
  getPhoto: (id: number) => axios.get<IPhoto>(`${process.env.REACT_APP_API_URL}/photos/${id}`),
};

export default UsersApi;
