import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomTabBar.scss';

const BottomTabBar: React.FC = () => {
  return (
    <div className="bottom-tab-bar">
      <NavLink 
        to="/video" 
        className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
      >
        <span className="material-icons">videocam</span>
      </NavLink>
      <NavLink 
        to="/gallery" 
        className={({ isActive }) => isActive ? "tab-link active-tab" : "tab-link"}
      >
        <span className="material-icons">video_library</span>
      </NavLink>
    </div>
  );
};

export default BottomTabBar;