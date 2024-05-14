import e from 'express';
import promisePool from '../../utils/database.js';

const listAllSuosikit = async () => {
    const [rows] = await promisePool.query('SELECT * FROM suosikit');
    return rows;
};

const findSuosikkiByAsiakasId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM suosikit WHERE asiakas_id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows;
};

const addSuosikki = async (suosikki) => {
  const {asiakas_id, tuote_id} = suosikki;
  const sql = `INSERT INTO suosikit (asiakas_id, tuote_id) VALUES (?, ?)`;
  const data = [asiakas_id, tuote_id];
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

const removeSuosikkiById = async (asiakas_id, tuote_id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM suosikit WHERE asiakas_id = ? AND tuote_id = ?',
          [asiakas_id, tuote_id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'Suosikki deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const removeSuosikkiByasiakasIdAndTuoteId = async (asiakas_id, tuote_id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM suosikit WHERE asiakas_id = ? AND tuote_id = ?',
          [asiakas_id, tuote_id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'Suosikki deleted',
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
  listAllSuosikit,
  findSuosikkiByAsiakasId,
  addSuosikki,
  removeSuosikkiById,
  removeSuosikkiByasiakasIdAndTuoteId
};
