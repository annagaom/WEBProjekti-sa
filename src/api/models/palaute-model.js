import promisePool from '../../utils/database.js';

const listAllpalaute = async () => {
  const [rows] = await promisePool.query('SELECT * FROM palaute');
  return rows;
};

const findPalauteByPvm = async (pvm) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM palaute WHERE pvm = ?',
    [pvm]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findPalauteByDateRange = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    throw new Error("Aloitus- ja lopetuspäivämäärä ovat pakollisia");
  }

  const [rows] = await promisePool.execute(
    'SELECT * FROM palaute WHERE pvm BETWEEN ? AND ?',
    [startDate, endDate]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows;
};

const addPalaute = async (palaute) => {
  const {
    nimi,
    email,
    title,
    teksti,
    pvm
  } = palaute;

  const sql = `INSERT INTO palaute (nimi, email, title, teksti, pvm)
      VALUES (?, ?, ?, ?, ?)`;

  const data = [
    nimi,
    email,
    title,
    teksti,
    pvm
  ];

  try {
    const [rows] = await promisePool.execute(sql, data);
    if (rows && rows.affectedRows !== 0) {
      return { palaute_id: rows.insertId };
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return false;
  }
};


const removePalauteById = async (palaute_id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM kategoria WHERE palaute_id = ?',
      [palaute_id]
    );

    if (rows.affectedRows === 0) {
      return false;
    }

    await connection.commit();

    return {
      message: 'User deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return false;
  } finally {
    connection.release();
  }
};

export {
  listAllpalaute,
  findPalauteByPvm,
  addPalaute,
  removePalauteById,
  findPalauteByDateRange
};
