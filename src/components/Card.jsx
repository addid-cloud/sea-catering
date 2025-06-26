// Card.jsx
"use client";
import Image from "next/image";

export default function Card({
  meal,
  handleMenuSelect,
  selectedDateForMenu,
  mealTime,
  selected,
  showButton = true,
  onClick,
  onDetail,
}) {
  const { name, type, image, protein, carbs, fat } = meal;

  const calProtein = protein * 4;
  const calCarbs = carbs * 4;
  const calFat = fat * 9;
  const totalCal = calProtein + calCarbs + calFat || 0;

  const percentProtein = Math.round((calProtein / (totalCal || 1)) * 100);
  const percentCarbs = Math.round((calCarbs / (totalCal || 1)) * 100);
  const percentFat = Math.round((calFat / (totalCal || 1)) * 100);

  const handleClick = () => {
    if (onClick) return onClick();
    if (typeof onDetail === "function") return onDetail(); // TAMBAHKAN INI

    if (!selectedDateForMenu || !mealTime) return;
    handleMenuSelect(selectedDateForMenu.dateStr, mealTime, meal); // untuk form plan
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow hover:shadow-lg overflow-hidden border">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={name}
          width={400}
          height={250}
          className="h-60 w-60 mx-auto object-cover border rounded mt-4"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 capitalize mb-2">{type}</p>

        <p className="text-sm text-gray-700 font-medium mb-4">
          Total Calories: <span className="text-black">{totalCal} kcal</span>
        </p>

        {/* bar progress */}
        <div className="space-y-3 mb-4">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Protein</span>
              <span>{percentProtein}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${percentProtein}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Carbs</span>
              <span>{percentCarbs}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${percentCarbs}%` }}
              />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Fat</span>
              <span>{percentFat}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{ width: `${percentFat}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        {(showButton || onClick) && (
          <button
            type="button"
            onClick={handleClick}
            className={`w-full ${
              selected ? "bg-green-600" : "bg-accent hover:bg-accent/90"
            } font-bold text-white py-2 rounded-lg text-sm`}
          >
            {selected
              ? "Selected"
              : onDetail
              ? "See Detail"
              : `Add to ${mealTime}`}
          </button>
        )}
      </div>
    </div>
  );
}
