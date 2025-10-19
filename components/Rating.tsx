'use client';

import { FC } from 'react';

interface RatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const Rating: FC<RatingProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <span className="text-sm font-medium w-40 text-navy">{label}</span>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <label
            key={rating}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-xs font-semibold text-navy">{rating}</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={value === rating}
                onChange={() => onChange(rating)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 border-2 border-navy flex items-center justify-center transition-colors ${
                  value === rating
                    ? 'bg-navy'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {value === rating && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
