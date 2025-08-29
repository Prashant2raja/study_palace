import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* --- Welcome Banner Section --- */}
      <div className="welcome-banner">
        <div className="welcome-overlay"></div>
        <div className="welcome-content">
          <img src="src/assets/p3.png" alt="Left Icon" className="side-icon moving-image glowing-logo" />
          <div>
            <h1 className="dashboard-heading">Welcome to BUDHA LIBRARY</h1>
            <p className="dashboard-paragraph">
              A serene space for you to manage your resources and expand your knowledge.
            </p>
          </div>
          <img src="src/assets/p2.png" alt="Right Icon" className="side-icon moving-image glowing-logo" />
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="content-container">

        {/* --- Important Notification --- */}
        <div className="notification-card animate-on-load">
          <div className="notification-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="notification-text">
            <h3>Important Notice</h3>
            <p>Batch movement is only allowed within 7 days after payment.</p>
          </div>
        </div>

        {/* --- Interactive Earth Element --- */}
        <div className="interactive-section">
          <div className="earth-container animate-on-load">
            <div className="earth"></div>
            <div className="moon"></div>
          </div>
        </div>
        
        {/* --- Hindi Content Section --- */}
        <div className="hindi-content-section animate-on-load">
          <h2 className="hindi-text">
            भारत एक विशाल और विविधताओं से भरा हुआ देश है, जहाँ अनेक भाषाएँ, संस्कृतियाँ और धर्म पाए जाते हैं।
          </h2>
          <h2 className="hindi-text">
            स्वतंत्रता दिवस हर वर्ष 15 अगस्त को मनाया जाता है, इस दिन 1947 में भारत को ब्रिटिश शासन से आज़ादी मिली थी।
          </h2>
          <h2 className="hindi-text">
            महात्मा गांधी को 'राष्ट्रपिता' कहा जाता है, उन्होंने सत्य और अहिंसा के मार्ग पर चलकर भारत को आज़ादी दिलाई।
          </h2>
          <h2 className="hindi-text">
            ताजमहल एक विश्व प्रसिद्ध स्मारक है, जिसे शाहजहाँ ने अपनी पत्नी मुमताज़ की याद में बनवाया था।
          </h2>
          <h2 className="hindi-text">
            हिंदी भाषा भारत में सबसे अधिक बोली जाने वाली भाषा है और इसे राजभाषा का दर्जा प्राप्त है।
          </h2>
          <h2 className="hindi-text">
            पृथ्वी सूर्य के चारों ओर एक वर्ष में एक बार पूरी तरह से घूमती है, जिससे ऋतुओं का परिवर्तन होता है।
          </h2>
          <h2 className="hindi-text">
            स्वच्छ जल मनुष्य के जीवन के लिए अत्यंत आवश्यक है, इसलिए हमें जल को व्यर्थ नहीं बहाना चाहिए।
          </h2>
          <h2 className="hindi-text">
            वृक्ष हमें ऑक्सीजन, फल, छाया और लकड़ी प्रदान करते हैं, इसलिए हमें अधिक से अधिक पेड़ लगाने चाहिए।
          </h2>
          <h2 className="hindi-text">
            शिक्षा का अधिकार भारत के हर बच्चे को प्राप्त है, यह उन्हें एक बेहतर भविष्य की ओर ले जाता है।
          </h2>
          <h2 className="hindi-text">
            समय अनमोल है, इसका सही उपयोग करके ही हम अपने जीवन में सफलता प्राप्त कर सकते हैं।
          </h2>
        </div>

      </div>

      {/* --- Footer --- */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 BUDHA LIBRARY. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
