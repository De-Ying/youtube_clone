import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/contextApi";
import { Header, Feed, SearchResult, VideoDetails, ChannelSwitch, PlaylistDetails } from './components';

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
                        <Route path="/video/:id?/:playlistId?/:index?" element={<VideoDetails />} />
                        <Route path="/channel/:id?/:page?/:searchChannelQuery?" element={<ChannelSwitch />} />
                        <Route path="/playlist/:id" element={<PlaylistDetails />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AppProvider>
    );
};

export default App;
