import React from 'react';
import { Outlet } from 'react-router-dom';

import './homepage.styles.scss'
import Directory from '../../components/directory/directory.components';

const HomePage = () => (
   <div className="homepage">
      <Directory />
      <Outlet/>
   </div> 
);

export default HomePage;
