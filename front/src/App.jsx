import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import SyncLoader from "react-spinners/SyncLoader";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";

import logo from "./assets/hogwarts.png";
import gryffindor from "./assets/houses/Gryffindor_ClearBG.webp";
import hufflepuff from "./assets/houses/Hufflepuff_ClearBG.webp";
import ravenclaw from "./assets/houses/RavenclawCrest.webp";
import slytherin from "./assets/houses/Slytherin_ClearBG.webp";

function App() {
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const housesFilter = [
    {
      name: "Gryffindor",
      img: gryffindor,
      onClick: () => {
        fetchStudents("Gryffindor", 1);
        setPage(1);
      },
    },
    {
      name: "Hufflepuff",
      img: hufflepuff,
      onClick: () => {
        fetchStudents("Hufflepuff", 1);
        setPage(1);
      },
    },
    {
      name: "Ravenclaw",
      img: ravenclaw,
      onClick: () => {
        fetchStudents("Ravenclaw", 1);
        setPage(1);
      },
    },
    {
      name: "Slytherin",
      img: slytherin,
      onClick: () => {
        fetchStudents("Slytherin", 1);
        setPage(1);
      },
    },
  ];

  const fetchStudents = async (house, page) => {
    setResult(null);
    setFilter(null);
    // setPage(1);

    if (house) {
      const response = await fetch(
        `https://teolia-apprenticeship-api.netlify.app/real/students?page=${page}&house=${house}`,
        { mode: "no-cors" }
      );
      const data = await response.json();
      setResult(data.students);
      setMaxPage(data.maxPage);
      setFilter(house);
      return;
    }

    const response = await fetch(
      `https://teolia-apprenticeship-api.netlify.app/real/students?page=${page}`,
      { mode: "no-cors" }
    );
    const data = await response.json();
    setResult(data.students);
    setMaxPage(data.maxPage);
  };

  const pickRandomStudent = async () => {
    setResult(null);
    setFilter(null);
    setPage(1);
    setMaxPage(1);
    const res = await fetch(
      "https://teolia-apprenticeship-api.netlify.app/real/randomstudent",
      { mode: "no-cors" }
    );
    const data = await res.json();
    setResult([data]);
  };

  useEffect(() => {
    fetchStudents(undefined, page);
  }, []);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchStudents(filter, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
      fetchStudents(filter, page + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          onClick={() => {
            fetchStudents(undefined, 1);
            setPage(1);
          }}
        >
          Show all students
        </Button>
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
      <div className="pages">
        <MdArrowBackIosNew onClick={handlePreviousPage} />
        {page} / {maxPage}
        <MdArrowForwardIos onClick={handleNextPage} />
      </div>
    </div>
  );
}

export default App;
