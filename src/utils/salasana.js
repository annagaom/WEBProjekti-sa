import bcrypt from 'bcrypt';

export const checkPassword = (salasana, hashedPassword) => {
    return bcrypt.compareSync(salasana, hashedPassword);
};