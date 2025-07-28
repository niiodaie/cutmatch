import { useState } from "react";
import { mockRecommendations } from "../lib/mockRecommendations";
import RecommendationCard from "../components/RecommendationCard";

const Recommend = () => {
  const [photo, setPhoto] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setRecommendations(mockRecommendations);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Find Your Perfect Hairstyle</h2>

      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />

      {photo && <img src={photo} alt="Preview" className="mb-4 rounded-md w-full max-h-80 object-cover" />}

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mb-6"
      >
        Get Recommendations
      </button>

      {recommendations.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Suggested Hairstyles:</h3>
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} {...rec} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommend;
