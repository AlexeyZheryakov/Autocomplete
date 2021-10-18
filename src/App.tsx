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
  const [currentUser, setCurrentUser] = React.useState('');
  const options: Array<IUsersWithPhoto> = state.users.map((user) => {
    return { ...user, photoUrl: state.photos[user.id] };
  });
  const getUsers = () => {
    if (!state.users.length) {
      state.setIsLoading(true);
      setTimeout(
        () =>
          UsersApi.getUsers().then((usersResponse) => {
            const { data: usersData } = usersResponse;
            state.setIsLoading(false);
            state.setUsers(usersData);
            for (const user of usersData) {
              UsersApi.getPhoto(user.id).then((photoResponse) => state.addPhotos(photoResponse.data));
            }
          }),
        1500
      );
    }
  };
  const handleChange = (value: string) => {
    setCurrentUser(value);
    getUsers();
  };
  return (
    <>
      <Autocomplete onChange={handleChange} value={currentUser} options={options} isLoading={state.isLoading} />
    </>
  );
});

export default App;
