import { useState } from "react";

export function useLocalStorage(key) {
  const [data, setData] = useState(() => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res) {
      return res;
    }
    return [];
  });

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
