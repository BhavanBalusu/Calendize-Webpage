import React from 'react';
import Navbar from './Navbar'
import '../Styles/Dashboard.css'
import Events from '../Pages/Events';
import Location from '../Pages/Weather'
import News from '../Pages/News'
import Calendar from '../Pages/Calendar';
import Layout from "./Layout";

function Dashboard(props) {
  return (
    <>
      <Navbar title="Dashboard" />
      <div className='dashPage'>
        <div className='column one'>
          <Location />
          <Layout />
        </div>
        <div className='column two'>
          <Calendar />
          <News />
        </div>
        <div className='column three' style={{height:"700px"}}>
            <Events/>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
