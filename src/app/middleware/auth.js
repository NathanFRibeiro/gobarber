import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

// Verifica se possue token de autenticação e realiza a validação
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Decodifica o token e obtem os dados gravados no payload.
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    console.log(req.userId);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
