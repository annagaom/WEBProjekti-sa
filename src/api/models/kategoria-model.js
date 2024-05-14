import express from 'express';
import promisePool from '../../utils/database.js';

const listAllKategorias = async () => {
    const [rows] = await promisePool.query('SELECT * FROM kategoria');
    return rows;
};

const findKategoriaById = async (kategoria_id) => {
    const [rows] = await promisePool.execute(
        'SELECT * FROM kategoria WHERE kategoria_id = ?',
        [kategoria_id]
    );
    if (rows.length === 0) {
        return false;
    }
    return rows[0];
};

const findKategoriaByname = async (kategoria_nimi) => {
  const [rows] = await promisePool.execute(
      'SELECT * FROM kategoria WHERE kategoria_nimi = ?',
      [kategoria_nimi]
  );
  if (rows.length === 0) {
      return false;
  }
  return rows[0];
};

const addKategoria = async (kategoria) => {
  const {kategoria_nimi} = kategoria;
  const sql = `INSERT INTO kategoria (kategoria_nimi) VALUES (?)`;
  const data = [kategoria_nimi];

  try {
    const [rows] = await promisePool.execute(sql, data);
    if (rows && rows.affectedRows !== 0) {
      return { kategoria_id: rows.insertId };
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return false;
  }
};

const removeKategoriaById = async (kategoria_id) => {
  const connection = await promisePool.getConnection();
  try {
      const [rows] = await promisePool.execute(
          'DELETE FROM kategoria WHERE kategoria_id = ?',
          [kategoria_id]
      );
      if (rows.affectedRows === 0) {
          return false;
      }
      await connection.commit();
      return {
          message: 'kategoria deleted',
      };
  } catch (error) {
      await connection.rollback();
      console.error('error', error.message);
      return false;
  } finally {
      connection.release();
  }
};

const updateKategoria = async (kategoria, kategoria_id) => {
  const sql = promisePool.format(`UPDATE kategoria SET ? WHERE kategoria_id = ?`, [
      kategoria,
      kategoria_id,
  ]);
  try {
      const rows = await promisePool.execute(sql);
      console.log('updatekategoria', rows);
      if (rows.affectedRows === 0) {
          return false;
      }
      return { message: 'success' };
  } catch (e) {
      console.error('error', e.message);
      return false;
  }
};

export {listAllKategorias, findKategoriaById, findKategoriaByname, addKategoria, removeKategoriaById, updateKategoria};
