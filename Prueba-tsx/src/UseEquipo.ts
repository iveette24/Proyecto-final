import { useEffect, useState } from 'react';

export interface Equipo {
  id: number;
  nombre: string;
  imagen: string;
  Linkedin: string;
  Github: string;
  descripción: string;
}

export const useEquipo = () => {
  // CORREGIDO: Renombramos 'setCharacters' a 'setEquipo' para mayor claridad.
  const [equipo, setEquipo] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Añadido: para un mejor manejo de errores.

  useEffect(() => {
    // Definimos una función asíncrona dentro del useEffect para poder usar async/await.
    const fetchData = async () => {
      try {
        const response = await fetch('https://komuni-app-default-rtdb.europe-west1.firebasedatabase.app/perfiles.json');
        
        if (!response.ok) {
          throw new Error('Error al conectar con la base de datos.');
        }

        const data = await response.json();

        // IMPORTANTE: Transformamos el objeto de Firebase en un array.
        // Object.values(data) extrae todos los valores (los perfiles) del objeto y los pone en un array.
        const perfilesArray: Equipo[] = Object.values(data);
        
        // CORREGIDO: Actualizamos el estado con los datos transformados.
        setEquipo(perfilesArray);

      } catch (err) {
        // Si hay un error, lo guardamos en el estado de error.
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { equipo, loading, error };
};

export default useEquipo;