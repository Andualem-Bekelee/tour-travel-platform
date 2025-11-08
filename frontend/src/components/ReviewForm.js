// src/components/ReviewForm.js
import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ tourId, onReviewAdded }) {
  const [review, setReview] = useState({ user: "", rating: 5, comment: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/reviews`, {
        tourId,
        ...review,
      });
      alert("✅ Review submitted!");
      setReview({ user: "", rating: 5, comment: "" });
      if (onReviewAdded) onReviewAdded(); // refresh reviews
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>Submit a Review</h3>
      <input
        name="user"
        placeholder="Your Name"
        value={review.user}
        onChange={handleChange}
        required
      />
      <select name="rating" value={review.rating} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
        ))}
      </select>
      <textarea
        name="comment"
        placeholder="Write your review..."
        value={review.comment}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
