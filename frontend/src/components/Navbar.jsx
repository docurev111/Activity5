import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <h1>Wuthering Waves</h1>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              {isAdmin() && (
                <Link to="/create-post" className="nav-btn nav-btn-primary">
                  <FiEdit /> New Post
                </Link>
              )}
              <div className="nav-user">
                <div className="nav-user-avatar">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span>{user?.username}</span>
              </div>
              <button onClick={handleLogout} className="nav-btn nav-btn-logout">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-secondary">
                Login
              </Link>
              <Link to="/register" className="nav-btn nav-btn-primary">
                Register
              </Link>
            </>
          )}

          <div className="navbar-social">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
