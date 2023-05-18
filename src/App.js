import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/contextApi";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";

const App = () => {
  return (
    <AppProvider>
        <BrowserRouter>
            <div className="flex flex-col h-full">
                <Header />
                <Routes>
                    <Route exact path="/" element={<Feed />}></Route>
                    <Route path="/searchResult/:searchQuery" element={<SearchResult />}></Route>
                    <Route path="/video/:id" element={<VideoDetails />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </AppProvider>
  );
};

export default App;