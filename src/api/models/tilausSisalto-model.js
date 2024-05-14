import promisePool from '../../utils/database.js';

const listAllTilausSisalto = async () => {
  const [rows] = await promisePool.query('SELECT * FROM tilaus_sisalto');
  return rows;
};

const findTilausSisaltoById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tilaus_sisalto WHERE id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findTilausPvmByTilausId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT tilaus_pvm FROM tilaus_sisalto WHERE tilaus_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findTilausSisaltoByTilausId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tilaus_sisalto WHERE tilaus_id = ?',
    [id]
  );
  console.log(rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findTilausSisaltoByPvm = async (pvm) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tilaus_sisalto WHERE tilaus_pvm = ?',
    [pvm]
  );

  if (rows.length === 0) {
    return false;
  }
  console.log(rows);
  return rows;
};

const findTilausSisaltoByDateRange = async (startDate, endDate) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM tilaus_sisalto WHERE tilaus_pvm BETWEEN ? AND ?',
    [startDate, endDate]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const addTilausSisalto = async (tilaus_sisalto) => {
  const {
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    voitto,
    status
  } = tilaus_sisalto;

  const tilausCheckSql = `SELECT COUNT(*) AS count FROM tilaus WHERE tilaus_id = ?`;
  const [tilausCheckResult] = await promisePool.execute(tilausCheckSql, [tilaus_id]);

  if (tilausCheckResult[0].count === 0) {
    console.error("Tilaus_id ei löydy tietokannasta");
    return false;
  }

  const sql = `INSERT INTO tilaus_sisalto (
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    voitto,
    status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const data = [
    tilaus_id,
    tuote_id,
    maara,
    myynti_summa,
    kustannus_summa,
    tilaus_pvm,
    voitto,
    status
  ];

  try {
    const [result] = await promisePool.execute(sql, data);
    console.log("SQL Execution Result:", result);

    if (result.affectedRows > 0) {
      return true;
    } else {
      console.error("Ei riviä lisätty");
      return false;
    }
  } catch (error) {
    console.error("Virhe SQL-kyselyssä:", error);
    return false;
  }
};


const removeTilausSisaltoById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM tilaus_sisalto WHERE id = ?',
      [id]
    );
    if (rows.affectedRows === 0) {
      return false;
    }
    await connection.commit();

    return {
      message: 'TilausSisalto deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return false;
  } finally {
    connection.release();
  }
};

const updateTilausSisaltoById = async (tilaus_sisalto, id) => {
  const sql = promisePool.format(`UPDATE tilaus_sisalto SET ? WHERE id = ?`, [
    tilaus_sisalto,
    id,
  ]);
  try {
    const rows = await promisePool.execute(sql);
    console.log('TilausSisalto', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

export {
  listAllTilausSisalto,
  findTilausSisaltoById,
  findTilausSisaltoByTilausId,
  findTilausSisaltoByPvm,
  findTilausPvmByTilausId,
  findTilausSisaltoByDateRange,
  addTilausSisalto,
  removeTilausSisaltoById,
  updateTilausSisaltoById
};
