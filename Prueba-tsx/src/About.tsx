import useEquipo from "./UseEquipo";



// const team = [
//   {
//     name: "David",
//     img: "src/assets/img/pato2.jpg", // Pon la ruta correcta de la imagen
//     desc: "Frontend developer passionate about UI/UX and accessibility.",
//   },
//   {
//     name: "Ivette",
//     img: "src/assets/img/pato2.jpg",
//     desc: "Backend specialist focused on scalable and secure APIs.",
//   },
//   {
//     name: "Marc",
//     img: "src/assets/img/pato2.jpg",
//     desc: "Fullstack developer and DevOps enthusiast.",
//   },
// ];

const About = () => (
  <div style={{ padding: "2rem" }}>
    <h2>Sobre nuestro equipo</h2>
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {equipo.map((member) => (
        <div
          key={member.name}
          style={{
            background: "#f5f5f5",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "1.5rem",
            width: "220px",
            textAlign: "center",
          }}
        >
          <img
            src={member.img}
            alt={member.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />
          <h3>{member.name}</h3>
          <p style={{ fontSize: "0.95rem", color: "#444" }}>{member.desc}</p>
        </div>
      ))}
    </div>
    <ul style={{ marginTop: "2rem" }}>
      <li>
        <h3>Misión</h3>
      <p>En KOMUNI queremos facilitar </p> 
      </li>
      <li>
        <h3>Visión</h3>
      </li>
      <li>
        <h3>Valores</h3>
      </li>
    </ul>
  </div>
);

export default About;
