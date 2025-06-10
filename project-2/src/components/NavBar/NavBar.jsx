import { Link } from 'react-router-dom';
import './NavBar.css'


const NavBar = () => {
    return (
        <nav className = "navbar">
            <ul>

                <li><Link to="/">Home</Link></li>
                <li><Link to="/word-bank">Word Bank</Link></li>


            </ul>
            </nav>

    );

};

export default NavBar;
