import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Eye, TrendingUp, Clock, User, Send, X } from 'lucide-react';
import { trendingPostsData, initialLatestPostsData, mockAccounts } from '../data/mockTwitterData';

const TwitterEngagementDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('latest'); // 'trending' or 'latest'
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replies, setReplies] = useState([
    "Great insights! Thanks for sharing 🙌",
    "This is exactly what I was looking for. Appreciate the detailed breakdown!",
    "Love this perspective! Have you considered [specific question]?",
    "Bookmarking this for later reference. Excellent thread! 📌",
    "Thanks for the valuable content! This will help many people."
  ]);
  const [newReply, setNewReply] = useState('');

  // Use imported mock data
  const [trendingPosts, setTrendingPosts] = useState(trendingPostsData);
  const [latestPosts, setLatestPosts] = useState(initialLatestPostsData);

  // Simulate live feed: add a new post every 10 seconds
  useEffect(() => {
    let postIdCounter = 106; // Start after the existing mock posts
    const generateNewPost = () => {
      const randomAccount = mockAccounts[Math.floor(Math.random() * mockAccounts.length)];
      const randomContent = randomAccount.contentTemplates[Math.floor(Math.random() * randomAccount.contentTemplates.length)];
      const engagement = Math.floor(Math.random() * 1000) + 300; // Random engagement between 300-1300
      return {
        id: postIdCounter++,
        name: randomAccount.name,
        author: randomAccount.author,
        content: randomContent,
        engagement: engagement,
        likes: Math.floor(engagement * 0.6),
        retweets: Math.floor(engagement * 0.2),
        replies: Math.floor(engagement * 0.15),
        impressions: engagement * 15,
        timestamp: Date.now(), // Store as ms since epoch
        priority: engagement > 800 ? 'medium' : 'low',
        avatar: randomAccount.avatar
      };
    };
    const interval = setInterval(() => {
      const newPost = generateNewPost();
      setLatestPosts(prev => {
        const updatedPosts = [newPost, ...prev];
        // Keep only the latest 20 posts (rolling window)
        return updatedPosts.slice(0, 20);
      });
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Update timestamps for initialLatestPostsData to use ms since epoch
  useEffect(() => {
    setLatestPosts(prev => prev.map(post => {
      if (typeof post.timestamp === 'number') return post;
      // If it's a string, convert to ms since epoch (simulate as just now)
      return { ...post, timestamp: Date.now() };
    }));
  }, []);

  // Helper to format the timestamp for latest posts
  const formatLatestPostTimestamp = (timestamp) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffSecs < 5) return 'just now';
    if (diffMins < 1) return `${diffSecs} secs ago`;
    if (diffMins === 1) return '1 min ago';
    return `${diffMins} mins ago`;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setNewReply('');
  };

  const handleReply = (replyText) => {
    // Simulate sending reply
    alert(`Reply sent to ${selectedPost.author}: "${replyText}"`);
    // Remove the post from the list after replying based on current tab
    if (selectedTab === 'trending') {
      setTrendingPosts(prev => prev.filter(post => post.id !== selectedPost.id));
    } else {
      setLatestPosts(prev => prev.filter(post => post.id !== selectedPost.id));
    }
    closeModal();
  };

  const addCustomReply = () => {
    if (newReply.trim()) {
      setReplies([...replies, newReply.trim()]);
      setNewReply('');
    }
  };

  // Posts to display based on selected tab
  const posts = selectedTab === 'trending' ? trendingPosts : latestPosts;
  const setPosts = selectedTab === 'trending' ? setTrendingPosts : setLatestPosts;

  // Handler to skip a post
  const handleSkipPost = (postId) => {
    if (selectedTab === 'trending') {
      setTrendingPosts(prev => prev.filter(post => post.id !== postId));
    } else {
      setLatestPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 Reply Guy Command Center</h1>
          <p className="text-gray-600">High-priority posts from your curated list</p>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              High Priority (10K+ engagement)
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              Medium Priority (5K-10K)
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              Low Priority (&lt;5K)
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${selectedTab === 'latest' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setSelectedTab('latest')}
          >
            <Clock className="inline-block mr-1 h-5 w-5" /> Latest Posts
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${selectedTab === 'trending' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setSelectedTab('trending')}
          >
            <TrendingUp className="inline-block mr-1 h-5 w-5" /> Trending Posts
          </button>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="bg-white rounded-r-lg rounded-b-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                {selectedTab === 'trending' ? (
                  <>
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Trending Posts
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-5 w-5" />
                    Latest Posts
                  </>
                )}
              </h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className={`p-4 border-l-4 ${getPriorityColor(post.priority)} cursor-pointer hover:bg-gray-50 transition-colors`}
                  onClick={() => openModal(post)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{post.avatar}</span>
                        <span className="font-semibold text-blue-600">{post.name} <span className="text-gray-500 font-normal">{post.author}</span></span>
                        <span className="text-gray-500 text-sm ml-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {selectedTab === 'latest' ? formatLatestPostTimestamp(post.timestamp) : post.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {formatNumber(post.likes)}
                        </div>
                        <div className="flex items-center">
                          <Repeat2 className="h-4 w-4 mr-1 text-green-500" />
                          {formatNumber(post.retweets)}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                          {formatNumber(post.replies)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-purple-500" />
                          {formatNumber(post.impressions)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right flex flex-col items-end justify-between h-full">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatNumber(post.engagement)}
                        </div>
                        <div className="text-xs text-gray-500">Total Engagements</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSkipPost(post.id); }}
                        className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-semibold transition-colors"
                        style={{ alignSelf: 'flex-end' }}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-2xl text-green-600 font-semibold">
            {selectedTab === 'trending' ? (
              <>✅ Reply Guy mission accomplished. You will have a new selection of trending posts here in your next session.</>
            ) : (
              <>✅ Reply Guy mission accomplished. I'll notify you when there are new posts to reply to.</>
            )}
          </div>
        )}

        {/* Reply Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 max-h-none">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Reply to Post
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {selectedPost && (
                  <>
                    {/* Original Post */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{selectedPost.avatar}</span>
                        <div>
                          <span className="font-semibold text-blue-600">{selectedPost.name} <span className="text-gray-500 font-normal">{selectedPost.author}</span></span>
                          <div className="text-sm text-gray-500">{selectedPost.timestamp}</div>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-3">{selectedPost.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {formatNumber(selectedPost.likes)}
                        </div>
                        <div className="flex items-center">
                          <Repeat2 className="h-4 w-4 mr-1 text-green-500" />
                          {formatNumber(selectedPost.retweets)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-purple-500" />
                          {formatNumber(selectedPost.impressions)}
                        </div>
                      </div>
                    </div>

                    {/* Quick Replies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Replies:</h4>
                      <div className="space-y-2">
                        {replies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleReply(reply)}
                            className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition-colors border border-blue-200 hover:border-blue-300"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Reply */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Custom Reply:</h4>
                      <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Write your custom reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                      />
                      <div className="flex mt-4 space-x-3">
                        <button
                          onClick={addCustomReply}
                          disabled={!newReply.trim()}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Save as Template
                        </button>
                        <button
                          onClick={() => handleReply(newReply)}
                          disabled={!newReply.trim()}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitterEngagementDashboard; 