import React, { useState } from 'react';
import NewsItem from './news_item';

const NewsComponent = () => {

  const [apiData, setApiData] = useState([
    {
      id: "1",
      img: "https://images2.minutemediacdn.com/image/upload/c_crop,w_5304,h_2983,x_0,y_174/c_fill,w_912,h_516,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01j8x1dbz685rafwh548.jpg",
      title: "Atletico Madrid vs Real Madrid: Preview, predictions and lineups",
      date: "90min"
    },
    {
      id: "2",
      img: "https://images2.minutemediacdn.com/image/upload/c_crop,w_2559,h_1439,x_0,y_0/c_fill,w_912,h_516,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/90min_en_international_web/01j8stdk0fr9e41gx0x2.jpg",
      title: "Atletico Madrid vs Real Madrid: Preview, predictions and lineups2",
      date: "45min"
    },
    {
      id: "3",
      img: "https://images2.minutemediacdn.com/image/upload/c_crop,w_2559,h_1439,x_0,y_0/c_fill,w_912,h_516,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/90min_en_international_web/01j8stdk0fr9e41gx0x2.jpg",
      title: "Atletico Madrid vs Real Madrid: Preview, predictions and lineups2",
      date: "45min"
    }
  ]);
  return (
    <div>
      {apiData.map((news) => (
        <NewsItem key={news.id} data={news} />
      ))}
    </div>
  );
};

export default NewsComponent;
