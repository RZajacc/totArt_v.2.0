import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

type Props = {};

function Footer({}: Props) {
  return (
    <div
      id="footer"
      className="flex items-center justify-center space-x-8 bg-gradient-to-b from-amber-200 to-slate-400"
    >
      <a
        href="https://github.com/RZajacc"
        target="_blank"
        className="hover:animate-pulse"
      >
        <FontAwesomeIcon icon={faGithub} size="2xl" />
      </a>
      <a
        href="https://www.linkedin.com/in/rafalzajac88/"
        target="_blank"
        className="hover:animate-pulse"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
      </a>
      <a href="mailto:rf.zajac@tutamail.com" className="hover:animate-pulse">
        <FontAwesomeIcon icon={faEnvelopeOpen} size="2xl" />
      </a>
    </div>
  );
}

export default Footer;
