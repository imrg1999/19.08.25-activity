import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashing = async(password) => {
    return await bcrypt.hash(password, saltRounds);
}