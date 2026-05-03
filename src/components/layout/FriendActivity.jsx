import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers } from 'react-icons/fi';
import './FriendActivity.css';

const FriendActivity = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setFriends(res.data.users);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="friend-activity">
      <div className="friend-activity-header">
        <h3>Friend Activity</h3>
        <FiUsers size={18} />
      </div>

      <div className="friend-list">
        {loading ? (
          <div className="friend-skeleton-list">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="friend-skeleton-item"></div>
            ))}
          </div>
        ) : friends.length > 0 ? (
          friends.map(friend => (
            <div key={friend._id} className="friend-item">
              <div className="friend-avatar">
                {friend.avatar ? (
                  <img src={friend.avatar} alt={friend.username} />
                ) : (
                  <span>{friend.username.charAt(0)}</span>
                )}
                <div className="online-indicator"></div>
              </div>
              <div className="friend-info">
                <div className="friend-name">{friend.username}</div>
                <div className="friend-status">Listening to Music</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-friends">
            <p>No activity yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendActivity;
