import React from 'react';
import './App.css';
import state, { IPhotos } from './store';
import Autocomplete from './Components/Autocomplete';
import UsersApi, { IUser } from './Api/Users';
import { observer } from 'mobx-react-lite';

interface IUsersWithPhoto extends IUser {
  photoUrl: string;
}

const App = observer(() => {
  const SEND_REQUEST_DELAY = 500;
  const timeOut = React.useRef<ReturnType<typeof setTimeout> | undefined>();
  const options: Array<IUsersWithPhoto> = state.users.map((user) => ({ ...user, photoUrl: state.photos[user.id] }));
  const getUsers = () => {
    state.setIsLoading(true);
    UsersApi.getUsers().then((usersResponse) => {
      const { data: usersData } = usersResponse;
      state.setIsLoading(false);
      state.setUsers(usersData);
      UsersApi.getPhotos(usersData).then((responsePhotos) => {
        const photos: IPhotos = responsePhotos.reduce(
          (total, response) => ({ ...total, [response.data.id]: response.data.url }),
          {}
        );
        state.addPhotos(photos);
      });
    });
  };
  const handleChange = (value: string) => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    state.setCurrentUser(value);
    timeOut.current = setTimeout(() => {
      getUsers();
    }, SEND_REQUEST_DELAY);
  };
  const handleSelect = (value: string) => {
    state.setCurrentUser(value);
  };
  return (
    <>
      <Autocomplete
        onChange={handleChange}
        value={state.currentUser}
        options={options}
        isLoading={state.isLoading}
        onSelect={handleSelect}
      />
    </>
  );
});

export default App;
