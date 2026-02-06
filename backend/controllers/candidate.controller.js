const pool = require("../db");



  exports.getAllCandidates = async (req, res) => {
  try {
    console.log(typeof process.env.DB_PASSWORD)
    const result = await pool.query("SELECT * FROM candidates");
    res.json(result.rows);
  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidateById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM candidates WHERE id=$1",
    [id]
  );
  res.json(result.rows[0]);
};
exports.createCandidate = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const result = await pool.query(
      "INSERT INTO candidates (name, age, email) VALUES ($1,$2,$3) RETURNING *",
      [name, age, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;

    await pool.query(
      `UPDATE candidates
       SET name=$1, age=$2, email=$3
       WHERE id=$4`,
      [name, age, email, id]
    );

    res.json({ message: "Candidate updated" });
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM candidates WHERE id=$1", [id]);
  res.json({ message: "Candidate deleted" });
};
