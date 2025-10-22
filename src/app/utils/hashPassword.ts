import bcrypt from 'bcrypt';
import config from '../configs';

export const hashPassword = async (plainPass: string): Promise<string> => {
  const saltRound = config.saltRound;

  const salt = await bcrypt.genSalt(saltRound);
  const hash = bcrypt.hash(plainPass, salt);

  return hash;
};
