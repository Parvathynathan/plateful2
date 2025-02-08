import { useState, useEffect } from 'react';

export default function useAuth() {
  // Mocking a user for UI testing
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate a logged-in user
    const mockUser = {
      uid: '12345',
      email: 'testuser@example.com',
      displayName: 'Test User',
    };

    // Set the mock user after a delay (optional)
    const timer = setTimeout(() => {
      setUser(mockUser); // Set null here to simulate logged-out state
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { user };
}
