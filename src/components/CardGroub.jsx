"use client";
import { useState } from "react";
import Card from "./Card";
import Modal from "./Modal";

export default function CardGroup({ menuSelection }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {menuSelection.map((meal, index) => (
          <Card
            key={meal.name + index}
            meal={meal}
            showButton={true}
            onDetail={() => setSelectedMeal(meal)}
          />
        ))}
      </div>

      {selectedMeal && (
        <Modal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </>
  );
}
