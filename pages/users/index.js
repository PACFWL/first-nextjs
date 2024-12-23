import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/users');
    const users = await res.json();
    setData(users);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    fetchData();
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Link href="/users/create">Agregar Usuario</Link>
      <ul>
        {data.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <Link href={`/users/edit/${user._id}`}>Editar</Link>
            <button onClick={() => handleDelete(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
