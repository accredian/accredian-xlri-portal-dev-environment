import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CursorIcon from '@mui/icons-material/ArrowRightAlt';

const BlinkingTextField = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500); // Blink interval in milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TextField
      label="Blinking TextField"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {showCursor && <CursorIcon />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default BlinkingTextField;
