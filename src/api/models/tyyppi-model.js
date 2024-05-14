import express from 'express';
import promisePool from '../../utils/database.js';

const listAllTyypit = async () => {
    const [rows] = await promisePool.query('SELECT * FROM tyyppi');
    return rows;
};

const findTyyppiIdByTyypit= async (paatyyppi, alatyyppi) => {
    const [rows] = await promisePool.execute(
        'SELECT tyyppi_id FROM tyyppi WHERE paatyyppi = ? AND alatyyppi = ?',
        [paatyyppi, alatyyppi]
    );
    if (rows.length === 0) {
        return false;
    }
    return rows[0];
};

const findAlatyypitByPaatyyppi = async (paatyyppi) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM tyyppi WHERE paatyyppi = ?',
      [paatyyppi]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows;
};

const addTyyppi = async (tyyppi) => {
  const {paatyyppi, alatyyppi} = tyyppi;
  const sql = `INSERT INTO tyyppi (paatyyppi, alatyyppi) VALUES (?,?)`;
  const data = [paatyyppi, alatyyppi];

  try {
    const [rows] = await promisePool.execute(sql, data);
    if (rows && rows.affectedRows !== 0) {
      return { tyyppi_id: rows.insertId };
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return false;
  }
};

const removeTyyppiById = async (tyyppi_id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM tyyppi WHERE tyyppi_id = ?',
          [tyyppi_id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'tyyppi deleted',
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
  listAllTyypit,
  findTyyppiIdByTyypit,
  findAlatyypitByPaatyyppi,
  addTyyppi,
  removeTyyppiById
};
