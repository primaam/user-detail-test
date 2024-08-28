import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { theme } from "./style/theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
