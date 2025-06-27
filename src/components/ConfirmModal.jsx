"use client";

import { X } from "@phosphor-icons/react";

export default function ConfirmModal({
  menus,
  totalPrice,
  onConfirm,
  onCancel,
}) {
  const formatMenus = () => {
    const result = {};
    Object.entries(menus).forEach(([key, value]) => {
      const [date, time] = key.split("-");
      const dayTime = key.slice(date.length + 1);
      if (!result[date]) result[date] = {};
      result[date][dayTime] = Object.entries(value).map(
        ([type, item]) => `${type}: ${item}`
      );
    });
    return result;
  };

  const displayMenus = formatMenus();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-50 bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Konfirmasi Menu</h2>
        <p className="text-lg font-semibold text-center mt-4">
          💰 Total Price: Rp{totalPrice.toLocaleString()}
        </p>

        {Object.keys(displayMenus).length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
            Tidak ada menu yang dipilih.
          </p>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {Object.entries(displayMenus).map(([date, meals]) => (
              <div key={date}>
                <p className="font-semibold">{date}</p>
                <ul className="ml-4 text-sm text-gray-700 list-disc">
                  {Object.entries(meals).map(([time, items]) => (
                    <li key={time} className="mt-1">
                      <span className="font-medium">{time}: </span>
                      {items.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="mb-4 font-medium">Are you sure you want to submit?</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
            >
              Yes, Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
