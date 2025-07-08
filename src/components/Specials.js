import React from 'react';
import { Link } from 'react-router-dom';

const specialsData = [
  {
    img: '/images/greek_salad.jpg',
    title: 'Greek Salad',
    price: '$12.99',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    img: '/images/bruchetta.jpg',
    title: 'Bruschetta',
    price: '$5.99',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are perfect.',
  },
  {
    img: '/images/penne_pasta.jpg',
    title: 'Penne Pasta',
    price: '$10.00',
    description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
  },
];

const Specials = () => {
  return (
    <section className="specials">
      <div className="specials-header">
        <h2>This week's specials!</h2>
        <Link to="/menu" className="cta-button">Online Menu</Link>
      </div>
      <div className="specials-cards">
        {specialsData.map((special) => (
          <div key={special.title} className="special-card">
            <img src={special.img} alt={special.title} />
            <div className="special-card-content">
              <div className="special-card-header">
                <h3>{special.title}</h3>
                <p className="price">{special.price}</p>
              </div>
              <p>{special.description}</p>
              <Link to="/order" className="order-link">Order a delivery</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specials;
