function Stats({ habits }) {
  const completedHabits = habits.filter((habit) => habit.completed).length;
  const incompleteHabits = habits.filter((habit) => !habit.completed).length;

  return (
    <>
      <div className="card">
        <p>Total habits: {habits.length}</p>
        <p>Completed habits: {completedHabits}</p>
        <p>Incomplete habits: {incompleteHabits}</p>
      </div>
    </>
  );
}

export default Stats;
