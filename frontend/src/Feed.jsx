import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";

const mockPosts = [
  {
    id: 1,
    title: "AI Summarizes the Week: Key Highlights",
    image: "https://via.placeholder.com/400x250?text=AI+News",
    tags: ["AI", "Technology"],
  },
  {
    id: 2,
    title: "Markets React to New Data",
    image: "https://via.placeholder.com/400x250?text=Markets",
    tags: ["Finance", "Economy"],
  },
  {
    id: 3,
    title: "Designers Rethink Mobile Layouts",
    image: "https://via.placeholder.com/400x250?text=Design",
    tags: ["Design", "UI/UX"],
  },
  {
    id: 4,
    title: "Breakthrough in Quantum Computing Performance",
    image: "https://via.placeholder.com/400x250?text=Quantum",
    tags: ["Quantum", "Technology"],
  },
  {
    id: 5,
    title: "Crypto Markets Recover After Volatile Week",
    image: "https://via.placeholder.com/400x250?text=Crypto",
    tags: ["Crypto", "Finance"],
  },
  {
    id: 6,
    title: "New Study Reveals Impact of AI on Creativity",
    image: "https://via.placeholder.com/400x250?text=AI+Research",
    tags: ["AI", "Research"],
  },
  {
    id: 7,
    title: "Electric Cars See Massive Adoption in 2025",
    image: "https://via.placeholder.com/400x250?text=EV+Trends",
    tags: ["Automotive", "Energy"],
  },
  {
    id: 8,
    title: "Startups Shift Toward Fully Remote Structures",
    image: "https://via.placeholder.com/400x250?text=Startup+News",
    tags: ["Startups", "Business"],
  },
  {
    id: 9,
    title: "Cybersecurity Experts Warn of New Threat Patterns",
    image: "https://via.placeholder.com/400x250?text=Cybersecurity",
    tags: ["Security", "Technology"],
  },
];

export default function Feed() {
  const navigate = useNavigate();

  // user session
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  // dropdown states
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileViewOpen, setProfileViewOpen] = useState(false);
  const menuRef = useRef(null);

  // search
  const [search, setSearch] = useState("");

  // filter posts
  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // load user
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    let mounted = true;

    (async () => {
      setLoadingUser(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!mounted) return;

        if (!res.ok) {
          setUser(null);
          setLoadingUser(false);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        if (mounted) setLoadingUser(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setProfileViewOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const avatarText = () => {
    if (!user) return "ES";
    if (user.username) return user.username[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "ES";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const displayName =
    user?.name || (user?.email ? user.email.split("@")[0] : "Name not provided");

  return (
    <div className="feed-page">
      {/* Navbar */}
      <header className="feed-header">
        <div className="brand" onClick={() => navigate("/")}>
          <div className="brand-icon"></div>
          <span className="brand-text">ElevenSense</span>
        </div>

        <div className="feed-header-actions">
          <div className="profile-wrapper" ref={menuRef}>
            <button
              className="profile-btn"
              onClick={() => setMenuOpen((s) => !s)}
            >
              <div className="profile-avatar">{avatarText()}</div>
            </button>

            {/* Primary dropdown */}
            {menuOpen && !profileViewOpen && (
              <div className="profile-menu">
                <button
                  className="profile-menu-item"
                  onClick={() => setProfileViewOpen(true)}
                >
                  Profile
                </button>
                <button className="profile-menu-item">Settings</button>
                <button className="profile-menu-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}

            {/* Profile detail panel */}
            {menuOpen && profileViewOpen && (
              <div className="profile-menu profile-menu--profile">
                <div className="profile-menu-top">
                  <div className="profile-avatar profile-avatar--large">
                    {avatarText()}
                  </div>
                  <div className="profile-meta">
                    <div className="profile-meta-name">{displayName}</div>
                    <div className="profile-meta-username">
                      @{user?.username || "—"}
                    </div>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="profile-detail-row">
                    <span className="profile-detail-key">Email</span>
                    <span className="profile-detail-val">
                      {user?.email || "Not provided"}
                    </span>
                  </div>
                  <div className="profile-detail-row">
                    <span className="profile-detail-key">Phone</span>
                    <span className="profile-detail-val">
                      {user?.phone || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="profile-menu-footer">
                  <button
                    className="profile-menu-item"
                    onClick={() => setProfileViewOpen(false)}
                  >
                    ← Back
                  </button>
                  <button className="profile-menu-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className="feed-search-bar">
        <input
          type="text"
          placeholder="Search news, topics, tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* News grid */}
      <main className="feed-main feed-main--no-sidebar">
        <section className="feed-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="news-card">
              <div className="news-card-image">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="news-card-body">
                <h3 className="news-card-title">{post.title}</h3>

                <div className="news-card-tags">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="news-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="news-card-actions">
                  <button className="btn outline small">Read</button>
                  <button className="btn ghost small">Save</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
