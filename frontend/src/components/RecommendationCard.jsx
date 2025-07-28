const RecommendationCard = ({ name, description, emoji }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
    <h3 className="text-lg font-semibold">{emoji} {name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default RecommendationCard;
