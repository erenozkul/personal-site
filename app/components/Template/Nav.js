import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import data from '../../data/contact';

const Nav = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${BASE_PATH}/images/logo.png`} alt="" />
      </Link>
      <header>
        <h2>Eren Özkul</h2>
        <p><a style={{ textTransform: 'none' }} href="mailto:info@erenozkul.net">info@erenozkul.net</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Eren. I like building things.
        I am a <a rel="nofollow" href="https://www.anadolu.edu.tr/">Anadolu University</a> graduate.
        The software manager of <a rel="nofollow" href="https://brand-wallet.com">BrandWallet</a> and <a rel="nofollow" href="https://dnatech.io/">DNA</a>. Before BrandWallet I was
        at <a rel="nofollow" href="http://www.pennabilisim.com/">Penna</a> and <a rel="nofollow" href="http://mobilizzy.com/">Mobilizzy</a>.
      </p>
      <ul className="actions">
        <li>
          {/*window.location.pathname !== `${BASE_PATH}/resume` ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>*/}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ul className="icons">
        {data.map((s) => (
          <li key={s.label}>
            <a href={s.link}>
              <FontAwesomeIcon icon={s.icon} />
            </a>
          </li>
        ))}
      </ul>
      <p className="copyright">&copy; Eren Özkul <Link to="/">erenozkul.com</Link>.</p>
    </section>
  </section>
);

export default Nav;
