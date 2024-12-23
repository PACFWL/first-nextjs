import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateUser() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/users');
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
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
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
