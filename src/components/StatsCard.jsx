import React from 'react';

export const StatsCard = ({ title, value, description, color = 'blue' }) => {
  return (
    <div className={`bg-${color}-50 border border-${color}-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-md`}>
      <p className={`text-${color}-600 font-bold text-3xl`}>{value}</p>
      <h3 className="text-dark font-semibold text-lg mt-2">{title}</h3>
      {description && <p className="text-dark/70 text-sm mt-1 text-center">{description}</p>}
    </div>
  );
};

export default StatsCard;