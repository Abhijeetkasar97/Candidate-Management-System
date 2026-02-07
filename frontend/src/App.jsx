import { useEffect, useState } from "react";
import CandidateForm from "./components/CandidateForm";
import CandidateTable from "./components/CandidateTable";

function App() {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/candidates");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    // force array
    setCandidates(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    setCandidates([]);
  }
};


  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <>
      <h1>Candidate Management System</h1>
      <CandidateForm refresh={fetchCandidates} />
      <CandidateTable candidates={candidates} refresh={fetchCandidates} />
    </>
  );
}

export default App;
