import React from "react";
import ScrollTop from "./components/ScrollTop";
import Routes from "./routes";

// vendor styles
import "react-datetime/css/react-datetime.css";

const App = () => (
  <body className="bg-soft">
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </body>
);

export default App;
