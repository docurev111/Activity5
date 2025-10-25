import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(null);

  const categories = ['all', 'Announcements', 'Guides', 'News', 'Tips', 'Events'];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = selectedCategory === 'all' 
        ? `/posts?page=${page}&limit=9`
        : `/posts/category/${selectedCategory}?page=${page}&limit=9`;
      
      const response = await api.get(endpoint);
      const postsData = response.data.data || [];
      const totalPagesData = response.data.meta?.totalPages || 1;
      
      setPosts(postsData);
      setTotalPages(totalPagesData);
      
      // Set first post as featured if on first page
      if (page === 1 && postsData.length > 0) {
        setFeaturedPost(postsData[0]);
      } else {
        setFeaturedPost(null);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
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
      <div className="blog-page">
        <div className="blog-container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <h1 className="blog-main-title">All The Tips In One Place</h1>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* Hero Title */}
        <h1 className="blog-main-title">All The Tips In One Place</h1>

        {/* Featured Post */}
        {featuredPost && page === 1 && (
          <Link to={`/post/${featuredPost.id}`} className="featured-post">
            <div className="featured-image">
              <img 
                src={featuredPost.coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800'} 
                alt={featuredPost.title}
              />
            </div>
            <div className="featured-content">
              <div className="featured-meta">
                {formatDate(featuredPost.createdAt)} · {getReadTime(featuredPost.content)}
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">
                {featuredPost.content ? featuredPost.content.substring(0, 150) + '...' : 'No content available'}
              </p>
              <div className="featured-footer">
                <span className="post-views">👁 {featuredPost.views || 0}</span>
                <span className="post-comments">💬 {featuredPost.commentsCount || 0}</span>
                <span className="post-likes">❤️ {featuredPost.reactionsCount || 0}</span>
              </div>
            </div>
          </Link>
        )}

        {/* All Posts Label */}
        {posts.length > 0 && <div className="all-posts-label">All Posts</div>}

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="no-posts-message">
            <p>No posts available yet. Check back soon!</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6B7280' }}>
              Admin can create posts by logging in and clicking "New Post"
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="blog-posts-grid">
            {posts.slice(page === 1 ? 1 : 0).map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="blog-post-card">
                <div className="post-card-image">
                  <img 
                    src={post.coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400'} 
                    alt={post.title}
                  />
                </div>
                <div className="post-card-content">
                  <div className="post-card-meta">
                    {formatDate(post.createdAt)} · {getReadTime(post.content)}
                  </div>
                  <h3 className="post-card-title">{post.title}</h3>
                  <p className="post-card-excerpt">
                    {post.content ? post.content.substring(0, 100) + '...' : 'No content available'}
                  </p>
                  <div className="post-card-footer">
                    <span className="post-comments-count">💬 0</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="blog-pagination">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
