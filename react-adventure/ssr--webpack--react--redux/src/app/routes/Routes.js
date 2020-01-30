import Home from 'components/Pages/Home/Home';
import About from 'components/Pages/About/About';
import Board from 'components/Pages/Board/Board';
import Statistic from 'components/Pages/Stats/Stats';
import AddNewItem from 'components/Pages/AddNewItem/AddNewItem';


const routes = [
    {
        text: 'HOME',
        path: '/',
        exact: true,
        component: Home
    },
    {
        text: 'ADD ITEM',
        path: '/newitem',
        component: AddNewItem
    },
    {
        text: 'STATS',
        path: '/stats',
        component: Statistic
    },
    {
        text: 'ABOUT',
        path: '/about',
        component: About
    },
    {
        text: 'BOARD',
        path: '/board',
        component: Board
    }
]


export default routes