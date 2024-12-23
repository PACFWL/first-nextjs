import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditUser() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${id}`);
    const user = await res.json();
    setFormData(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/users');
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
