import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch tours.");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const deleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      setTours(tours.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete tour.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.title}</td>
              <td>{tour.category}</td>
              <td>{tour.price}</td>
              <td>
                <button style={{ marginRight: 10 }}>Edit</button>
                <button onClick={() => deleteTour(tour._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
