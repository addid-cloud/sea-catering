"use client";
import { ListBulletsIcon, X } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

export default function SelectedMenuSummary({ selectedMenusByDate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <ListBulletsIcon className="w-6 h-6" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          <div className="absolute bottom-20 left-4 animate-slide-in w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-xl z-50">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Ringkasan Menu
            </h2>

            {Object.keys(selectedMenusByDate).length === 0 ? (
              <p className="text-center text-gray-500">
                Belum ada menu dipilih.
              </p>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {Object.entries(selectedMenusByDate).map(
                  ([date, mealTimes]) => (
                    <div
                      key={date}
                      className="border rounded-lg p-3 bg-gray-50"
                    >
                      <h3 className="text-sm font-semibold text-accent mb-1">
                        {date}
                      </h3>
                      <div className="text-sm space-y-1">
                        {Object.entries(mealTimes).map(([mealTime, items]) => (
                          <div key={mealTime}>
                            <p className="font-medium text-gray-800">
                              {mealTime}
                            </p>
                            <ul className="list-disc list-inside text-gray-600">
                              {Object.entries(items).map(([type, name]) => (
                                <li key={type}>
                                  {type}:{" "}
                                  <span className="font-medium">{name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
