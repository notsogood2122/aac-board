import React, { useState } from "react";
import { Volume2, ArrowLeft, RotateCcw, RotateCw, Trash2 } from "lucide-react";

const AACSolar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [textBoxContent, setTextBoxContent] = useState("");
  const [clickedItems, setClickedItems] = useState([]);

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const categories = {
    communication: {
      name: "Communication",
      categoryImage: "/images/communication.jpg",
      items: [
        { label: "Hello", icon: "/images/hello.png", audio: "hello.mp3" },
        { label: "Good Morning", icon: "/images/Goodmorning.png", audio: "goodmorning.mp3" },
        { label: "Good Evening", icon: "/images/Goodevening.png", audio: "goodevening.mp3" },
        { label: "Help", icon: "/images/help.png", audio: "help.mp3" },
        { label: "Thank You", icon: "/images/thank-you.png", audio: "thank-you.mp3" },
      ],
    },
    school: {
      name: "School",
      categoryImage: "/images/school.jpg",
      items: [
        { label: "Numbers", icon: "/images/numbers.png", audio: "numbers.mp3" },
        { label: "Reading", icon: "/images/reading.png", audio: "reading.mp3" },
        { label: "Writing", icon: "/images/writing.png", audio: "writing.mp3" },
        { label: "Pencil", icon: "/images/pencil.png", audio: "pencil.mp3" },
        { label: "Paper", icon: "/images/paper.png", audio: "paper.mp3" },
      ],
    },
    house: {
      name: "House",
      categoryImage: "/images/house.jpg",
      items: [
        { label: "Toothbrush", icon: "/images/toothbrush.png", audio: "toothbrush.mp3" },
        { label: "Bedroom", icon: "/images/bedroom.png", audio: "bedroom.mp3" },
        { label: "Bathroom", icon: "/images/bathroom.png", audio: "bathroom.mp3" },
        { label: "Chair", icon: "/images/chair.png", audio: "chair.mp3" },
        { label: "Desk", icon: "/images/desk.png", audio: "desk.mp3" },
      ],
    },
  };

  // ✅ Play audio sequentially based on clicked icons (not split by spaces)
  const playFullAudio = async () => {
    if (!clickedItems.length) return;

    for (const item of clickedItems) {
      await new Promise((resolve) => {
        const audio = new Audio(`/audio/${item.audio}`);
        audio.play();
        audio.onended = resolve;
      });
    }
  };

  const playAudio = (fileName) => {
    const audio = new Audio(`/audio/${fileName}`);
    audio.play();
  };

  const handleIconClick = (item) => {
    setHistory([...history, { text: textBoxContent, items: clickedItems }]);
    setFuture([]);

    setClickedItems((prev) => [...prev, item]);
    setTextBoxContent((prev) => (prev ? `${prev} ${item.label}` : item.label));

    playAudio(item.audio);
  };

  const deleteAll = () => {
    setHistory([...history, { text: textBoxContent, items: clickedItems }]);
    setTextBoxContent("");
    setClickedItems([]);
    setFuture([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];

    setFuture([{ text: textBoxContent, items: clickedItems }, ...future]);
    setTextBoxContent(prev.text);
    setClickedItems(prev.items);

    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];

    setHistory([...history, { text: textBoxContent, items: clickedItems }]);
    setTextBoxContent(next.text);
    setClickedItems(next.items);

    setFuture(future.slice(1));
  };

  const handleCategorySelect = (categoryKey) => {
    setTextBoxContent("");
    setClickedItems([]);
    setHistory([]);
    setFuture([]);
    setSelectedCategory(categoryKey);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#d9e8f5,#b3d4f0)",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "50px", fontWeight: "bold", color: "#1A365D" }}>
            AAC Communication Board
          </h1>
          <p style={{ fontSize: "20px", color: "#2D3748" }}>
            Tap icons to build sentences and speak them aloud
          </p>
        </div>

        {selectedCategory === null ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "32px",
            }}
          >
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                style={{
                  borderRadius: "18px",
                  padding: 0,
                  border: "none",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${category.categoryImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "20px", backgroundColor: "white", textAlign: "center" }}>
                  <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>{category.name}</h2>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                padding: "12px 16px",
                backgroundColor: "#2B6CB0",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <ArrowLeft /> Back to Categories
            </button>

            <h2 style={{ textAlign: "center", fontSize: "40px", marginBottom: "40px" }}>
              {categories[selectedCategory].name}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                gap: "24px",
                marginBottom: "36px",
              }}
            >
              {categories[selectedCategory].items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleIconClick(item)}
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    padding: 0,
                    border: "3px solid transparent",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      height: "120px",
                      backgroundImage: `url(${item.icon})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                  <div style={{ padding: "12px", textAlign: "center", backgroundColor: "#EDF2F7" }}>
                    <p style={{ fontWeight: "bold" }}>{item.label}</p>
                  </div>
                </button>
              ))}
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "18px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <textarea
                value={textBoxContent}
                readOnly
                style={{
                  width: "100%",
                  height: "140px",
                  border: "none",
                  resize: "none",
                  outline: "none",
                  fontSize: "22px",
                  padding: "10px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                marginTop: "18px",
              }}
            >
              <button className="control-btn" onClick={undo}>
                <RotateCcw /> Undo
              </button>
              <button className="control-btn" onClick={redo}>
                <RotateCw /> Redo
              </button>
              <button className="control-btn" onClick={deleteAll}>
                <Trash2 /> Delete All
              </button>
              <button className="control-btn" onClick={playFullAudio}>
                <Volume2 style={{ width: "26px", height: "26px" }} />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .control-btn {
          background-color: #2B6CB0;
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform .15s ease, background-color .3s ease;
        }
        .control-btn:hover {
          background-color: #1A4F8A;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default AACSolar;
