import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PaletteMode } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Header = (props: { themeMode: PaletteMode, setThemeMode: (themeMode: PaletteMode) => void }) => {
	const { themeMode, setThemeMode } = props;
  
    return <AppBar position="static">
    <Toolbar variant="dense">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
        SimpleWeather
      </Typography>
      <FormGroup>
      	<FormControlLabel control={<Switch defaultChecked onChange={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')} />} label={themeMode} />
    	</FormGroup>
    </Toolbar>
  </AppBar>
}

export default Header;