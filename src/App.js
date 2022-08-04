import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// import UI library styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

// set store
const store = configureStore();
const envName = process.env.NODE_ENV;
if (envName === "development" || envName === "staging") {
  store.subscribe(() => console.log("storeLog: ", store.getState()));
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
