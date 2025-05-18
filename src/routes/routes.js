import Home from '../pages/Home/home';
import Report from '../pages/Report/report';

const routes = [
    {
        path: '/',
        component: Home,
        protected: false
    },
    {
        path: '/report',          
        component: Report,
        protected: false
    }
]

export default routes;