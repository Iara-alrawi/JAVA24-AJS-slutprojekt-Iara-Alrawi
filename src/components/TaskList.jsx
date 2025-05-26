import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, get, update, remove } from "firebase/database";

const TaskList = ({ filters }) => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const snapshot = await get(ref(db, "assignments"));
      if (!snapshot.exists()) {
        setTasks([]);
        return;
      }
      let data = snapshot.val();

    
      const dataArray = Object.entries(data).map(([id, task]) => ({
        id,
        ...task,
      }));

      
      let filtered = dataArray;
      if (filters.category) {
        filtered = filtered.filter((task) => task.category === filters.category);
      }
      if (filters.member) {
        filtered = filtered.filter((task) => task.member === filters.member);
      }

      
      if (filters.sort === "timestamp_asc") {
        filtered.sort((a, b) => a.timestamp - b.timestamp);
      } else if (filters.sort === "timestamp_desc") {
        filtered.sort((a, b) => b.timestamp - a.timestamp);
      } else if (filters.sort === "title_asc") {
        filtered.sort((a, b) => a.assignment.localeCompare(b.assignment));
      } else if (filters.sort === "title_desc") {
        filtered.sort((a, b) => b.assignment.localeCompare(a.assignment));
      }

      setTasks(filtered);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const fetchMembers = async () => {
    try {
      const snapshot = await get(ref(db, "members"));
      if (!snapshot.exists()) {
        setMembers([]);
        return;
      }
      const data = snapshot.val();
      setMembers(Object.values(data));
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    }
  };

  const assignTask = async (taskId, member) => {
    try {
      await update(ref(db, `assignments/${taskId}`), {
        member,
        status: "in-progress",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const finishTask = async (taskId) => {
    try {
      await update(ref(db, `assignments/${taskId}`), {
        status: "finished",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error finishing task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await remove(ref(db, `assignments/${taskId}`));
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <strong>{task.assignment}</strong>
          <br />
          Kategori: {task.category}
          <br />
          Skapad: {new Date(task.timestamp).toLocaleString()}
          <br />
          {status === "new" && (
            <div>
              <label>Tilldela till:</label>
              <select
                onChange={(e) => assignTask(task.id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Välj medlem
                </option>
                {members
                  .filter((m) => m.category === task.category)
                  .map((m, idx) => (
                    <option key={idx} value={m.name}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {status === "in-progress" && (
            <div>
              Ansvarig: {task.member}
              <br />
              <button onClick={() => finishTask(task.id)}>Markera som klar</button>
            </div>
          )}
          {status === "finished" && (
            <div>
              Ansvarig: {task.member}
              <br />
              <button onClick={() => deleteTask(task.id)}>Radera</button>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div>
      <h2>Uppgifter</h2>
      <h3>Status: New</h3>
      {renderTasks("new")}
      <h3>Status: In Progress</h3>
      {renderTasks("in-progress")}
      <h3>Status: Finished</h3>
      {renderTasks("finished")}
    </div>
  );
};

export default TaskList;
