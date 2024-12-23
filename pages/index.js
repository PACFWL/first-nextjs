import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido al CRUD con Next.js y MongoDB</h1>
      <Link href="/users">Ir a la lista de usuarios</Link>
    </div>
  );
}
