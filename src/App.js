import React from "react";

import { AppProvider } from "./context/contextApi";

const App = () => {
  return (
    <AppProvider>
        <div className="text-3l">App</div>
    </AppProvider>
  );
};

export default App;