import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, push } from "firebase/database";

const TaskForm = () => {
  const [assignment, setAssignment] = useState("");
  const [category, setCategory] = useState("ux");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, "assignments"), {
        assignment,
        category,
        status: "new",
        timestamp: Date.now(),
        member: null,
      });
      setAssignment("");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Uppgift</h2>
      <input
        type="text"
        placeholder="Uppgift"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ux">UX</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default TaskForm;
