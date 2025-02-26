import React, { useState, useEffect } from "react";
import { fetchThreadMessages, getOrCreateThread } from "../api/endpoints";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import defaultProfileImage from "/static/images/default_profile.jpeg";

const ChatRoom = () => {
  const { userData } = useAuth();

  let myProfileImg = defaultProfileImage;
  if (userData.profile_image) {
    myProfileImg = userData.profile_image;
  }
  const [currentUser, setCurrentUser] = useState(userData.username);
  const { username } = useParams();
  const [threadID, setThreadID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  //Get the thread id
  useEffect(() => {
    const getThreadID = async () => {
      setLoading(true);
      try {
        const data = await getOrCreateThread(username);
        if (data.error) {
          alert(data.error);
        } else {
          setThreadID(data.id);
          console.log("Fetched thread id!");
        }
      } catch {
        console.log("Error fetching conversation:");
      } finally {
        setLoading(false);
      }
    };
    getThreadID();
  }, [username]);

  //Fetch messages using thread id
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchThreadMessages(threadID);
        setMessagesList(data.chat_messages_list);
      } catch {
        console.error("Error fetching messages");
      }
    };
    if (threadID !== null) {
      loadMessages();
    }
  }, [threadID]);

  useEffect(() => {
    if (threadID !== null) {
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${threadID}/`);
      socket.onopen = () => {
        console.log("WebSocket connected");
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!data.type) {
          setMessagesList((messagesList) => [...messagesList, data]);
        }
        if (data.username === currentUser) {
          setSendMessageLoading(false);
        }
      };
      socket.onerror = (error) => {
        console.error("WebSocket error", error);
      };
      socket.onclose = () => {
        if (sendMessageLoading) {
          alert("Connection lost! Please refresh");
          setSendMessageLoading(false);
        }
        console.log("WebSocket closed");
      };
      setWs(socket);
      return () => {
        socket.close();
      };
    }
  }, [threadID]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!message) {
      alert("Message cannot be empty");
      return;
    }
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert("Error sending message. Try refreshing page");
      return;
    }
    setSendMessageLoading(true);
    // Construct message payload
    const payload = {
      message,
      sent_by: currentUser,
      send_to: username,
    };
    try {
      ws.send(JSON.stringify(payload));
    } catch {
      console.log("Error sending message");
      setSendMessageLoading(false);
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card iq-border-radius-20">
          <div className="card-body">
            <input type="hidden" id="logged-in-user" value="1" />

            <div className="row">
              <div
                className="messages-wrapper hide is_active"
                chat-id="chat_1"
                other-user-id="2"
                style={{ height: "fit-content" }}
              >
                <a className="d-flex align-items-center mb-4" href="#">
                  <div className="iq-profile-avatar status-online">
                    <img
                      className="rounded-circle avatar-50"
                      src={defaultProfileImage}
                      alt=""
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">{username}</h6>
                  </div>
                </a>

                {loading ? (
                  <p>Loading conversation...</p>
                ) : (
                  <div className="card-body msg_card_body">
                    {messagesList && messagesList.length > 0 ? (
                      messagesList.map((msg, index) => (
                        <div
                          key={index}
                          className={
                            msg.username === currentUser
                              ? "d-flex mb-4 replied"
                              : "d-flex mb-4 received"
                          }
                        >
                          <div className="img_cont_msg">
                            <img
                              src={
                                msg.username === currentUser
                                  ? myProfileImg
                                  : defaultProfileImage
                              }
                              className="rounded-circle user_img_msg"
                            />
                          </div>
                          <div className="msg_cotainer">{msg.message}</div>
                        </div>
                      ))
                    ) : (
                      <p>Start a conversation</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="email-form" id="send-message-form">
              <div className="form-group row justify-content-end">
                <div className="col-md-10">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    id="input-message"
                    className="form-control"
                    placeholder="Enter message to send"
                  />
                </div>
              </div>
              <div className="form-group d-flex flex-wrap align-items-center justify-content-end mb-0">
                <div className="send-btn pl-3 mb-2">
                  <button
                    onClick={sendMessage}
                    type="button"
                    className="btn btn-primary"
                  >
                    {sendMessageLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
