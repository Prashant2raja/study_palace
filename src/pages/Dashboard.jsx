import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="background-image">
        {/* Heading with left and right images */}
        <div className="dashboard-heading-with-images">
          <img src="src/assets/p3.png" alt="Left Icon" className="side-icon glowing-logo moving-image glowing-logo" />
          <h1 className="dashboard-heading">BUDHA LIBRARY</h1>
          <img src="src/assets/p2.png" alt="Right Icon" className="side-icon glowing-logo moving-image" />
        </div>

        <p className="dashboard-paragraph">
          Welcome to your BUDHA LIBRARY. Here you can manage your application.
        </p>
      </div>

      <div className="content-container">
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

      {/* Glowing Image and Animated Image
      <div className="image-container">
        <img src="src/assets/p3.png" alt="BUDHA LIBRARY Logo" className="glowing-logo" />
        <img src="src/assets/p2.png" alt="Watermark" className="moving-image" />
      </div> */}
    </div>
  );
}

export default Dashboard;
