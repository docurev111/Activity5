import { Link } from 'react-router-dom';
import './WorkWithMe.css';

const WorkWithMe = () => {
  const services = [
    {
      title: 'Wuthering Waves Guides',
      description: 'Comprehensive guides for characters, weapons, and game mechanics. Learn the best strategies to dominate in Wuthering Waves with detailed walkthroughs and tips.',
      icon: '📚'
    },
    {
      title: 'Character Builds & Tier Lists',
      description: 'In-depth character analysis, optimal builds, and up-to-date tier lists. Discover which characters are meta and how to build them for maximum performance.',
      icon: '⚔️'
    },
    {
      title: 'Game Updates & News',
      description: 'Stay updated with the latest Wuthering Waves news, patch notes, and upcoming events. Never miss important updates and limited-time content.',
      icon: '📰'
    }
  ];

  return (
    <div className="work-page">
      {/* Hero Section */}
      <section className="work-hero">
        <div className="work-hero-content">
          <h1 className="work-hero-title">
            Hi, I'm <span className="highlight">WutheringAdmin</span>
          </h1>
          <p className="work-hero-subtitle">
            I Help Players Master Wuthering Waves, Build Powerful Teams, and Stay Updated with the Latest Game Content.
          </p>
        </div>
        <div className="work-hero-image">
          <div className="hero-image-placeholder">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="var(--primary)" d="M39.5,-65.5C51.4,-58.2,61.5,-48.3,68.4,-36.2C75.3,-24.1,79,-9.8,78.8,4.7C78.6,19.2,74.5,34,66.3,46.2C58.1,58.4,45.8,68,32.1,73.8C18.4,79.6,3.3,81.6,-11.7,80.1C-26.7,78.6,-41.6,73.6,-54.3,65.1C-67,56.6,-77.5,44.6,-82.7,30.5C-87.9,16.4,-87.8,0.2,-83.9,-14.5C-80,-29.2,-72.3,-42.4,-61.5,-50.5C-50.7,-58.6,-37.8,-61.6,-25.3,-68.5C-12.8,-75.4,-0.6,-86.2,10.8,-82.8C22.2,-79.4,27.6,-72.8,39.5,-65.5Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="work-services">
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="work-cta">
        <div className="cta-content">
          <h2 className="cta-title">I'd Love to Hear From You.</h2>
          <p className="cta-subtitle">Here's How You Can Reach Me</p>
          <Link to="/contact" className="cta-button">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkWithMe;
