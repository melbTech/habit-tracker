import { useNavigate } from "react-router";

function Dashboard({
  habits,
  isLoading,
  filter,
  setFilter,
  onDeleteHabit,
  onToggleHabit,
  onStartEditHabit,
}) {
  let filteredHabits = habits;
  const navigate = useNavigate();

  if (filter === "completed") {
    filteredHabits = habits.filter((habit) => habit.completed);
  }

  if (filter === "incomplete") {
    filteredHabits = habits.filter((habit) => !habit.completed);
  }

  return (
    <>
      <div className="card">
        <h3>Filters</h3>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      {isLoading ? (
        <div className="card">
          <p>Loading habits...</p>
        </div>
      ) : filteredHabits.length === 0 ? (
        <div className="card">
          <p>No habits yet.</p>
        </div>
      ) : (
        filteredHabits.map((habit) => (
          <div className="card" key={habit.id}>
            <h3>{habit.title}</h3>
            <p>Category: {habit.category}</p>
            <p>Status: {habit.completed ? "Completed" : "Incomplete"}</p>

            <button onClick={() => onToggleHabit(habit.id)}>
              {habit.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
              onClick={() => {
                onStartEditHabit(habit);
                navigate("/add");
              }}
            >
              Edit
            </button>

            <button onClick={() => onDeleteHabit(habit.id)}>Delete</button>
          </div>
        ))
      )}
    </>
  );
}

export default Dashboard;
