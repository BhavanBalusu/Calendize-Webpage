import React from 'react';
import Navbar from './Navbar'
import '../Styles/Dashboard.css'
import Events from '../Pages/Events';
import Location from '../Pages/Weather'
import News from '../Pages/News'
import Calendar from '../Pages/Calendar';

function Dashboard(props) {
  return (
    <div className='dashPage'>
      <Navbar title="Dashboard" />
      <h2 className='labelTitle' id="events-label">Manage Events</h2>
      <Events />
      <h2 className='labelTitle' id="calendar-label">Manage iCal Links</h2>
      <Calendar />
      <h2 className='labelTitle' id="weather-label">Weather</h2>
      <Location />
      <h2 className='labelTitle' id="news-label">Manage RSS Links</h2>
      <News />
    </div>
  );
}
export default Dashboard;
