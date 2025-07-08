import React from 'react';

const testimonialsData = [
  {
    rating: 5,
    name: 'Sarah L.',
    image: '/images/customer1.jpg',
    review: 'The best Mediterranean food I\'ve had in Chicago! The Greek salad was so fresh.',
  },
  {
    rating: 5,
    name: 'John D.',
    image: '/images/customer2.jpg',
    review: 'Amazing Bruschetta. The atmosphere is cozy and the staff is incredibly friendly. A must-visit!',
  },
  {
    rating: 4,
    name: 'Emily R.',
    image: '/images/customer3.jpg',
    review: 'I loved the Lemon Dessert! It was the perfect end to a delicious meal. I\'ll be back for sure.',
  },
  {
    rating: 5,
    name: 'Michael B.',
    image: '/images/customer4.jpg',
    review: 'Little Lemon is a gem. Authentic flavors and a wonderful dining experience. Highly recommend!',
  },
];

const CustomersSay = () => {
  return (
    <section className="testimonials">
      <h2>What our customers say!</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.name} className="testimonial-card">
            <p className="rating">{'★'.repeat(testimonial.rating)}</p>
            <div className="customer-info">
              <img src={testimonial.image} alt={testimonial.name} />
              <p>{testimonial.name}</p>
            </div>
            <p className="review-text">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomersSay;
