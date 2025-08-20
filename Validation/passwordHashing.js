import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashing = async(password) => {
    return await bcrypt.hash(password, saltRounds);
}

export default hashing;