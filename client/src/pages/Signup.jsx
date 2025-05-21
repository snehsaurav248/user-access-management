import { useState } from 'react';
import api from '../services/api';
import './Signup.css'; // 👈 Import the CSS

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('Signup successful. Please login.');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
