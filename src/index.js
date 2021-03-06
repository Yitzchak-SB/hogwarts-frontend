import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/MagicSchoolOne.ttf";
import * as serviceWorker from "./serviceWorker";
import Spinner from "./components/util/Spinner";
const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
