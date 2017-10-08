import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch(props) {
  return (
    <div>
      <h1>Opps!!! We cannot find that page...</h1>
      <p>You may want below pages:</p>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/search'>Add book</Link>
        </li>
      </ul>
    </div>
  )
}

export default NoMatch;