import { HEADER_NAV_LINKS } from '../../shared/data/headerNavLinks';
import './Header.scss';
import { Link, useLocation } from 'react-router';

export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className='header'>
            <nav className="header__navigation">
                {
                    HEADER_NAV_LINKS.map(link => {
                        return <Link 
                            key={link.path} 
                            to={link.path} 
                            className={currentPath === link.path ? 'header__nav-link header__nav-link_active' : 'header__nav-link'}
                        >{link.name}</Link>
                    })
                }
            </nav>
        </header>
    );
}