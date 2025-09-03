import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>🏠 Addition v2 - Server Front</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Application Next.js avec système de thème intégré
      </p>
      
      <div style={{ 
        padding: '1rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>🧪 Tests Disponibles</h2>
        <Link 
          href="/test" 
          style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          🎨 Tester le Système de Thème
        </Link>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
          Cliquez pour accéder à la page de test interactive du système de thème
        </p>
      </div>
    </div>
  );
}
