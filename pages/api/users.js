import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect(); 

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}