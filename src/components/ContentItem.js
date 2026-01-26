import React, { useState } from "react";

// ContentItem is a reusable component that renders different UI
// based on the `item.type` value passed as a prop
const ContentItem = ({ item }) => {
  // State to control whether "tap-to-reveal" content is shown
  const [revealed, setRevealed] = useState(false);

  // Toggles the revealed state when the user taps/clicks
  const handleTap = () => setRevealed(!revealed);

  // Render animation or video content
  if (item.type === "animation" || item.type === "video") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        {/* Content title */}
        <h4 className="font-bold">{item.title}</h4>

        {/* Show image if content type is animation */}
        {item.type === "animation" && (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-auto mt-2"
          />
        )}

        {/* Show video player if content type is video */}
        {item.type === "video" && (
          <video
            src={item.src}
            controls
            className="w-full h-auto mt-2 rounded-xl"
          />
        )}

        {/* Content description */}
        <p className="text-sm mt-2">{item.description}</p>
      </div>
    );
  }

  // Render tap-to-reveal interactive content
  if (item.type === "tap") {
    return (
      <div
        className="bg-white rounded-xl shadow p-4 mb-4 cursor-pointer"
        onClick={handleTap}
      >
        {/* Content title */}
        <h4 className="font-bold">{item.title}</h4>

        {/* Show description only after user taps */}
        {revealed && <p className="text-sm mt-2">{item.description}</p>}

        {/* Placeholder text before content is revealed */}
        {!revealed && (
          <p className="text-sm mt-2 text-gray-400">Tap to reveal!</p>
        )}
      </div>
    );
  }

  // Render quiz-style content
  if (item.type === "quiz") {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        {/* Quiz title */}
        <h4 className="font-bold">{item.title}</h4>

        {/* Loop through quiz questions */}
        {item.questions.map((q, idx) => (
          <div key={idx} className="mt-2">
            {/* Question text */}
            <p className="font-semibold">{q.q}</p>

            {/* Answer options */}
            <div className="flex flex-col gap-1 mt-1">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className="bg-gray-100 rounded p-2 hover:bg-gray-200 text-left"
                  // Simple correctness check using index comparison
                  onClick={() =>
                    alert(i === q.answer ? "✅ Correct!" : "❌ Try again")
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback if item.type does not match any known type
  return null;
};

export default ContentItem;
