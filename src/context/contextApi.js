import React, { createContext, useState, useEffect, useCallback } from "react";

import { fetchDataFromApi } from "../utils/api";
export const AppContext = createContext();

export const AppProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    const fetchSelectedCategoryData = useCallback(() => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${selectedCategory}`).then(({ contents }) => {
            setSearchResults(contents);
            setLoading(false);
        });
    }, [selectedCategory]);

    useEffect(() => {
        fetchSelectedCategoryData();
    }, [selectedCategory, fetchSelectedCategoryData]);

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
