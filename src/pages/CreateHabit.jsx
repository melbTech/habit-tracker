import { useState, useEffect } from "react";

function CreateHabit({ habits, setHabits, editingHabit, onUpdateHabit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setCategory(editingHabit.category);
    } else {
      setTitle("");
      setCategory("");
    }
  }, [editingHabit]);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Habit title is required.");
      return;
    }

    if (editingHabit) {
      const updatedHabit = {
        ...editingHabit,
        title: title.trim(),
        category: category.trim() || "General",
      };

      onUpdateHabit(updatedHabit);
    } else {
      const newHabit = {
        id: crypto.randomUUID(),
        title: title.trim(),
        category: category.trim() || "General",
        completed: false,
        completedAt: null,
      };

      setHabits([...habits, newHabit]);
    }

    setTitle("");
    setCategory("");
    setError("");
  }

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Habit Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>

          {error && <p>{error}</p>}

          <button type="submit">
            {editingHabit ? "Save Changes" : "Add Habit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateHabit;
