import { Link } from "react-router";
import './_NavigationBar.scss';
import logoReg from '/reg3.svg';
import noteImage from '/note-image.png';
import { useAppSelector } from "../../hook";
import accountImage from '/account-image.png';

export default function NavigationBar() {
    const menuVisibility = useAppSelector(state => state.menuVisibilityReducer.open);
    const cookie = document.cookie;

    if(!menuVisibility) {
        return;
    }
    
    return(
        <section className="navigation-bar">
            <Link title="заметки" className="navigation-bar__link" to='/' >
                <img className="navigation-bar__image" src={noteImage} />
            </Link>
            <Link title="авторизоваться" className="navigation-bar__link" to='/auth' >
                <img className="navigation-bar__image" src={logoReg} />
            </Link>
            {cookie ? 
                <Link title="личный кабинет" className="navigation-bar__link" to='/account' >
                    <img className="navigation-bar__image" src={accountImage} />
                </Link>
            : undefined}
        </section>
    )
}