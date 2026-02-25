// utils/getEmojiIcon.js
export default function getEmojiIcon(category) {
  const emojiMap = {
    "stalking": "🧍‍♀️",
    "verbal-abuse": "🙅‍♀️",
    "suspicious-activity": "🕵️‍♀️",
    "sexual-harassment": "🚫",
    "domestic-violence": "💢",
    "physical-assault": "😟",
    "cyber-harassment": "📵",
  };
  return emojiMap[category] || "❓";
}
