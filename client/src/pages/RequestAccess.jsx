import { useState, useEffect } from 'react';
import api from '../services/api';
import './RequestAccess.css'; // Import the CSS

function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [form, setForm] = useState({ softwareId: '', accessType: 'Read', reason: '' });

  useEffect(() => {
    api.get('/software').then(res => setSoftwareList(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/requests', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Request submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="request-access-form">
      <select name="softwareId" onChange={handleChange} required>
        <option value="">Select software</option>
        {softwareList.map((s) => (
          <option value={s.id} key={s.id}>{s.name}</option>
        ))}
      </select>

      <select name="accessType" onChange={handleChange} required>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>

      <textarea
        name="reason"
        onChange={handleChange}
        placeholder="Reason"
        required
      />

      <button type="submit">Submit Request</button>
    </form>
  );
}

export default RequestAccess;
