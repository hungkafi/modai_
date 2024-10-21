import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import MatchComponent from '../match_component/match_component';


const matchJson = "/fake_data/match.json";

function MyCalendar({ t }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get('tab') || 'upcoming';


  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedLanguage = localStorage.getItem('language');

  useEffect(() => {
    const fetchData = async () => {

      try {
        // Fetch match data
        const match = await fetch(matchJson);
        if (!match.ok) {
          throw new Error('Network response was not ok');
        }

        const resultMatch = await match.json();

        setMatch(resultMatch);
        setLoading(false);

      } catch (error) {
        setLoading(true);
      }


    };

    fetchData();
  }, []);



  const [date, setDate] = useState(new Date());
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

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const formattedDate = date.toLocaleDateString(storedLanguage === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });


  if (loading) {
    return (
      <section className='flex w-full mt-10 mb-6'>
        <div className='container'>
          <div className="inner-section py-8 px-16 mb-6 ">Loading...</div>
        </div>
      </section>)
  }

  return (
    <div>
      <div className='inner-section py-2 mb-4'>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between px-4 relative border-b border-primary border-solid pb-2">
            <button type="submit" onClick={handlePrevDay}>
              <svg
                className="px-2 w-8 h-3"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 492 492"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                  />
                </g>
              </svg>

            </button>
            <div className="core_collapse core_collapse__fixed" ref={collapseRef}>
              <div className="collapse__label py-3 justify-center" onClick={toggleCollapse}>
                <p className="link">{formattedDate}</p>
              </div>
              <div className={`collapse__content ${isCollapsed ? 'collapsed' : 'hidden'}`}>
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
            <button type="submit" onClick={handleNextDay}>
              <svg
                className="px-2 w-8 h-3"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 492.004 492.004"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                    className=""
                  />
                </g>
              </svg>

            </button>
            <input className="hidden" type="text" value={formattedDate} readOnly />
          </div>

          <ul className="core_tab__label">
            <li><Link className={tab === 'upcoming' ? 'active' : ''} to="?tab=upcoming">{t('upcoming')}</Link></li>
            <li><Link className={tab === 'completed' ? 'active' : ''} to="?tab=completed">{t('completed')}</Link></li>
          </ul>
        </form>
      </div>


      {
        match.map((item) => (
          <div key={item.id} className='inner-section overflow-hidden mb-4'>
            <h6 className="py-2 mb-0.5 bg-main flex items-center px-4">
              <img className="mr-3 w-3 h-3" src={item.league.logo} alt="images" />
              {item.league.name} - {item.league.nameCountry}
            </h6>
            <MatchComponent item={item} />
          </div>
        ))
      }


    </div >

  );
}

export default MyCalendar;
