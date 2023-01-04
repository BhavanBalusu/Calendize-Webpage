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
      <div>
        <Location />
      </div>
      <div>
        <div>
          <Events />
        </div>
      </div>
      <div>
        <Calendar />
        <News />
      </div>
    </div>
  );
}
export default Dashboard;
