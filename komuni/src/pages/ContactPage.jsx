import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef(null);
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const subject = encodeURIComponent(data.get("asunto") || "Contacto Komuni");
    const body = encodeURIComponent(
      `Nombre: ${data.get("nombre")}\nEmail: ${data.get("email")}\n\n${data.get("mensaje")}`
    );
    window.location.href = `mailto:komunitgn@gmail.com?subject=${subject}&body=${body}`;
    setMsg("Se abrirá tu gestor de correo para enviar el mensaje.");
  }

  return (
    <section style={{ maxWidth: 600, margin: "0 auto", padding: "2.5rem 1rem" }}>
      <div
        style={{
          background: "linear-gradient(90deg, #e0f7fa 0%, #fafdff 100%)",
          borderRadius: 20,
          boxShadow: "0 8px 32px #2aa19822",
          padding: "2.5rem 2rem 2rem 2rem",
          marginBottom: 36,
          textAlign: "center",
          position: "relative"
        }}
      >
        <img
          src="/icons/logo-solo.png"
          alt="Komuni"
          style={{
            width: 70,
            marginBottom: 12,
            filter: "drop-shadow(0 2px 8px #2aa19833)"
          }}
        />
        <h2 style={{
          color: "#2aa198",
          margin: "0 0 0.5em 0",
          fontWeight: 900,
          fontSize: "2.2rem",
          letterSpacing: "0.03em"
        }}>
          Contacto
        </h2>
        <p style={{
          color: "#20706e",
          fontSize: "1.18rem",
          marginBottom: 0,
          fontWeight: 500,
          lineHeight: 1.6
        }}>
          ¿Tienes dudas, sugerencias o quieres colaborar?<br />
          Escríbenos y te responderemos lo antes posible.
        </p>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #2aa19822",
          padding: "2.2rem 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          maxWidth: 440,
          margin: "0 auto"
        }}
      >
        <label style={{ fontWeight: 700, color: "#2aa198", fontSize: "1.07rem" }}>
          Nombre:
          <input
            type="text"
            name="nombre"
            required
            style={{
              width: "100%",
              marginTop: 7,
              padding: "0.85em",
              borderRadius: 10,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              background: "#fafdff",
              boxShadow: "0 1px 2px #2aa19811"
            }}
          />
        </label>
        <label style={{ fontWeight: 700, color: "#2aa198", fontSize: "1.07rem" }}>
          Email:
          <input
            type="email"
            name="email"
            required
            style={{
              width: "100%",
              marginTop: 7,
              padding: "0.85em",
              borderRadius: 10,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              background: "#fafdff",
              boxShadow: "0 1px 2px #2aa19811"
            }}
          />
        </label>
        <label style={{ fontWeight: 700, color: "#2aa198", fontSize: "1.07rem" }}>
          Asunto:
          <input
            type="text"
            name="asunto"
            placeholder="Motivo del mensaje"
            style={{
              width: "100%",
              marginTop: 7,
              padding: "0.85em",
              borderRadius: 10,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              background: "#fafdff",
              boxShadow: "0 1px 2px #2aa19811"
            }}
          />
        </label>
        <label style={{ fontWeight: 700, color: "#2aa198", fontSize: "1.07rem" }}>
          Mensaje:
          <textarea
            name="mensaje"
            rows={5}
            required
            style={{
              width: "100%",
              marginTop: 7,
              padding: "0.85em",
              borderRadius: 10,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              background: "#fafdff",
              resize: "vertical",
              boxShadow: "0 1px 2px #2aa19811"
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #2aa198, #3ecfcf)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "1rem 2.2rem",
            fontSize: "1.18rem",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 2px 12px #2aa19822",
            letterSpacing: "0.04em",
            marginTop: 12,
            transition: "background 0.2s"
          }}
        >
          Enviar
        </button>
        {msg && <p style={{ color: "#2aa198", marginTop: 8, textAlign: "center", fontWeight: 600 }}>{msg}</p>}
      </form>
      <div style={{
        marginTop: 38,
        textAlign: "center",
        color: "#888",
        fontSize: "1.09em",
        fontWeight: 500
      }}>
        O escríbenos directamente a{" "}
        <a href="mailto:komunitgn@gmail.com" style={{
          color: "#2aa198",
          fontWeight: 700,
          textDecoration: "underline"
        }}>
          komunitgn@gmail.com
        </a>
      </div>
    </section>
  );
}
