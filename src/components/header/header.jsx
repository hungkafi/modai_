import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainComponent from '../main/main';
import NewsPage from '../news/news';
import TeamPage from '../team/team';
import LeaguesPage from '../leagues/leagues';


import i18n from '../../i18n';

const HeaderComponent = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const changeLanguage = (lng) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
      setLanguage(lng);
    } else {
      console.error('i18n is not initialized correctly or changeLanguage is not a function');
    }
  };
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('is_dark');
      document.body.classList.remove('is_light');
    } else {
      document.body.classList.add('is_light');
      document.body.classList.remove('is_dark');
    }
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseRef = useRef(null);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleClickOutside = (event) => {
    if (collapseRef.current && !collapseRef.current.contains(event.target)) {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Router>
      <header className="header">
        <div className='header-inner'>
          <div className='container flex items-center cursor-pointer'>
            <a href="/" aria-label="Link to Home" className="logo">
              <img src="/images/logo/logo.svg" alt='logo' />
            </a>
            <div className='header__search ml-16'>
              <form className="relative w-full">
                <div className="relative">
                  <button type="submit" className="form__prefix">
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="512"
                      height="512"
                      x="0"
                      y="0"
                      viewBox="0 0 56.966 56.966"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                          className=""
                        />
                      </g>
                    </svg>

                  </button>
                  <input type="text" name="search_key" id="search_key" className="form__input w-full" placeholder=" " required="" autoComplete="off" />

                  <label htmlFor="search_key" className="form__label">
                    {t('search')}

                  </label>
                </div>
              </form>
            </div>

            <div className='ml-16' id='main-nav'>
              <ul className='menu'>
                <li><Link className="effect" to="/">{t('home')}</Link></li>
                <li><Link className="effect" to="/new">{t('new')}</Link></li>
                <li><Link className="effect" to="/favorite">{t('team')}</Link></li>
              </ul>
            </div>

            <div className='header__right'>
              <div className='setting'>

                <div className="core_collapse core_collapse__fixed" ref={collapseRef}>
                  <div className="collapse__label justify-center" onClick={toggleCollapse}>
                    <img className='w-4 h-4' src="/icon/setting.svg" alt="images" />
                  </div>
                  <ul className={`collapse__content !top-11 shadow_primary flex-col p-4 min-w-[150px] bg-white rounded-lg ${isCollapsed ? 'collapsed' : 'hidden'}`}>
                    <li className='flex items-center'>
                      <p className='min-w-[80px]'>{t("theme")}</p>
                      <div className='mode'>
                        <svg
                          onClick={toggleMode}
                          className={mode === 'light' ? 'active' : ''}
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="512"
                          height="512"
                          x="0"
                          y="0"
                          viewBox="0 0 512 512"
                          style={{ enableBackground: "new 0 0 512 512" }}
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              d="M256 78.2c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v48.2c0 8.284 6.716 15 15 15zM109.065 130.278c5.858 5.858 15.355 5.858 21.213 0s5.858-15.355 0-21.213L96.196 74.982c-5.858-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l34.082 34.083zM109.059 381.728L74.977 415.81c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0l34.083-34.083c5.858-5.858 5.858-15.355 0-21.213s-15.356-5.857-21.214.001zM256 433.8c-8.284 0-15 6.716-15 15V497c0 8.284 6.716 15 15 15s15-6.716 15-15v-48.2c0-8.284-6.716-15-15-15zM78.2 256c0-8.284-6.716-15-15-15H15c-8.284 0-15 6.716-15 15s6.716 15 15 15h48.2c8.284 0 15-6.716 15-15zM256 128.533c-70.285 0-127.467 57.182-127.467 127.467S185.715 383.467 256 383.467 383.467 326.285 383.467 256 326.285 128.533 256 128.533zM402.941 130.272l34.083-34.083c5.858-5.858 5.858-15.355 0-21.213s-15.355-5.858-21.213 0l-34.083 34.083c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0zM402.935 381.722c-5.858-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l34.083 34.083c5.858 5.858 15.355 5.858 21.213 0s5.858-15.355 0-21.213l-34.083-34.083zM497 241h-48.2c-8.284 0-15 6.716-15 15s6.716 15 15 15H497c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                              fill="#000000"
                              opacity="1"
                              data-original="#000000"
                              className=""
                            />
                          </g>
                        </svg>

                        <svg
                          onClick={toggleMode}
                          className={mode === 'dark' ? 'active' : ''}
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="512"
                          height="512"
                          x="0"
                          y="0"
                          viewBox="0 0 32 32"
                          style={{ enableBackground: "new 0 0 512 512" }}
                          xmlSpace="preserve"
                        >
                          <g transform="matrix(0.8, 0, 0, 0.8, 3.2, 3.2)">
                            <path
                              d="M30.706 19.721a1 1 0 0 0-1.042-.234A13.423 13.423 0 0 1 12.513 2.335a1 1 0 0 0-1.276-1.278A15.214 15.214 0 0 0 5.51 4.68a15.422 15.422 0 0 0 21.81 21.81 15.214 15.214 0 0 0 3.623-5.728 1 1 0 0 0-.237-1.041z"
                              fill="#000000"
                              opacity="1"
                              data-original="#000000"
                              className=""
                            />
                          </g>
                        </svg>

                      </div>
                    </li>
                    <li className='flex items-center mt-2'>
                      <p className='min-w-[80px]'>{t("language")}</p>
                      <div className='language'>
                        <p className={language === 'vi' ? 'active' : ''} onClick={() => changeLanguage('vi')}>
                          VI
                        </p>
                        <p className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>
                          EN
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="socical">
                <li><a href="#"><img src="/icon/facebook.svg" alt="images" /></a></li>
                <li><a href="#"><img src="/icon/email.svg" alt="images" /></a></li>
                <li><a href="#"><img src="/icon/phone.svg" alt="images" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MainComponent t={t} />} />
        <Route path="/new" element={<NewsPage t={t} />} />
        <Route path="/favorite" element={<TeamPage t={t} />} />
        <Route path="/leagues" element={<LeaguesPage t={t} />} />
      </Routes>
    </Router >
  );
};

export default HeaderComponent;
