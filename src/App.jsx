import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("data");
    if (saved) {
      return JSON.parse(saved).map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
    }
    return [];
  });

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems((oldItem) => [
      ...oldItem,
      {
        id: oldItem.length > 0 ? Math.max(...oldItem.map((i) => i.id)) + 1 : 1,
        text: item.text,
        title: item.title,
        date: new Date(item.date),
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}
