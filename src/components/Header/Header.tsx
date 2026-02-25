import logoNotes from '/logoNotes.svg';
import logoReg from '/reg3.svg';
import logoAccount from '/account.svg';
import logoMenu from '/menu.svg'
import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <header className='header'>
            <h1 className='header__h1'>Notes</h1>
            <img className='header__image' src={logoNotes} alt="логотип заметок" />

            <Link to='/account' className={ document.cookie ? 'header__button-account' : 'display-none' }>
                <p className='header__paragraph-account'>Личный кабинет</p>
                <img className='header__image-account' src={logoAccount} alt="логотип личного кабинета" />
            </Link>
            <Link to='/reg' className='header__button-reg'>
                <img className='header__image-reg' src={logoReg} alt="логотип регестрации" />
            </Link>

            <button className='header__button-menu' onClick={() => setMenuOpen(prev => !prev)}>
                <img className='header__image-menu' src={logoMenu} alt="логотип меню" />
            </button>
            <ul className={menuOpen ? 'header__list' : 'display-none'}>
                <li className='header__item-list'>
                    <Link to='/account' className={ document.cookie ? 'header__button-list' : 'display-none'} onClick={() => setMenuOpen(prev => !prev)} >Личный кабинет</Link>   
                </li>
                <li className='header__item-list'>
                    <Link to='/reg' className='header__button-list' onClick={() => setMenuOpen(prev => !prev)} >Зарегистрироваться</Link>
                </li>
            </ul>
        </header>
    );
}