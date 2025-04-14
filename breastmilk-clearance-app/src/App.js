
import { useState } from "react";

export default function BreastmilkClearanceApp() {
  const [weight, setWeight] = useState(60);
  const [drinks, setDrinks] = useState(1);
  const [hoursSinceAlcohol, setHoursSinceAlcohol] = useState(0);
  const [caffeineMg, setCaffeineMg] = useState(100);
  const [hoursSinceCaffeine, setHoursSinceCaffeine] = useState(0);

  const alcoholClearTime = (drinks, weight) => {
    const metabolismRate = 0.015;
    const bac = (drinks * 14) / (weight * 0.68);
    return Math.ceil(bac / metabolismRate);
  };

  const caffeineRemaining = (mg, hours) => {
    const halfLife = 6;
    return mg * Math.pow(0.5, hours / halfLife);
  };

  const alcoholTime = alcoholClearTime(drinks, weight);
  const remainingCaffeine = caffeineRemaining(caffeineMg, hoursSinceCaffeine);

  const alcoholSafe = hoursSinceAlcohol >= alcoholTime;
  const caffeineSafe = remainingCaffeine < 1;

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Breastmilk Clearance Tracker</h1>

      <div>
        <label className="block">Body Weight (kg):</label>
        <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="input w-full" />
      </div>

      <div className="pt-4 border-t">
        <h2 className="font-semibold">Alcohol</h2>
        <label className="block"># of Standard Drinks:</label>
        <input type="number" value={drinks} onChange={e => setDrinks(+e.target.value)} className="input w-full" />

        <label className="block mt-2">Hours Since Drinking:</label>
        <input type="number" value={hoursSinceAlcohol} onChange={e => setHoursSinceAlcohol(+e.target.value)} className="input w-full" />

        <p className="mt-2">
          {alcoholSafe ? "✔️ Safe to breastfeed" : `⏳ Wait ~${alcoholTime - hoursSinceAlcohol} more hour(s)`}
        </p>
      </div>

      <div className="pt-4 border-t">
        <h2 className="font-semibold">Caffeine</h2>
        <label className="block">Total Caffeine Consumed (mg):</label>
        <input type="number" value={caffeineMg} onChange={e => setCaffeineMg(+e.target.value)} className="input w-full" />

        <label className="block mt-2">Hours Since Last Intake:</label>
        <input type="number" value={hoursSinceCaffeine} onChange={e => setHoursSinceCaffeine(+e.target.value)} className="input w-full" />

        <p className="mt-2">
          {caffeineSafe ? "✔️ No caffeine left in system" : `⏳ Estimated caffeine left: ${remainingCaffeine.toFixed(1)} mg`}
        </p>
      </div>
    </div>
  );
}
