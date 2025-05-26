import { useEffect, useState } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import { app } from "../firebase/firebaseConfig";

const FilterSortControls = ({ setFilters }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, "members"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const membersArray = Object.values(data);
          setMembers(membersArray);
        } else {
          setMembers([]);
        }
      })
      .catch((error) => {
        console.error("Fel vid hämtning av medlemmar:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3>Filtrera och Sortera</h3>

      <label>Filtrera kategori: </label>
      <select name="category" onChange={handleChange} defaultValue="">
        <option value="">Alla</option>
        <option value="ux">UX</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>

      <label>Filtrera medlem: </label>
      <select name="member" onChange={handleChange} defaultValue="">
        <option value="">Alla</option>
        {members.map((m, idx) => (
          <option key={idx} value={m.name}>
            {m.name}
          </option>
        ))}
      </select>

      <label>Sortera: </label>
      <select name="sort" onChange={handleChange} defaultValue="">
        <option value="">Ingen sortering</option>
        <option value="timestamp_asc">Äldst → Nyast</option>
        <option value="timestamp_desc">Nyast → Äldst</option>
        <option value="title_asc">Titel A–Ö</option>
        <option value="title_desc">Titel Ö–A</option>
      </select>
    </div>
  );
};

export default FilterSortControls;
