import React from 'react';

export default class Navigation extends React.Component {
  render () {
    return (
      <div>
        <div className="logo">
          Mama's Recipies
        </div>
        <ul>
          <li>Home</li>
          <li>Search</li>
        </ul>
      </div>
    );
  }
}
