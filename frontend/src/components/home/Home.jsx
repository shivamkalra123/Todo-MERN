import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className='text-center'>Organize your <br />Work and Life, finally</h1>
        <p>Here is The Todo List created by <b>Somil Kwatra</b></p>
        <button className='home-btn'>Make Todo List</button>
      </div>
    </div>
  );
};

export default Home;
