import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ tourId, onReviewAdded }) {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/reviews/${tourId}`, { user, rating, comment });
      setUser(""); setComment(""); setRating(5);
      onReviewAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Your Name" required />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
