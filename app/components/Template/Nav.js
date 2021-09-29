import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import data from '../../data/contact';

// Validates the first half of an email address.
const validateText = (text) => {
  // NOTE: Passes RFC 5322 but not tested on google's standard.
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))$/;
  return re.test(text) || text.length === 0;
};

const messages = [
  'hi',
  'hello',
  'hola',
  'you-can-email-me-at-literally-anything! Really',
  'well, not anything. But most things',
  'like-this',
  'or-this',
  'but not this :(  ',
  'you.can.also.email.me.with.specific.topics.like',
  'just-saying-hi',
  'please-work-for-us',
  'help',
  'admin',
  'info',
  'or-I-really-like-your-website',
  'I\'ll-stop-distracting-you-now',
  'thanks',
];

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
    return () => { }; // pass linter
  }, [delay]);
};

const Nav = () => {
  const hold = 50; // ticks to wait after message is complete before rendering next message
  const delay = 50; // tick length in mS

  const [idx, updateIter] = useState(0); // points to current message
  const [message, updateMessage] = useState(messages[idx]);
  const [char, updateChar] = useState(messages[idx].length); // points to current char
  const [isActive, setIsActive] = useState(true); // disable when all messages are printed

  useInterval(() => {
    let newIdx = idx;
    let newChar = char;
    if (char - hold >= messages[idx].length) {
      newIdx += 1;
      newChar = 0;
    }
    if (newIdx === messages.length) {
      setIsActive(false);
    } else {
      updateMessage(messages[newIdx].slice(0, newChar));
      updateIter(newIdx);
      updateChar(newChar + 1);
    }
  }, isActive ? delay : null);
  return (
    <section id="sidebar">
      <section id="intro">
        <Link to="/" className="logo">
          <img src={`${BASE_PATH}/images/logo.png`} alt="" />
        </Link>
        <header>
          <h2>Eren Özkul</h2>
          <div
            className="inline-container"
            style={validateText(message) ? {} : { color: 'red' }}
            onMouseEnter={() => setIsActive(false)}
            onMouseLeave={() => (idx < messages.length) && setIsActive(true)}
          >
            <a href={validateText(message) ? `mailto:${message}@erenozkul.com` : ''}>
              <span>{message}</span>
              <span>@erenozkul.com</span>
            </a>
          </div>
        </header>
      </section>

      <section className="blurb">
        <h2>About</h2>
        <p>
          Hi, I&apos;m Eren. I like building things.
          I am a <a rel="nofollow" href="https://www.anadolu.edu.tr/">Anadolu University</a> graduate.
          The software manager of <a rel="nofollow" href="https://brand-wallet.com">BrandWallet</a> and <a rel="nofollow" href="https://dnatech.io/">DNA</a>.
          Before BrandWallet I was at <a rel="nofollow" href="http://www.pennabilisim.com/">Penna</a> and <a rel="nofollow" href="http://mobilizzy.com/">Mobilizzy</a>.
        </p>
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
        <p className="copyright">&copy; Eren Özkul</p>
      </section>
    </section>
    )
};

export default Nav;
