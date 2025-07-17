import useEquipo from "./UseEquipo";

const About = () => {
  const { equipo } = useEquipo();
  // console.log('Datos que llegan al componente:', equipo);
  // if (loading) return <p>Cargando equipo...</p>;
  // if (error) return <p>Error: {error}</p>;
  return (
    <div className="textalign">
      <h1 >Sobre nuestro equipo</h1>
      <br />
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {equipo.map((member) => (
          <div
            key={member.nombre}
            style={{
              width: "360px",
              textAlign: "center",
            }}
            className="card"
          >
            <img
              src={member.imagen}
              alt={"Foto de perfil de " + member.nombre}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
            />
            <h3>{member.nombre}</h3>
            <p style={{ fontSize: "0.95rem", color: "" }}>
              {member.descripción}
            </p>
            <div className="contmini-icono">
              <a href={member.Github}>
                <img
                  src="../public/github.png"
                  alt="Logo de Github"
                  style={{ height: "30px" }}
                />
              </a>
              <a href={member.Linkedin}>
                <img
                  src="../public/linkedin.png"
                  alt="Logo de Linkedin"
                  style={{ height: "30px" }}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      <ul style={{ marginTop: "3rem", listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "1.5rem" }}>
          <h3>🚀 Misión</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            nihil architecto qui nam blanditiis fugit quam velit tempora
            inventore magnam exercitationem ipsum mollitia, ullam quas vel
            maiores neque perferendis nobis.
          </p>
        </li>
        <li style={{ marginBottom: "1.5rem" }}>
          <h3>🔭 Visión</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quod
            quidem unde eius aliquid! Pariatur libero eius sed, maxime
            aspernatur, ipsum deserunt ut sapiente magni at quia totam
            perferendis atque.
          </p>
        </li>
        <li>
          <h3>💖 Valores</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            voluptate deleniti, quo facere perferendis dolores hic ipsa libero
            distinctio nam soluta reprehenderit et maxime, consequuntur
            exercitationem esse quod impedit consectetur?
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;
