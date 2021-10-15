import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';

function App() {
  return (
    <div className="App">
      <TextField sx={{ width: '343px' }} label="Search" variant="filled" />
    </div>
  );
}

export default App;
