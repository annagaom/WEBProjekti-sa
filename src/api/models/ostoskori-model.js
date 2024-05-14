import e from 'express';
import promisePool from '../../utils/database.js';

const listAllostokset = async () => {
  const [rows] = await promisePool.query('SELECT * FROM ostoskori');
  return rows;
};

const findOstosByAsiakasId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM ostoskori WHERE asiakas_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findTuoteMaaraByAsiakasIdAndTuoteId = async (asiakas_id, tuote_id) => {
  const [rows] = await promisePool.execute(
    'SELECT tuote_maara FROM ostoskori WHERE asiakas_id = ? AND tuote_id = ?',
    [asiakas_id, tuote_id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}


const addOstoskoriin = async (ostos) => {
  const { asiakas_id, tuote_id, tuote_maara } = ostos;

  const sql = `INSERT INTO ostoskori (asiakas_id, tuote_id, tuote_maara) VALUES (?, ?, ?)`;

  const data = [asiakas_id, tuote_id, tuote_maara];

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

const updateOstosTuoteenMaara = async (tuotemaara, asiakas_id, tuote_id) => {
  const sql = promisePool.format(`UPDATE ostoskori SET tuote_maara = ?  WHERE asiakas_id = ? AND tuote_id = ?`, [
    tuotemaara,
    asiakas_id,
    tuote_id
  ]);
  try {
    const rows = await promisePool.execute(sql);
    console.log('update tuoteen määrä', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

const removeOstosById = async (asiakas_id, tuote_id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM ostoskori WHERE asiakas_id = ? AND tuote_id = ?',
      [asiakas_id, tuote_id]
    );
    if (rows.affectedRows === 0) {
      return false;
    }
    await connection.commit();
    return {
      message: 'Ostos deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return false;
  } finally {
    connection.release();
  }
};

const removeOstosByUserId = async (asiakas_id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM ostoskori WHERE asiakas_id = ?',
      [asiakas_id]
    );
    if (rows.affectedRows === 0) {
      return false;
    }
    await connection.commit();
    return {
      message: 'Tuotteet deleted',
    };
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return false;
  } finally {
    connection.release();
  }
}

export {
  listAllostokset,
  findOstosByAsiakasId,
  findTuoteMaaraByAsiakasIdAndTuoteId,
  addOstoskoriin,
  updateOstosTuoteenMaara,
  removeOstosById,
  removeOstosByUserId
};
