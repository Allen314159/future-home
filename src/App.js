import './App.css';
import routes from '../src/routes/routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Home from './pages/Home/home';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Fragment>
                <route.layout>
                  <route.component />
                </route.layout>
              </Fragment>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
