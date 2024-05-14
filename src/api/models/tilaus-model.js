import e from 'express';
import promisePool from '../../utils/database.js';

const listAllTilaukset = async () => {
    const [rows] = await promisePool.query('SELECT * FROM tilaus');
    return rows;
};

const findTilausByTilausId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tilaus WHERE tilaus_id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const findTilausByAsiakasId = async (id) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tilaus WHERE asiakas_id = ?',
      [id]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows;
};

const addTilaus = async (tilaus) => {
  const {asiakas_id} = tilaus;
  const sql = `INSERT INTO tilaus (asiakas_id) VALUES (?)`;
  const data = [asiakas_id];
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

const removeTilausByTilausId = async (id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM tilaus WHERE tilaus_id = ?',
          [id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'Tilaus deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateTilausByTilausId = async (tilaus, id) => {
  const sql = promisePool.format(`UPDATE tilaus SET ? WHERE tilaus_id = ?`, [
      tilaus,
      id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('Tilaus', rows);
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
  listAllTilaukset,
  findTilausByTilausId,
  findTilausByAsiakasId,
  addTilaus,
  removeTilausByTilausId,
  updateTilausByTilausId
};
