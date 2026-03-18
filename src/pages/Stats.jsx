function Stats({ habits }) {
  const completedHabits = habits.filter((habit) => habit.completed).length;
  const incompleteHabits = habits.filter((habit) => !habit.completed).length;

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

  const completedToday = habits.filter((habit) => {
    if (!habit.completedAt) {
      return false;
    }

    const completedDate = new Date(habit.completedAt);
    return completedDate >= startOfToday;
  }).length;

  const completedThisWeek = habits.filter((habit) => {
    if (!habit.completedAt) {
      return false;
    }

    const completedDate = new Date(habit.completedAt);
    return completedDate >= startOfWeek;
  }).length;

  const completionRate =
    habits.length === 0
      ? 0
      : Math.round((completedHabits / habits.length) * 100);

  return (
    <>
      <div className="card">
        <p>Total habits: {habits.length}</p>
        <p>Completed habits: {completedHabits}</p>
        <p>Incomplete habits: {incompleteHabits}</p>
        <p>Completed today: {completedToday}</p>
        <p>Completed this week: {completedThisWeek}</p>
        <p>Completion rate: {completionRate}%</p>
      </div>
    </>
  );
}

export default Stats;
