import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CreateHabit from "./pages/CreateHabit";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";
import Header from "./shared/Header";
import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingHabit, setEditingHabit] = useState(null);
  const [title, setTitle] = useState("Habit Tracker");

  const location = useLocation();
  const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || "habits";

  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);

    if (storedHabits && storedHabits !== "undefined") {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        setHabits(parsedHabits);
      } catch (error) {
        console.error("Failed to parse habits from localStorage:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoading(false);
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, isLoading]);

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Habit Dashboard");
    } else if (location.pathname === "/add") {
      setTitle(editingHabit ? "Edit Habit" : "Add Habit");
    } else if (location.pathname === "/stats") {
      setTitle("Habit Stats");
    } else {
      setTitle("Not Found");
    }
  }, [location, editingHabit]);

  const handleDeleteHabit = useCallback((habitId) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    );
  }, []);

  const handleToggleHabit = useCallback((habitId) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completed: !habit.completed,
              completedAt: !habit.completed ? new Date().toISOString() : null,
            }
          : habit,
      ),
    );
  }, []);

  const handleStartEditHabit = useCallback((habit) => {
    setEditingHabit(habit);
  }, []);

  const handleUpdateHabit = useCallback((updatedHabit) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit,
      ),
    );

    setEditingHabit(null);
  }, []);

  return (
    <div className={styles.page}>
      <Header title={title} />

      <div className={styles.appContainer}>
        <div className={styles.card}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  habits={habits}
                  isLoading={isLoading}
                  filter={filter}
                  setFilter={setFilter}
                  onDeleteHabit={handleDeleteHabit}
                  onToggleHabit={handleToggleHabit}
                  onStartEditHabit={handleStartEditHabit}
                />
              }
            />
            <Route
              path="/add"
              element={
                <CreateHabit
                  habits={habits}
                  setHabits={setHabits}
                  editingHabit={editingHabit}
                  onUpdateHabit={handleUpdateHabit}
                />
              }
            />
            <Route path="/stats" element={<Stats habits={habits} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
