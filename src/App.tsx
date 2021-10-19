import React from 'react';
import './App.css';
import state from './store';
import Autocomplete from './Components/Autocomplete';
import UsersApi, { IUser } from './Api/Users';
import { observer } from 'mobx-react-lite';

interface IUsersWithPhoto extends IUser {
  photoUrl: string;
}

const App = observer(() => {
  const timeOut = React.useRef<ReturnType<typeof setTimeout> | undefined>();
  const options: Array<IUsersWithPhoto> = state.users.map((user) => ({ ...user, photoUrl: state.photos[user.id] }));
  const getUsers = () => {
    state.setIsLoading(true);
    UsersApi.getUsers().then((usersResponse) => {
      const { data: usersData } = usersResponse;
      state.setIsLoading(false);
      state.setUsers(usersData);
      for (const user of usersData) {
        UsersApi.getPhoto(user.id).then((photoResponse) => state.addPhotos(photoResponse.data));
      }
    });
  };
  const handleChange = (value: string) => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    state.setCurrentUser(value);
    timeOut.current = setTimeout(() => {
      getUsers();
    }, 500);
  };
  return (
    <>
      <Autocomplete onChange={handleChange} value={state.currentUser} options={options} isLoading={state.isLoading} />
    </>
  );
});

export default App;
