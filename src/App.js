import React, { useState } from 'react';
import { Volume2, MessageCircle, Book, Home, ArrowLeft } from 'lucide-react';

const AACSolar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [spokenText, setSpokenText] = useState('');

  const categories = {
    communication: {
      name: 'Communication',
      categoryImage: '/images/communication.jpg',
      items: [
        { label: 'Hello', audioFile: '/audio/hello.mp3', icon: '/images/hello.png' },
        { label: 'Goodmorning', audioFile: '/audio/Goodmorning.mp3', icon: '/images/Goodmorning.png' },
        { label: 'Goodevening', audioFile: '/audio/Goodevening.mp3', icon: '/images/Goodevening.png' },
        { label: 'Help', audioFile: '/audio/help.mp3', icon: '/images/help.png' },
        { label: 'Thank You', audioFile: '/audio/thank-you.mp3', icon: '/images/thank-you.png' }
      ]
    },
    school: {
      name: 'School',
      categoryImage: '/images/school.jpg',
      items: [
        { label: 'Numbers', audioFile: '/audio/numbers.mp3', icon: '/images/numbers.png' },
        { label: 'Reading', audioFile: '/audio/reading.mp3', icon: '/images/reading.png' },
        { label: 'Writing', audioFile: '/audio/writing.mp3', icon: '/images/writing.png' },
        { label: 'Pencil', audioFile: '/audio/pencil.mp3', icon: '/images/pencil.png' },
        { label: 'Paper', audioFile: '/audio/paper.mp3', icon: '/images/paper.png' }
      ]
    },
    house: {
      name: 'House',
      categoryImage: '/images/house.jpg',
      items: [
        { label: 'Tootbrush', audioFile: '/audio/tootbrush.mp3', icon: '/images/toothbrush.png' },
        { label: 'Bedroom', audioFile: '/audio/bedroom.mp3', icon: '/images/bedroom.png' },
        { label: 'Bathroom', audioFile: '/audio/bathroom.mp3', icon: '/images/bathroom.png' },
        { label: 'Chair', audioFile: '/audio/chair.mp3', icon: '/images/chair.png' },
        { label: 'Desk', audioFile: '/audio/desk.mp3', icon: '/images/desk.png' }
      ]
    }
  };

  // Function to play audio file
  const playAudio = (audioFile, label) => {
    const audio = new Audio(audioFile);
    audio.play().catch((error) => {
      console.log('Audio file not found:', error);
      alert(`Audio file missing for "${label}". Please add: ${audioFile}`);
    });
    setSpokenText(label);
  };

  const handleIconClick = (label, audioFile) => {
    playAudio(audioFile, label);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f4f8, #d9e8f5)',
      padding: '32px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
             AAC Communication Board
          </h1>
          <p style={{ fontSize: '18px', color: '#4a5568' }}>
            Click on a category to start communicating
          </p>
        </div>

        {/* Conditional Rendering */}
        {selectedCategory === null ? (
          // Category Selection Screen
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Category Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundImage: `url(${category.categoryImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#e2e8f0'
                }} />
                
                {/* Category Name */}
                <div style={{
                  padding: '24px 16px',
                  textAlign: 'center'
                }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
                    {category.name}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#718096', marginTop: '8px', margin: '8px 0 0 0' }}>
                    Click to select
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Icon Selection Screen
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '32px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                backgroundColor: '#2d3748',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1a202c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2d3748'}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
              Back to Categories
            </button>

            {/* Category Title */}
            <h2 style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              {categories[selectedCategory].name}
            </h2>

            {/* Grid of 5 Icons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {categories[selectedCategory].items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleIconClick(item.label, item.audioFile)}
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid transparent',
                    borderRadius: '16px',
                    padding: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                >
                  {/* Icon Image */}
                  <div style={{
                    width: '100%',
                    height: '120px',
                    backgroundImage: `url(${item.icon})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#f7fafc'
                  }} />
                  
                  {/* Label */}
                  <div style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    backgroundColor: '#fff'
                  }}>
                    <p style={{ textAlign: 'center', color: '#2d3748', margin: '0', fontSize: '14px' }}>
                      {item.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Display what was spoken */}
            {spokenText && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderLeft: '4px solid #3b82f6',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Volume2 style={{ width: '24px', height: '24px', color: '#3b82f6', flexShrink: 0 }} />
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
                    Last spoken: <span style={{ color: '#2563eb', fontSize: '20px' }}>{spokenText}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AACSolar;