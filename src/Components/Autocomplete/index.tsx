import React from 'react';
import { observer } from 'mobx-react-lite';
import './style.css';
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

interface IOption {
  id: number;
  name: string;
  photoUrl: string;
  email: string;
}

interface IAutocomplete {
  onChange: () => void;
  value: string;
  options: Array<IOption>;
  isLoading: boolean;
}

const Autocomplete: React.FC<IAutocomplete> = observer(({ onChange: handleChange, value, options, isLoading }) => {
  const [currentValue, setCurrentValue] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange();
    setCurrentValue(e.target.value);
  };
  const handleBlur = () => setTimeout(() => setIsOpen(false), 200);
  const handleCLick = (val: string) => () => setCurrentValue(val);
  const handleFocus = () => setIsOpen(true);
  return (
    <Box
      sx={{
        width: '343px',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <TextField
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={currentValue}
        onChange={onChange}
        placeholder="Search"
        sx={{ paddingTop: '40px', width: '100%' }}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          left: '0',
          top: '96px',
        }}
      >
        {isLoading && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '343px',
              height: '222px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div role="progressbar" className="loader"></div>
          </Box>
        )}
        {isOpen && !isLoading && (
          <List dense sx={{ width: '100%' }}>
            {options
              .filter(
                (option: IOption) =>
                  option.name.toLowerCase().includes(currentValue.toLocaleLowerCase()) && option.name !== value
              )
              .map((option: IOption) => {
                return (
                  <ListItem key={option.id} disablePadding>
                    <ListItemButton onClick={handleCLick(option.name)}>
                      <ListItemAvatar>
                        <Avatar alt={`${option.id}`} src={option.photoUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={option.name} secondary={option.email} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        )}
      </Box>
    </Box>
  );
});

export default Autocomplete;
