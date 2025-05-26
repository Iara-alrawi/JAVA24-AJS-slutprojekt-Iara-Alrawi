import { useState } from "react";
import MemberForm from "./components/MemberForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterSortControls from "./components/FilterSortControls";
import "./css/App.css";

const App = () => {
  const [filters, setFilters] = useState({ category: "", member: "", sort: "" });

  return (
    <div>
      <h1>Scrum Board</h1>
      <MemberForm />
      <TaskForm />
      <FilterSortControls setFilters={setFilters} />
      <TaskList filters={filters} />
    </div>
  );
};

export default App;
