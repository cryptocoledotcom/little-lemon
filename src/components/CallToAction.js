import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <Link to="/booking" className="cta-button">Reserve a Table</Link>
      </div>
      <div className="hero-image">
        <img src="/images/chef.jpg" alt="Delicious restaurant food" />
      </div>
    </section>
  );
};

export default CallToAction;
