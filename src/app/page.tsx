"use client";
import { useState, useEffect } from "react";
import { PackingItem, DEFAULT_ITEMS } from "../constants/items";
import { PackingSection } from "../components/PackingSection";
import { ToggleAllButton } from "../components/ToggleAllButton";

export default function Home() {
  const [items, setItems] = useState<PackingItem[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("packingListItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(DEFAULT_ITEMS);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("packingListItems", JSON.stringify(items));
    }
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems(
      items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAll = () => {
    const areAllChecked = items.every(item => item.checked);
    setItems(items.map(item => ({ ...item, checked: !areAllChecked })));
  };

  const toggleSection = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const areAllSectionChecked = categoryItems.every(item => item.checked);

    setItems(
      items.map(item =>
        item.category === category
          ? { ...item, checked: !areAllSectionChecked }
          : item
      )
    );
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4 pb-24">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Packing List</h1>
          <p className="text-gray-500 text-sm mt-1">
            Keep track of your travel essentials
          </p>
        </header>

        <main className="space-y-4">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <PackingSection
              key={category}
              category={category}
              items={categoryItems}
              onToggleItem={toggleItem}
              onToggleSection={toggleSection}
            />
          ))}
        </main>

        <ToggleAllButton items={items} onToggleAll={toggleAll} />
      </div>
    </div>
  );
}
