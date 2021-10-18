import React from 'react';
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

interface IOption {
  id: number;
  name: string;
  photoUrl: string;
}

interface IAutocomplete {
  onChange: (value: string) => void;
  value: string;
  options: Array<IOption>;
  isLoading: boolean;
}

const Autocomplete: React.FC<IAutocomplete> = ({ onChange: handleChange, value, options, isLoading }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };
  const handleBlur = () => setIsOpen(!isOpen);
  const handleCLick = (userName: string) => () => handleChange(userName);

  return (
    <>
      <TextField
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
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
      {isLoading && (
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
      <List dense sx={{ width: '100%', maxWidth: '343px', bgcolor: 'background.paper' }}>
        {options
          .filter(
            (option: IOption) => option.name.toLowerCase().includes(value.toLocaleLowerCase()) && option.name !== value
          )
          .map((option: IOption) => {
            return (
              <ListItem key={option.id} disablePadding>
                <ListItemButton onClick={handleCLick(option.name)}>
                  <ListItemAvatar>
                    <Avatar alt={`${option.id}`} src={option.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={option.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default Autocomplete;
