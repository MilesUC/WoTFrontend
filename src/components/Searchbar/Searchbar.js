import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search'; // Import a different icon


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      // You can perform your search logic here, e.g., filter a list of items based on the search term.
    };
  
    return (
      <div>
        <TextField
          variant="outlined"
          size="small"
          onChange={handleSearch}
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <SearchIcon color="disabled" />
            ),
          }}
        />
      </div>
    );
  }

export default SearchBar;
