import { PackingItem as PackingItemType } from "components/constants/items";
import { useState, useEffect, useRef } from "react";

interface PackingItemProps {
  item: PackingItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PackingItem({ item, onToggle, onDelete }: PackingItemProps) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout>();
  const progressTimer = useRef<NodeJS.Timeout>();
  const PRESS_DURATION = 1500; // 1.5 seconds for deletion
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const startPress = () => {
    setPressing(true);
    setProgress(0);

    // Start the deletion timer
    pressTimer.current = setTimeout(() => {
      onDelete(item.id);
      setPressing(false);
      setProgress(0);
      if (navigator.vibrate) {
        navigator.vibrate(200); // 200ms vibration
      }
    }, PRESS_DURATION);

    // Start the progress animation
    let currentProgress = 0;
    progressTimer.current = setInterval(() => {
      currentProgress += (PROGRESS_INTERVAL / PRESS_DURATION) * 100;
      setProgress(Math.min(currentProgress, 100));
    }, PROGRESS_INTERVAL);
  };

  const endPress = () => {
    setPressing(false);
    setProgress(0);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
    >
      <div
        className={`flex items-center gap-3 p-2 bg-white rounded-lg ${
          pressing ? "bg-red-50" : ""
        } transition-colors`}
      >
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span
          className={`text-gray-700 flex-grow ${
            item.checked ? "line-through text-gray-400" : ""
          }`}
        >
          {item.name}
        </span>
      </div>

      {/* Progress indicator */}
      {pressing && (
        <>
          <div className="absolute bottom-0 left-0 h-1 bg-red-200 w-full rounded-full">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="absolute inset-0 border-2 border-red-500 rounded-lg pointer-events-none" />
        </>
      )}
    </div>
  );
}
