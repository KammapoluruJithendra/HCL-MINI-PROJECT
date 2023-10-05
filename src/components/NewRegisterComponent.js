import React, { useState, useEffect } from 'react';

const NewRegisterAccount = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  useEffect(() => {
    if (formData.username.trim() !== '') {
      checkUsernameAvailability(formData.username);
    }
  }, [formData.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`/checkUsernameAvailability?username=${username}`);

      if (response.status === 200) {
        setIsUsernameTaken(false);
      } else if (response.status === 409) {
        setIsUsernameTaken(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:2000/postuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log('User created successfully.');
        // You can perform additional actions here, such as redirecting the user or showing a success message.
      } else {
        console.error('Error creating user.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {isUsernameTaken && (
            <p style={{ color: 'red' }}>Username already taken. Please choose a different username.</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isUsernameTaken}>
          Create User
        </button>
      </form>
    </div>
  );
};

export default NewRegisterAccount;
