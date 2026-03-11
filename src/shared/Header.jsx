import { NavLink } from "react-router";
import styles from "./Header.module.css";

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Add Habit
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Stats
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
