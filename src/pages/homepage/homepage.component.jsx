import React from 'react';
 
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.components';

const HomePage = () => {
   console.log('env:', process.env.REACT_APP_FIREBASE_API_KEY);

   return (
      <div className="homepage">
      <Directory />
       
      </div>
   )
};

export default HomePage;
