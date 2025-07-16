export default function EduPage() {
  return (
    <section style={{ padding: '1rem' }}>
      <h1>Educación sobre accesibilidad</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        marginBottom: '2.5rem',
        justifyContent: 'center'
      }}>
        <div className="card" style={{ minWidth: 260, flex: 1 }}>
          <h2>📖 Barreras urbanas</h2>
          <p>¿Qué son y cómo afectan a distintas personas? Aprende a identificarlas y reportarlas.</p>
        </div>
        <div className="card" style={{ minWidth: 260, flex: 1 }}>
          <h2>🚶‍♀️ Experiencias reales</h2>
          <p>Historias y testimonios sobre accesibilidad ciudadana y superación de barreras.</p>
        </div>
        <div className="card" style={{ minWidth: 260, flex: 1 }}>
          <h2>🧠 Buenas prácticas</h2>
          <p>Descubre cómo el diseño inclusivo mejora la vida de todos.</p>
        </div>
      </div>

      <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#888', textAlign: 'center' }}>
        La accesibilidad empieza cuando entendemos que no todas las personas recorren la ciudad igual.
      </p>
    </section>
  );
}