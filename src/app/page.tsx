"use client";
import { useState, useEffect, useRef } from "react";
import { PackingItem } from "../constants/items";
import { PackingSection } from "../components/PackingSection";
import { Toaster, toast } from "react-hot-toast";
import { CollapsibleAddForm } from "../components/CollapsibleAddForm";
import { DeleteAllButton } from "components/components/DeleteAllButton";
import { generateId } from "components/utils/generateId";

export default function Home() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const lastAddedCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    const savedItems = localStorage.getItem("packingListItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("packingListItems", JSON.stringify(items));
    } else {
      localStorage.removeItem("packingListItems");
    }
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems(
      items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
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

  const addItem = (newItem: Omit<PackingItem, "id">) => {
    const item: PackingItem = {
      ...newItem,
      id: generateId()
    };
    setItems([...items, item]);
    lastAddedCategoryRef.current = item.category;
  };

  useEffect(() => {
    if (lastAddedCategoryRef.current) {
      const element = document.getElementById(
        `category-${lastAddedCategoryRef.current}`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        lastAddedCategoryRef.current = null;
      }
    }
  }, [items]);

  const deleteCategory = (categoryToDelete: string) => {
    const itemsToDelete = items.filter(
      item => item.category === categoryToDelete
    );
    const itemIndices = itemsToDelete.map(item => ({
      item,
      index: items.findIndex(i => i.id === item.id)
    }));

    setItems(items.filter(item => item.category !== categoryToDelete));

    toast(
      t => (
        <div className="flex items-center gap-4">
          <span>Deleted category &quot;{categoryToDelete}&quot;</span>
          <button
            onClick={() => {
              setItems(prev => {
                const newItems = [...prev];
                // Insert items back in their original positions
                itemIndices
                  .sort((a, b) => a.index - b.index)
                  .forEach(({ item, index }) => {
                    newItems.splice(index, 0, item);
                  });
                return newItems;
              });
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg active:bg-blue-100 transition-colors"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 4000,
        position: "bottom-center",
        className: "bg-white text-gray-900 px-4 py-3",
        icon: "🗑️"
      }
    );
  };

  const deleteItem = (itemId: string) => {
    const itemIndex = items.findIndex(item => item.id === itemId);
    const itemToDelete = items[itemIndex];
    setItems(items.filter(item => item.id !== itemId));

    toast(
      t => (
        <div className="flex items-center gap-4">
          <span>Deleted &quot;{itemToDelete?.name}&quot;</span>
          <button
            onClick={() => {
              if (itemToDelete) {
                setItems(prev => {
                  const newItems = [...prev];
                  newItems.splice(itemIndex, 0, itemToDelete);
                  return newItems;
                });
                toast.dismiss(t.id);
              }
            }}
            className="px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg active:bg-blue-100 transition-colors"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 4000,
        position: "bottom-center",
        className: "bg-white text-gray-900 px-4 py-3",
        icon: "🗑️"
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div
          className="max-w-md mx-auto p-4"
          style={{
            paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))"
          }}
        >
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Packing List
              </h1>
              <DeleteAllButton items={items} setItems={setItems} />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Keep track of your travel essentials
            </p>
          </header>

          <main className="space-y-4 mb-16">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Your list is empty
                </h3>
                <p className="text-gray-500 text-sm">
                  Click the button below to start adding items
                </p>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, categoryItems]) => (
                <PackingSection
                  key={category}
                  category={category}
                  items={categoryItems}
                  onToggleItem={toggleItem}
                  onToggleSection={toggleSection}
                  onDeleteCategory={deleteCategory}
                  onDeleteItem={deleteItem}
                />
              ))
            )}
          </main>
        </div>
      </div>

      <div className="sticky bottom-0 w-full">
        <CollapsibleAddForm
          existingCategories={Array.from(
            new Set(items.map(item => item.category))
          )}
          onAddItem={addItem}
          isOpen={false}
        />
      </div>

      <Toaster />
    </div>
  );
}
