import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider } from "./context/contextApi";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import ChannelSwitch from "./components/Channels/ChannelSwitch";

const App = () => {

    return (
        <AppProvider>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Feed />} />
                        <Route
                            path="/searchResult/:searchQuery"
                            element={<SearchResult />}
                        />
                        <Route path="/video/:id" element={<VideoDetails />} />
                        <Route path="/channel/:id?/:page?" element={<ChannelSwitch />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppProvider>
    );
};

export default App;
