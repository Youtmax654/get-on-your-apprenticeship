import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "./App.css";
import logo from "./assets/hogwarts.png";
import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState(null);

  const housesFilter = [
    {
      name: "Gryffindor",
      img: "/src/assets/houses/Gryffindor_ClearBG.webp",
      onClick: () => fetchStudents("Gryffindor"),
    },
    {
      name: "Hufflepuff",
      img: "/src/assets/houses/Hufflepuff_ClearBG.webp",
      onClick: () => fetchStudents("Hufflepuff"),
    },
    {
      name: "Ravenclaw",
      img: "/src/assets/houses/RavenclawCrest.webp",
      onClick: () => fetchStudents("Ravenclaw"),
    },
    {
      name: "Slytherin",
      img: "/src/assets/houses/Slytherin_ClearBG.webp",
      onClick: () => fetchStudents("Slytherin"),
    },
  ];

  const fetchStudents = async (house) => {
    setResult(null);
    setFilter(null);

    if (house) {
      const response = await fetch(
        `http://localhost:3000/real/students?house=${house}`
      );
      const data = await response.json();
      setResult(data);
      setFilter(house);
      return;
    }

    const response = await fetch("http://localhost:3000/real/students");
    const data = await response.json();
    setResult(data);
  };

  const pickRandomStudent = async () => {
    setResult(null);
    setFilter(null);
    const res = await fetch("http://localhost:3000/real/randomstudent");
    const data = await res.json();
    setResult([data]);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => fetchStudents()}>Show all students</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={pickRandomStudent}>Pick a student randomly</Button>
      </header>
      <div className="houses-filter">
        {housesFilter.map((house) => (
          <Button
            key={house.name}
            onClick={house.onClick}
            className={filter === house.name && "selected"}
          >
            <img src={house.img} alt={house.name} width={20} />
            {house.name}
          </Button>
        ))}
      </div>
      <div className="App-body">
        {result ? (
          result.map((student) => (
            <Card key={crypto.randomUUID()} student={student} />
          ))
        ) : (
          <SyncLoader color={"#ffffff"} loading={true} size={15} />
        )}
      </div>
    </div>
  );
}

export default App;
