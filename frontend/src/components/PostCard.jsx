import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card fade-in">
      {post.coverImage && (
        <div className="post-card-image">
          <img src={post.coverImage} alt={post.title} />
          {post.category && (
            <span className="post-category">{post.category}</span>
          )}
        </div>
      )}
      
      <div className="post-card-content">
        <h2 className="post-card-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        
        <p className="post-card-excerpt">
          {post.content.substring(0, 150)}...
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="badge">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="post-card-footer">
          <div className="post-meta">
            <span className="post-meta-item">
              <FiUser />
              {post.author?.username || 'Admin'}
            </span>
            <span className="post-meta-item">
              <FiCalendar />
              {format(new Date(post.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="post-stats">
            <span className="post-stat">
              <FiHeart /> {post.reactionCount || 0}
            </span>
            <span className="post-stat">
              <FiMessageCircle /> {post.commentCount || 0}
            </span>
          </div>
        </div>
        
        <Link to={`/post/${post.id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
