import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/chatApi';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 Welcome to our Pandit Booking Service. I can help you find the right pooja for your needs. What brings you here today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputValue);
      
      const botMessage = {
        id: messages.length + 2,
        text: response.reply,
        sender: 'bot',
        timestamp: new Date(),
        pooja: response.pooja,
        pandits: response.pandits,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {/* Floating Button */}
      <button
        className={`chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        title="Chat with us"
      >
        <span className="chat-icon">💬</span>
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <h3>Pandit Assistant</h3>
              <p className="status">Online</p>
            </div>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  
                  {/* Show Pandits if available */}
                  {message.pandits && message.pandits.length > 0 && (
                    <div className="pandits-list">
                      <p className="pandits-title">Recommended Pandits:</p>
                      {message.pandits.map((pandit, idx) => (
                        <div key={idx} className="pandit-item">
                          <p className="pandit-name">{pandit.name}</p>
                          <p className="pandit-detail">₹{pandit.price} • {pandit.experience} years</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <textarea
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about pooja, pandits, prices..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="send-button"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
