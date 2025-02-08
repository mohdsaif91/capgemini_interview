import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "./util/loading";
import NavBar from "./components/nav_bar";

const Home = React.lazy(() => import("./pages/home"));
const Account = React.lazy(() => import("./pages/account"));

function App() {
  return (
    <div className="p-4">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
