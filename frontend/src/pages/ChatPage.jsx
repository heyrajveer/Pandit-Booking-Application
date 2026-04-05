import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/chatApi';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 Namaste! Welcome to our Pandit Booking Assistant. I'm here to help you find the right pooja for your needs.\n\nYou can ask me about:\n• Poojas for different life situations\n• When and why to perform specific poojas\n• Pandit availability and pricing\n• Recommendations based on your needs",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick suggestion buttons
  const suggestions = [
    'I need help for a job promotion',
    'Suggest a pooja for good health',
    'Marriage planning guidance',
    'Money and prosperity pooja',
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage(text);
      
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
        text: '❌ Sorry, there was an error processing your request. Please try again.',
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

  const handleSuggestion = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div style={{marginTop:'70px'}}>
    <div className="chat-page">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-page-header">
          <div className="header-content">
            <h1>🧘 Pandit Assistant</h1>
            <p>Your guide to the perfect pooja</p>
          </div>
          <div className="header-icon">📿</div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {/* Messages */}
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message-wrapper ${message.sender}`}>
                <div className={`message ${message.sender}`}>
                  {message.sender === 'bot' && <div className="avatar">🤖</div>}
                  
                  <div className="message-content">
                    <div className="message-bubble">
                      <p className="message-text">{message.text}</p>
                      
                      {/* Show Pandits if available */}
                      {message.pandits && message.pandits.length > 0 && (
                        <div className="pandits-section">
                          <h4 className="section-title">✨ Recommended Pandits</h4>
                          <div className="pandits-grid">
                            {message.pandits.map((pandit, idx) => (
                              <div key={idx} className="pandit-card">
                                {pandit.profileImage && (
                                  <img src={pandit.profileImage} alt={pandit.name} />
                                )}
                                <h5>{pandit.name}</h5>
                                <p className="experience">⭐ {pandit.experience} years experience</p>
                                <p className="price">₹{pandit.price}</p>
                                <button className="view-btn">View Profile</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="timestamp">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  {message.sender === 'user' && <div className="avatar">👤</div>}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-wrapper bot">
                <div className="message bot">
                  <div className="avatar">🤖</div>
                  <div className="message-content">
                    <div className="message-bubble">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="suggestions">
              <p className="suggestions-title">Quick Suggestions:</p>
              <div className="suggestions-grid">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-btn"
                    onClick={() => handleSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about poojas, pandits, prices, or any guidance you need..."
              disabled={isLoading}
              className="chat-input-field"
              rows="3"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="send-btn"
              title="Send message"
            >
              <span>Send</span>
              <span className="send-icon">→</span>
            </button>
          </div>
          <p className="input-hint">💡 Tip: You can ask about specific life situations or poojas</p>
        </div>
      </div>

      {/* Sidebar - Info */}
      <div className="sidebar">
        <div className="sidebar-section">
          <h3>📚 Categories</h3>
          <ul>
            <li>🎯 Career & Success</li>
            <li>❤️ Health & Wellness</li>
            <li>💑 Marriage & Family</li>
            <li>💰 Wealth & Prosperity</li>
            <li>☮️ Peace & Spirituality</li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>⏰ Hours</h3>
          <p>Available 24/7</p>
          <p className="small-text">Our team responds instantly</p>
        </div>

        <div className="sidebar-section">
          <h3>📞 Need Help?</h3>
          <p className="small-text">Contact our support team for bookings and inquiries</p>
          <button className="contact-btn" onClick={()=>navigate('/contact')}>
            Contact Us
          </button>
        </div>

        <div className="sidebar-section faq">
          <h3>❓ FAQ</h3>
          <details>
            <summary>How to book a pandit?</summary>
            <p>Chat with me to get recommendations, then book directly through our platform.</p>
          </details>
          <details>
            <summary>What are the prices?</summary>
            <p>Prices vary by pooja type and location. Average range: ₹1500–₹15000</p>
          </details>
          <details>
            <summary>Emergency bookings available?</summary>
            <p>Yes! We offer same-day bookings for emergencies. Chat for details.</p>
          </details>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatPage;
