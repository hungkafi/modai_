import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import FilterComponent from '../filter_component/filter_component';
import NewsComponent from '../news/news_component/news_component';
import WorldsComponent from '../worlds/world_component';
const world_data_url = "/fake_data/world_history.json";
// const tournamentsurl2 = "http://localhost:8080/api/v1/leagues/top5";
const tournamentsurl = "/fake_data/topTournaments.json";


const MainComponent = ({ t }) => {

  // const [data, setData] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [world_data, setWorldData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(tournamentsurl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const tournamentsData = await response.json();
        console.log(tournamentsData);

        setTournaments(tournamentsData);


        const response_world_data = await fetch(world_data_url);
        if (!response_world_data.ok) {
          throw new Error('Network response was not ok');
        }
        const world_data = await response_world_data.json();
        console.log(world_data);

        setWorldData(world_data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // if (error) return <div>{console.log(error)}</div>;

  if (loading) return (
    <section className='flex w-full mt-10 mb-6'>
      <div className='container'>
        <div className="inner-section py-8 px-16 mb-6 ">Loading...</div>
      </div>
    </section>);

  return (
    <section className='flex w-full mt-10'>
      <div className='container'>
        <div className='grid grid-cols-4 gap-4'>
          <div id="tournament" className='col-span-1'>
            <div className='inner-section py-2 mb-4'>
              <h6 className="p-4">{t("topTournaments")}</h6>
              <div className="list-item">
                {tournaments.map((item, index) => (

                  <Link className="item-inner" to={`/leagues?tab=standings&id=${item.id}`} key={index}>
                    <img src={item.logo} alt="images" /> {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <FilterComponent t={t} />
          </div>
          <div className='col-span-1 '>
            <div className='inner-section pt-2 pb-4 mb-4'>
              <h6 className="p-4">{t("new")}</h6>
              <NewsComponent />
            </div>

            <div className='inner-section pt-2 pb-4'>
              <WorldsComponent data={world_data} />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default MainComponent;
