import React from 'react';
import './App.css';
import state from './store';
import UsersApi from './Api/Users';
import { IUser } from './Api/Users';
import { observer } from 'mobx-react-lite';

import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const App = observer(() => {
  const [autocomplete, setAutocomplete] = React.useState('');
  const handleBlur = () => setTimeout(() => state.setUsers([]), 200);
  const handleFocus = () => {
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
  };
  const handleCLick = (userName: string) => () => setAutocomplete(userName);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setAutocomplete(e.target.value);
  return (
    <Box sx={{ position: 'absolute', top: '20%', left: 'calc(50% - 171px)' }}>
      <TextField
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={autocomplete}
        onChange={handleChange}
        placeholder="Search"
        sx={{ width: '343px' }}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {state.isLoading && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '343px',
            height: '222px',
            bgcolor: 'background.paper',
            position: 'relative',
          }}
        >
          <CircularProgress
            sx={{
              position: 'absolute',
              top: 'calc(50% - 36px)',
              left: 'calc(50% - 36px)',
            }}
            size="72px"
          />
        </Box>
      )}
      {state.users && (
        <List dense sx={{ width: '100%', maxWidth: '343px', bgcolor: 'background.paper' }}>
          {state.users
            .filter((user: IUser) => user.name.includes(autocomplete) && user.name !== autocomplete)
            .map((user: IUser) => {
              return (
                <ListItem key={user.id} disablePadding>
                  <ListItemButton onClick={handleCLick(user.name)}>
                    <ListItemAvatar>
                      <Avatar alt={`${user.id}`} src={state.photos[user.id]} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      )}
    </Box>
  );
});

export default App;
