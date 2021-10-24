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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const options: Array<IUsersWithPhoto> = state.users.map((user) => ({ ...user, photoUrl: state.photos[user.id] }));
  const getUsers = () => {
    setIsLoading(true);
    UsersApi.getUsers()
      .then((usersResponse) => {
        const { data: usersData } = usersResponse;
        state.setUsers(usersData);
        UsersApi.getPhotos(usersData)
          .then((responsePhotos) => {
            const photos: IPhotos = responsePhotos.reduce(
              (total, response) => ({ ...total, [response.data.id]: response.data.url }),
              {}
            );
            state.addPhotos(photos);
          })
          .catch((e) => state.setError(e))
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => state.setError(e));
  };
  const handleChange = () => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      getUsers();
    }, SEND_REQUEST_DELAY);
  };
  return (
    <>
      <Autocomplete onChange={handleChange} value={''} options={options} isLoading={isLoading} />
    </>
  );
});

export default App;
