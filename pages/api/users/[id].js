import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
      }
      break;
    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
      break;
    case 'DELETE':
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
