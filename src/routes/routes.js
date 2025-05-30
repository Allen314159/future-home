
import Home from '../pages/Home/home';
import Login from '../pages/Login/login';
import Report from '../pages/Report/report';
import Scenario from '../pages/Scenario/scenario';
import History from '../pages/History/history';

const routes = [
    { path: "/", component: Login },
    { path: "/home", component: Home },
    { path: "/report", component: Report },
    { path: "/scenario", component: Scenario },
    { path: "/history", component: History }
];

export default routes;

