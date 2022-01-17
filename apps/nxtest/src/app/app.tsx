import { useEffect, useState } from 'react';
import Main from './views/Main';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

function App() {
  const [themeMode, setThemeMode] = useState<PaletteMode>('dark');

  const theme = createTheme({
    palette: {
      mode: themeMode,
    }
  });

  return <ThemeProvider theme={theme}>
    <Main themeMode={themeMode} setThemeMode={setThemeMode} />
  </ThemeProvider>;
}

export default App;