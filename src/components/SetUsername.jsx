import React, { useState, useEffect } from "react";
import { handleSetUsername, checkUsername } from "../api/endpoints";
import { useAuth } from "../contexts/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SetUsername = () => {
  const [username, setUsername] = useState("");
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const { google_login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!username.trim()) {
      setMessage("");
      setIsAvailable(false);
      return;
    }

    setLoading(true);
    setMessage("");

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      try {
        const response = await checkUsername(username);
        if (response.available) {
          setMessage("Username available");
          setIsAvailable(true);
        } else {
          setMessage("Username already taken");
          setIsAvailable(false);
        }
      } catch (err) {
        setMessage("Error checking username");
        setIsAvailable(false);
      } finally {
        setLoading(false);
      }
    }, 2000);

    setTypingTimeout(timeout);
  }, [username]);

  const handleSubmit = async () => {
    if (!isAvailable) return;
    try {
      const data = await handleSetUsername(state.email, username);
      if (data.success) {
        google_login(data, navigate);
        return;
      } else if (data.error) {
        console.log(data.error);
        return;
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      return;
    }
  };

  return (
    <div>
      <div>
        <h3>Set Your Username</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {loading && <p>Checking availability...</p>}
        {message && <p className="error">{message}</p>}
        <button onClick={handleSubmit} disabled={!isAvailable}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SetUsername;
