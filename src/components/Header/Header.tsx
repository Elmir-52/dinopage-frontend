import logoApp from '/logo-app.png';
import logoMenu from '/menu.svg'
import './_Header.scss';
import { useAppDispatch } from '../../hook';
import { setMenuVisibility } from '../../store/menuVisibilitySlice';

export default function Header() {
    const dispatch = useAppDispatch();

    return (
        <header className='header'>
            <h1 className='header__h1'>Enote</h1>
            <img className='header__logo' src={logoApp} alt="логотип заметок" />

            <button className='header__button-menu' onClick={() => dispatch(setMenuVisibility())}>
                <img className='header__image-menu' src={logoMenu} alt="логотип меню" />
            </button>
        </header>
    );
}