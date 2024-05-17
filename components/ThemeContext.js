import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const lightTheme = {
        dark: false,
        colors: {
            background: "#f2f2fd",
            inactive: "#88878b",
            inactiveLighter: "#d5cece",
            accent: "#05d2d6",
            money: "#0dd217",
            text: "#090a0a",
            light: "#403b3b",
            red: "#e34747",
        }
    }

    const darkTheme = {
        dark: true,
        colors: {
            background: "#090a1f",
            inactive: "#082f49",
            accent: "#4aade6",
            money: "#a8f7ac",
            text: "#EBEDF0",
            light: "#A8A8A8",
            red: "#f36d6d",
            delete: "#880505",
        }
    }

    const colorScheme = useColorScheme();
    const [themePreference, setThemePreference] = useState("automatic");
    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    const determineTheme = (preference) => {
        if (preference === "automatic") {
            return colorScheme === "light" ? lightTheme : darkTheme;
        } else {
            return preference === "light" ? lightTheme : darkTheme;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("theme");
                if (value !== null) {
                    const parsedValue = JSON.parse(value);
                    setThemePreference(parsedValue);
                }
            } catch (e) {
                console.log("Error getting theme:", e);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        setCurrentTheme(determineTheme(themePreference));
    }, [themePreference, colorScheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setThemePreference }}>
            {children}
        </ThemeContext.Provider>
    );
};
