import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM asiakas');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM asiakas WHERE asiakas_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {
    etunimi,
    sukunimi,
    tunnus,
    salasana,
    rooli,
    email,
    puhelin,
    syntymapaiva,
    ehdot_hyvaksytty,
    allennus_ryhma

  } = user;

  const sql = `INSERT INTO asiakas (etunimi, sukunimi, tunnus,
      salasana, rooli, email, puhelin, syntymapaiva, ehdot_hyvaksytty, allennus_ryhma)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const data = [
    etunimi,
    sukunimi,
    tunnus,
    salasana,
    rooli,
    email,
    puhelin,
    syntymapaiva,
    ehdot_hyvaksytty,
    allennus_ryhma
  ];

  const [rows] = await promisePool.execute(sql, data);

  if (rows && rows.affectedRows !== 0) {
    const asiakas_id = rows.insertId;

    const sqlSelect = `SELECT * FROM asiakas WHERE asiakas_id = ?`;
    const [userRow] = await promisePool.execute(sqlSelect, [asiakas_id]);

    return userRow[0];
  } else {
    return false;
  }
};

const findUserByUsername = async (tunnus) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM asiakas WHERE tunnus = ?',
      [tunnus]
    );
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding user by username:', error);
    return false;
  }
};

const findUserByTunnus = async (tunnus) => {
  const sql = 'SELECT * FROM asiakas WHERE tunnus = ?';
  const [rows] = await promisePool.execute(sql, [tunnus]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM asiakas WHERE asiakas_id = ?',
      [id]
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

const updateUser = async (user, asiakas_id) => {
  const sql = promisePool.format(`UPDATE asiakas SET ? WHERE asiakas_id = ?`, [
    user,
    asiakas_id,
  ]);
  try {
    const rows = await promisePool.execute(sql);
    console.log('updateUser', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (e) {
    console.error('error', e.message);
    return false;
  }
};

const updateUserPassword = async (userId, hashedNewPassword) => {
  const sql = 'UPDATE asiakas SET salasana = ? WHERE asiakas_id = ?';
  const values = [hashedNewPassword, userId];

  try {
    const [result] = await promisePool.execute(sql, values);

    if (result.affectedRows === 0) {
      return false;
    }

    return true;

  } catch (error) {
    console.error("Virhe salasanan päivittämisessä:", error);
    throw error;
  }
};

const getAlennusRyhma = async (asiakas_id) => {
  try {
    const sql = 'SELECT allennus_ryhma FROM asiakas WHERE asiakas_id = ?';
    const [rows] = await promisePool.execute(sql, [asiakas_id]);

    if (rows.length === 0) {
      throw new Error('Asiakasta ei löydy');
    }

    return rows[0].allennus_ryhma;
  } catch (error) {
    throw error;
  }
};

export {
  listAllUsers,
  findUserById,
  addUser,
  findUserByUsername,
  findUserByTunnus,
  removeUser,
  updateUser,
  updateUserPassword,
  getAlennusRyhma
};
