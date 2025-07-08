import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Reservations', path: '/booking' },
  { name: 'Order Online', path: '/order' },
  { name: 'Login', path: '/login' },
];

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo-link">
          <img src="/images/logo.png" alt="Little Lemon homepage" height="50" />
        </Link>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;