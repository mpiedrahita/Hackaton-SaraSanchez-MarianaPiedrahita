import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';


export function crearRepositorioArchivo(ruta) {
  const leer = () => {
    if (!existsSync(ruta)) return [];
    const texto = readFileSync(ruta, 'utf8');
    return texto.trim() ? JSON.parse(texto) : [];
  };
  const escribir = (lista) => {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(lista, null, 2));
  };


  return {
    listar() {
      return leer();
    },
    obtener(id) {
      return leer().find((e) => e.id === id);
    },
    guardar(evaluacion) {
      const lista = leer();
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const mayor = lista.reduce((max, e) => Math.max(max, e.id), 0);
        const nueva = { ...evaluacion, id: mayor + 1 };
        lista.push(nueva);
        escribir(lista);
        return { ...nueva };
      }
      const i = lista.findIndex((e) => e.id === evaluacion.id);
      if (i === -1) lista.push({ ...evaluacion });
      else lista[i] = { ...evaluacion };
      escribir(lista);
      return { ...evaluacion };
    },
    eliminar(id) {
      const lista = leer();
      const restantes = lista.filter((e) => e.id !== id);
      if (restantes.length === lista.length) return false;
      escribir(restantes);
      return true;
    },
  };
}