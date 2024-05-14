import promisePool from '../../utils/database.js';

const listAllKategoriaTuote = async () => {
  const [rows] = await promisePool.query('SELECT * FROM kategoria_tuote');
  return rows;
};

const findKategoriaTuoteById = async (kategoriatuote_id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM `kategoria_tuote` WHERE kategoriatuote_id = ?',
    [kategoriatuote_id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findKategoriaTuoteByTuoteId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM kategoria_tuote WHERE tuote_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const findKategoriaTuoteByKategoriaId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM kategoria_tuote WHERE kategoria_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findKategoriatuoteIdByTuoteAndKategoria = async (tuote_id, kategoria_id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM kategoria_tuote WHERE tuote_id = ? AND kategoria_id = ?',
    [tuote_id, kategoria_id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}

const addKategoriaTuote = async (kategoriaTuote) => {
  const { tuote_id, kategoria_id } = kategoriaTuote;
  const sql = `INSERT INTO kategoria_tuote (tuote_id, kategoria_id) VALUES (?, ?)`;
  const data = [tuote_id, kategoria_id];

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

const removeKategoriaTuoteById = async (kategoriatuote_id) => {
  if (kategoriatuote_id === undefined || kategoriatuote_id === null) {
    console.error("Kategoriatuote ID on määrittelemätön");
    return false;
  }

  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM kategoria_tuote WHERE kategoriatuote_id = ?',
      [kategoriatuote_id]
    );

    if (rows.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Virhe tietueen poistamisessa:", error.message);
    return false;
  }
};

const updateKategoriaTuoteById = async (kategoriaTuote, id) => {
  const sql = promisePool.format(`UPDATE kategoria_tuote SET ? WHERE kategoriatuote_id = ?`, [
    kategoriaTuote,
    id,
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

export {
  listAllKategoriaTuote,
  findKategoriaTuoteById,
  findKategoriaTuoteByTuoteId,
  findKategoriaTuoteByKategoriaId,
  addKategoriaTuote,
  removeKategoriaTuoteById,
  updateKategoriaTuoteById, findKategoriatuoteIdByTuoteAndKategoria
};
