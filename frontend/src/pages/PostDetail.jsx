import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI, commentsAPI, reactionsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likingPost, setLikingPost] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchReactions();
  }, [id]);

  const fetchPost = async () => {
    try {
      // Check if this post has been viewed in this session
      const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '[]');
      const hasViewed = viewedPosts.includes(id);

      // Fetch post (without incrementing view)
      const response = await postsAPI.getById(id);
      setPost(response.data);

      // Increment view count only once per session
      if (!hasViewed) {
        try {
          await postsAPI.incrementView(id);
          // Mark as viewed in this session
          viewedPosts.push(id);
          localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
        } catch (error) {
          console.error('Failed to increment view:', error);
        }
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      toast.error('Failed to load post');
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getByPost(id);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const fetchReactions = async () => {
    try {
      const response = await reactionsAPI.getByPost(id);
      const total = response.data.total || 0;
      setLikesCount(total);
      
      // Check if current user has liked
      if (user && response.data.byType && response.data.byType.LIKE) {
        const hasLiked = response.data.byType.LIKE.some(u => u.id === user.id);
        setUserHasLiked(hasLiked);
      } else {
        setUserHasLiked(false);
      }
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
      setLikesCount(0);
      setUserHasLiked(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to like posts');
      navigate('/login');
      return;
    }

    if (likingPost) return;

    setLikingPost(true);

    try {
      if (userHasLiked) {
        // Unlike
        await reactionsAPI.delete(id);
        setUserHasLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
        toast.success('Like removed');
      } else {
        // Like
        await reactionsAPI.create({ postId: id, type: 'LIKE' });
        setUserHasLiked(true);
        setLikesCount(prev => prev + 1);
        toast.success('Post liked!');
      }
    } catch (error) {
      console.error('Failed to update reaction:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update reaction. Please try again.');
      // Refresh reactions to get correct state
      await fetchReactions();
    } finally {
      setLikingPost(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.info('Please login to comment');
      navigate('/login');
      return;
    }

    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (submittingComment) return;

    try {
      setSubmittingComment(true);
      await commentsAPI.create({ postId: id, content: commentText });
      setCommentText('');
      await fetchComments();
      toast.success('Comment added!');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.delete(id);
      toast.success('Post deleted successfully');
      navigate('/blog');
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getReadTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="post-detail-container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        <Link to="/blog" className="back-button">
          ← Back to Blog
        </Link>

        {/* Post Header */}
        <div className="post-header">
          {post.coverImage && (
            <div className="post-cover-image">
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}

          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="post-author">
              👤 {post.author?.username || 'Admin'}
            </span>
            <span className="post-date">
              📅 {formatDate(post.createdAt)}
            </span>
            <span className="post-read-time">
              ⏱️ {getReadTime(post.content)}
            </span>
            <span className="post-views">
              👁️ {post.views || 0} views
            </span>
          </div>

          {post.category && (
            <div className="post-category">{post.category}</div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="post-content">
          <div className="post-content-text">
            {post.content}
          </div>
        </div>

        {/* Post Actions */}
        <div className="post-actions">
          <button 
            onClick={handleLike}
            className={`action-button ${userHasLiked ? 'liked' : ''}`}
            disabled={likingPost}
          >
            {userHasLiked ? '❤️' : '🤍'} {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </button>
          <div className="action-button">
            💬 {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </div>
        </div>

        {/* Admin Actions */}
        {isAdmin() && (
          <div className="admin-actions">
            <Link to={`/edit-post/${post.id}`} className="edit-button">
              ✏️ Edit Post
            </Link>
            <button onClick={handleDeletePost} className="delete-button">
              🗑️ Delete Post
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <h2 className="comments-header">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                required
                disabled={submittingComment}
              />
              <button type="submit" disabled={submittingComment}>
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="comment-form">
              <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
                <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link> to comment on this post
              </p>
            </div>
          )}

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.user?.username || 'Anonymous'}
                    </span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
