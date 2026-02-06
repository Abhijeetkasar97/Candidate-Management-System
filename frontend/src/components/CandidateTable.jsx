export default function CandidateTable({ candidates = [], refresh }) {
  // safety check
  if (!Array.isArray(candidates)) {
    return <p>No candidate data available</p>;
  }

  const remove = async (id) => {
    if (window.confirm("Delete candidate?")) {
      await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: "DELETE",
      });
      refresh();
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {candidates.length === 0 ? (
          <tr>
            <td colSpan="4">No candidates found</td>
          </tr>
        ) : (
          candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => remove(c.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
