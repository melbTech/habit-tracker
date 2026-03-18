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

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

  if (filter === "completed") {
    filteredHabits = habits.filter((habit) => habit.completed);
  }

  if (filter === "incomplete") {
    filteredHabits = habits.filter((habit) => !habit.completed);
  }

  if (filter === "today") {
    filteredHabits = habits.filter((habit) => {
      if (!habit.completedAt) {
        return false;
      }

      const completedDate = new Date(habit.completedAt);
      return completedDate >= startOfToday;
    });
  }

  if (filter === "week") {
    filteredHabits = habits.filter((habit) => {
      if (!habit.completedAt) {
        return false;
      }

      const completedDate = new Date(habit.completedAt);
      return completedDate >= startOfWeek;
    });
  }

  function formatCompletedDate(completedAt) {
    if (!completedAt) {
      return "Not completed yet";
    }

    return new Date(completedAt).toLocaleDateString();
  }

  return (
    <>
      <div className="card">
        <h3>Filters</h3>
        <div className="filterRow">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("incomplete")}>Incomplete</button>
          <button onClick={() => setFilter("today")}>Completed Today</button>
          <button onClick={() => setFilter("week")}>Completed This Week</button>
        </div>
      </div>

      {isLoading ? (
        <p className="pageMessage">Loading habits...</p>
      ) : filteredHabits.length === 0 ? (
        <p className="pageMessage">Add your first habit to get started.</p>
      ) : (
        filteredHabits.map((habit) => (
          <div className="card" key={habit.id}>
            <h3>{habit.title}</h3>
            <p>Category: {habit.category}</p>
            <p>Status: {habit.completed ? "Completed" : "Incomplete"}</p>
            <p>Last completed: {formatCompletedDate(habit.completedAt)}</p>

            <div className="actionRow">
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
          </div>
        ))
      )}
    </>
  );
}

export default Dashboard;
