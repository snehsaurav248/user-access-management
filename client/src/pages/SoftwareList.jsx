import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SoftwareList.css';

const SoftwareList = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/software', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSoftwareList(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch software list.');
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="software-list-container">
      <h2 className="heading">Available Software</h2>
      <ul className="software-list">
        {softwareList.map((software) => (
          <li key={software.id} className="software-card">
            <h3>{software.name}</h3>
            <p>{software.description}</p>
            <p><strong>Access Levels:</strong> {software.accessLevels.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoftwareList;
