
import '../styles/globals.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../component/Navigation';


const darkTheme = createTheme({
	typography: {
	  fontFamily: 'monospace'
	},
	palette: {
	  mode: 'dark',
	},
  });
  


function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<Component {...pageProps} />
			<Navigation />
		</ThemeProvider>
	);
}

export default MyApp;
