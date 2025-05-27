import { Button } from '@chakra-ui/react';
import * as React from 'react';


export default function Header() {

  return (
    <header className="cv-header">
      <span className='myName'> Fidele Loffou </span>
      <nav className="cv-navbar">
        <ul className="cv-navbar__list">
          <li className="cv-navbar__item"><a href="#about">À propos</a></li>
          <li className="cv-navbar__item"><a href="#skills">Compétences</a></li>
          <li className="cv-navbar__item"><a href="#experience">Expérience</a></li>
          <li className="cv-navbar__item"><a href="#projects">Projets</a></li>
          <li className="cv-navbar__item"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="translate">
        <Button> Francais </Button>
      </div>
    </header>
  );
}
