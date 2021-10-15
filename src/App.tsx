import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

function App() {
  return (
    <div className="App">
      <TextField
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
    </div>
  );
}

export default App;
