import { useState } from "react";

export default function CandidateForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    refresh();
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Age" type="number" onChange={e => setForm({...form, age: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <button>Add Candidate</button>
    </form>
  );
}

