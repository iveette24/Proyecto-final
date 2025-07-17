import { useEffect, useState } from 'react';

export interface Equipo {
  id: number;
  nombre: string;
  image: string;
  species: string;
  status: string;
}

export const useEquipo = () => {
  const [equipo, setCharacters] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://komuni-app-default-rtdb.europe-west1.firebasedatabase.app/perfiles.json')
      .then((r) => r.json())
      .then((data) => {console.log(data)
        // setCharacters(data.results.slice(0, 21)); // ⇢ solo 9
        // setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { equipo, loading };
};

export default useEquipo;