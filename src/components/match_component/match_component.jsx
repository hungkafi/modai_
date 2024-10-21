import React from 'react';

const MatchComponent = ({ item }) => {

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Get hours and pad with leading zero
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero
    return `${hours}:${minutes}`; // Return formatted time
  };

  return (
    <div className="football_match">
      <div className='w_45 flex items-center'>
        {item.finalOdd && (<p className='finalOdd'>{item.finalOdd.homePoint}</p>)}
        <p className='flex items-center justify-end ml-auto'>{item.homeTeam.name} <img className='ml-2 w-3 h-3' src={item.homeTeam.logo} alt="images" /></p>
      </div>
      <p className='mx-4 text-primary text-center w_10'>
        {formatTime(item.date)}
      </p>
      <div className='w_45 flex items-center'>
        <p className='flex items-center justify-start'><img className='mr-2 w-3 h-3' src={item.awayTeam.logo} alt="images" /> {item.awayTeam.name}</p>
        {item.finalOdd && (<p className="finalOdd ml-auto">{item.finalOdd.awayPoint}</p>)}
      </div>
    </div>
  );
};

export default MatchComponent;
