import  { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, push } from "firebase/database";

const MemberForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("ux");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, "members"), { name, category });
      setName("");
    } catch (error) {
      console.error("Error adding member: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Team Member</h2>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default MemberForm;
