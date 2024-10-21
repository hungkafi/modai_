import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const LeaguesPage = ({ t }) => {
  const [StandingData, setStandingData] = useState(null);
  const [tournamentsData, setTournamentsData] = useState(null);
  const [loading, setLoading] = useState(true);


  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const id_params = queryParams.get('id') || "39";
  const currentYear = new Date().getFullYear();
  const season_params = queryParams.get('season') || currentYear;

  const tab = queryParams.get('tab') || 'standings';
  const standingsUrl = "/fake_data/standings.json";
  const tournamentsurl = "/fake_data/topTournaments.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch standings data
        // const standingsResponse = await fetch(`http://localhost:8080/api/v1/standings/${id_params}?season=${season_params}`);


        // Fake data
        const standingsResponse = await fetch(tournamentsurl);
        if (!standingsResponse.ok) {
          throw new Error('Network response for standings was not ok');
        }
        const standingsResult = await standingsResponse.json();
        const standingResult = standingsResult.find(item => String(item.id) === id_params);
        setTournamentsData(standingResult);

        const responseStanding = await fetch(standingsUrl);
        if (!responseStanding.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await responseStanding.json();
        setStandingData(result);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading || !tournamentsData || !StandingData) {
    return (
      <section className='flex w-full mt-10 mb-6'>
        <div className='container'>
          <div className="inner-section py-8 px-16 mb-6 ">Loading...</div>
        </div>
      </section>)
  }

  const selectedIndex = tab === 'standings' ? 0 : 1;

  const handleTabSelect = (index) => {
    const selectedTab = index === 0 ? 'standings' : 'matches';
    navigate(`?tab=${selectedTab}`);
  };

  return (
    <section className='flex w-full mt-10 mb-6'>
      <div className='container'>

        <div className="inner-section py-8 px-16 mb-6">
          <div className="flex items-center">
            <img className="w-8 h-8" src={tournamentsData.logo} alt="" />
            <div className="ml-4">
              <h1 className="text-base font-smb">{tournamentsData.name}</h1>
              <p>{tournamentsData.nameCountry}</p>
            </div>
          </div>
        </div>
        <div className="inner-section py-8 px-16">
          <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
            <TabList className="mb-6 core_tab__menu">
              <Tab>{t('table')}</Tab>
              <Tab>{t('matches')}</Tab>
            </TabList>

            <TabPanel>
              <table className="core_table text-left ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th colSpan="2"></th>
                    <th>PL</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>+/-</th>
                    <th>GD</th>
                    <th className="text-right">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {StandingData.map((team) => (
                    <tr key={team.id}>
                      <td className="w-4">{team.rank}</td>
                      <td className="w-10 text-center"><img src={team.logo} alt={team.name} style={{ width: 'auto', height: '20px', margin: 'auto', }} /></td>
                      <td>{team.name}</td>
                      <td>{team.totalGames}</td>
                      <td>{team.totalWins}</td>
                      <td>{team.totalDraws}</td>
                      <td>{team.totalLosses}</td>
                      <td>{team.goalsFor}/{team.goalsAgainst}</td>
                      <td>{team.goalDifference}</td>
                      <td className="text-right">{team.totalPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default LeaguesPage;
