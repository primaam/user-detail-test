import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary: {
            main: "#7E7E81",
            light: "#9A9E9C",
            dark: "#788B98",
        },
        secondary:{
            main: "#F4F5F4",
            dark: "#444447"
        },
        success:{
            main: "#5ba05f"
        },
        warning: {
            main: "#d89027"
        },
        error:{
            main: "#f44336"
        }
    },
    breakpoints:{
        values:{
            xs: 360,
            sm: 720,
            md: 900,
            lg: 1200,
            xl: 1440,
        }
    }
})

export {theme}