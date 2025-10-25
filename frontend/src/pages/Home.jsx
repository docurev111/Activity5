import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Add no-scroll class when component mounts
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    // Remove no-scroll class when component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="home">
      {/* Hero Section with Background Video */}
      <div className="hero-section">
        <video 
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/assets/BG.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Explore the World of <span className="highlight">Wuthering Waves</span>
          </h1>
          <p className="hero-subtitle">
            Get the latest guides, tips, and news to master your adventure
          </p>
          
          <form className="hero-subscribe" onSubmit={handleSubscribe}>
            <div className="subscribe-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <label className="subscribe-checkbox">
              <input type="checkbox" />
              <span>Yes, subscribe me to your newsletter.</span>
            </label>
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
