import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Ensure the CSS is imported if not globally available

function Home() {
  return (
    <div className="container">
      <h1>Michigan State Credit Union</h1>
      <p>Your trusted partner in financial growth.</p>
      <p>Explore our range of services and find out how we can help you achieve your financial goals.</p>
      <Link to="/apply">
        <button>Apply for a Card</button>
      </Link>
    </div>
  );
}

export default Home;

