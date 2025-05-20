import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import Report from '../pages/Report/report';

const routes = [
    { path: "/", component: Login },
    { path: "/home", component: Home },
    { path: "/report", component: Report }
];

export default routes;

