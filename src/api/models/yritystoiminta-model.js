import e from 'express';
import promisePool from '../../utils/database.js';

const listAllYritystoiminta = async () => {
    const [rows] = await promisePool.query('SELECT * FROM yritystoiminta');
    return rows;
};

const findYritystoimintaById= async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM yritystoiminta WHERE id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const findYritystoimintaByTapahtuPvm= async (pvm) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM yritystoiminta WHERE tapahtu_pvm = ?',
    [pvm]
);
if (rows.length === 0) {
    return false;
}
return rows;
};

const findYritystoimintaByDateRange = async (startDate, endDate) => {
const [rows] = await promisePool.execute(
    'SELECT * FROM yritystoiminta WHERE tapahtu_pvm BETWEEN ? AND ?',
    [startDate, endDate]
);
if (rows.length === 0) {
    return false;
}
console.log(rows);
return rows;
};


const addYritystoiminta = async (yritystoiminta) => {
  const {
    tapahtu_pvm,
    tilaus_id,
    myynti_hinta,
    kustannus,
    voitto
  } = yritystoiminta;

  const sql = `INSERT INTO yritystoiminta (
    tapahtu_pvm,
    tilaus_id,
    myynti_hinta,
    kustannus,
    voitto
  ) VALUES (?, ?, ?, ?, ?)`;
;

  const data = [
    tapahtu_pvm,
    tilaus_id,
    myynti_hinta,
    kustannus,
    voitto
  ];

  try {
    const [rows] = await promisePool.execute(sql, data);
    if (rows && rows.affectedRows !== 0) {
      rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return false;
  }

};

const removeYritystoimintaById = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM yritystoiminta WHERE id = ?',
          [id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'Yritystoiminta deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateYritystoimintaById = async (yritystoiminta, id) => {
  const sql = promisePool.format(`UPDATE yritystoiminta SET ? WHERE id = ?`, [
      yritystoiminta,
      id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('Yritystoiminta', rows);
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
  listAllYritystoiminta,
  findYritystoimintaById,
  findYritystoimintaByTapahtuPvm,
  findYritystoimintaByDateRange,
  addYritystoiminta,
  removeYritystoimintaById,
  updateYritystoimintaById
};
