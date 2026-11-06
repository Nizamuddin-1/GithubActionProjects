import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');

  const loadLinks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/links`);
      const data = await res.json();
      if (Array.isArray(data)) setLinks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadLinks(); }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    await fetch(`${API_BASE}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: url, customSlug: slug || undefined })
    });
    setUrl('');
    setSlug('');
    loadLinks();
  };

  return (
    <div className="container">
      <h2>SnapLink Shortener (ECS Fargate)</h2>
      <form onSubmit={handleShorten} className="shorten-form">
        <input 
          placeholder="https://example.com/very-long-url" 
          required 
          value={url} 
          onChange={e => setUrl(e.target.value)} 
          className="input-url"
        />
        <input 
          placeholder="Custom slug (optional)" 
          value={slug} 
          onChange={e => setSlug(e.target.value)} 
          className="input-slug"
        />
        <button type="submit" className="btn-shorten">Shorten</button>
      </form>

      <h3>Active Short Links</h3>
      <table className="links-table">
        <thead>
          <tr>
            <th>Short Link</th>
            <th>Original URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link._id}>
              <td>
                <a href={`${API_BASE}/s/${link.slug}`} target="_blank" rel="noreferrer" className="link-slug">
                  /s/{link.slug}
                </a>
              </td>
              <td className="link-dest">{link.originalUrl}</td>
              <td>
                <span className="badge-clicks">{link.clicks}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

