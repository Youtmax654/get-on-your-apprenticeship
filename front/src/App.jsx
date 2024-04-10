import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "./App.css";
import logo from "./assets/hogwarts.png";
import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  const [result, setResult] = useState(null);

  const fetchStudents = async () => {
    setResult(null);
    const response = await fetch("http://localhost:3000/real/students");
    const data = await response.json();
    setResult(data);
  };

  const pickRandomStudent = async () => {
    setResult(null);
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
        <Button onClick={fetchStudents}>Show all students</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={pickRandomStudent}>Pick a student randomly</Button>
      </header>
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
