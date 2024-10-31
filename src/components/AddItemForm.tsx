import { useState, useRef, useEffect } from "react";
import { PackingItem } from "../constants/items";

interface AddItemFormProps {
  existingCategories: string[];
  onAddItem: (item: Omit<PackingItem, "id">) => void;
}

export function AddItemForm({
  existingCategories,
  onAddItem
}: AddItemFormProps) {
  const noCategories = existingCategories.length === 0;
  const [name, setName] = useState("");
  const [category, setCategory] = useState(existingCategories[0] || "");
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(noCategories);
  const newCategoryInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastFocusedInput = useRef<"name" | "category" | null>(null);

  // Auto-focus when switching to new category input
  useEffect(() => {
    if (isNewCategory) {
      newCategoryInputRef.current?.focus();
    }
  }, [isNewCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = isNewCategory ? newCategory : category;
    if (name && finalCategory) {
      onAddItem({
        name,
        category: finalCategory,
        checked: false
      });
      setName("");
      setNewCategory("");
      setCategory(finalCategory);
      setIsNewCategory(false);

      if (lastFocusedInput.current === "name") {
        nameInputRef.current?.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        ref={nameInputRef}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onFocus={() => (lastFocusedInput.current = "name")}
        placeholder="Add new item..."
        className="w-full h-11 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
      />

      {!isNewCategory ? (
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full h-11 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        >
          {existingCategories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <input
          ref={newCategoryInputRef}
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="New category name..."
          className="w-full h-11 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
        />
      )}

      {existingCategories.length > 0 && (
        <button
          type="button"
          onClick={() => setIsNewCategory(!isNewCategory)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isNewCategory ? "Select existing category" : "Create new category"}
        </button>
      )}
      <button
        type="submit"
        disabled={!name || (isNewCategory ? !newCategory : !category)}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 rounded-lg font-medium transition-colors"
      >
        Add Item
      </button>
    </form>
  );
}
