import React, { useEffect, useState } from "react";
import axios from "axios";

const Medicines = ({ userId }) => {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/medicines/${userId}`
        );
        setMedicine(res.data);
      } catch (err) {
        console.error("Error fetching medicine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!medicine) return <p>No medicines found.</p>;

  return (
    <div>
      <h2>Next Medicine</h2>
      <p>
        <strong>Name:</strong> {medicine.name}
      </p>
      <p>
        <strong>Dosage:</strong> {medicine.dosage}
      </p>
      <p>
        <strong>Time:</strong> {new Date(medicine.time).toLocaleString()}
      </p>
      <p>
        <strong>Notes:</strong> {medicine.notes}
      </p>
    </div>
  );
};

export default Medicines;
