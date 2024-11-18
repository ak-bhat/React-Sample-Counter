import React, { useState, useEffect } from 'react';

function CounterApp() {
  // Step 1: Define states for count, user data, and API states
  const [count, setCount] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 2: Fetch user data whenever `count` changes
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${count}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data for ID ${count}.`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [count]);

  // Step 3: Functions to handle increment and decrement
  const increment = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 10)); // Limit max ID to 10
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1)); // Minimum ID is 1
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Enhanced Counter App</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment} style={{ marginRight: '10px', padding: '10px 20px' }}>
        Increment
      </button>
      <button onClick={decrement} style={{ padding: '10px 20px' }}>
        Decrement
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3>User Information</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {userData && (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Website:</strong> {userData.website}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CounterApp;
