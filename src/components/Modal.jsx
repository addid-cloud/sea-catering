import Image from "next/image";

export default function Modal({ meal, onClose }) {
  if (!meal) return null;

  const { name, type, image, protein, carbs, fat, description } = meal;

  const calProtein = protein * 4;
  const calCarbs = carbs * 4;
  const calFat = fat * 9;
  const totalCal = calProtein + calCarbs + calFat;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      <div className="relative z-10 bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="rounded overflow-hidden mb-4">
          <Image
            src={image || "/images/placeholder.jpg"}
            alt={name}
            width={400}
            height={250}
            className="rounded w-full h-60 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <p className="text-sm text-gray-600 capitalize mb-3">{type}</p>
        <p className="text-gray-700 mb-4">{description || "No description."}</p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>🔥 Calories:</strong> {totalCal} kcal
          </p>
          <p>
            <strong>🍗 Protein:</strong> {protein}g
          </p>
          <p>
            <strong>🥔 Carbs:</strong> {carbs}g
          </p>
          <p>
            <strong>🧈 Fat:</strong> {fat}g
          </p>
        </div>
      </div>
    </div>
  );
}
