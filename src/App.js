import './App.css';
import routes from '../src/routes/routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Fragment>
                {route.layout ? (
                  <route.layout>
                    <route.component />
                  </route.layout>
                ) : (
                  <route.component />
                )}
              </Fragment>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;