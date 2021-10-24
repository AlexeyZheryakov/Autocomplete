import axios from 'axios';

export interface IUser {
  id: number;
  name: string;
  username: string;
}

export interface IPhoto {
  id: number;
  url: string;
}

const getPhoto = (id: number) => axios.get<IPhoto>(`${process.env.REACT_APP_API_URL}/photos/${id}`);

const UsersApi = {
  getUsers: () => axios.get<Array<IUser>>(`${process.env.REACT_APP_API_URL}/users`),
  getPhotos: (users: Array<IUser>) => {
    const requests = users.map((user) => getPhoto(user.id));
    return Promise.all(requests);
  },
};

export default UsersApi;
