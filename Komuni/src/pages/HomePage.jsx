export default function HomePage() {
  return (
    <section style={{ padding: '1rem' }}>
      <h2>Bienvenida a Komuni</h2>
      <p>
        Esta es una plataforma colaborativa para reportar barreras urbanas, mejorar la accesibilidad
        y construir una comunidad más inclusiva.
      </p>

      <ul style={{ marginTop: '1rem' }}>
        <li>🗺️ Accede al <strong>Mapa</strong> y añade reportes tocando sobre las calles</li>
        <li>📚 Aprende sobre accesibilidad en la sección <strong>Educación</strong></li>
        <li>🤝 Ayuda a otras personas compartiendo tu experiencia local</li>
      </ul>

      <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
        Tu ciudad no es solo calles: es el reflejo de quién la habita.
      </p>
    </section>
  );
}