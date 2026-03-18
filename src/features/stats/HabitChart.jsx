import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HabitChart({ habits }) {
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

  const chartData = [
    { name: "Total", value: habits.length },
    { name: "Completed", value: completedHabits },
    { name: "Incomplete", value: incompleteHabits },
    { name: "Today", value: completedToday },
    { name: "This Week", value: completedThisWeek },
  ];

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#7c3ff6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HabitChart;
