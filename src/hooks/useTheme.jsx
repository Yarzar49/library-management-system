import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
    let context = useContext(ThemeContext)
    if(context == undefined) { //if use outside of ThemeCOntextProvider, it is undefined
        new Error('theme context should be only used in ThemeContextProvider')
    }
    return useContext(ThemeContext) // { theme : 'dark' }
}