export function crearRepositorioMemoria() {
  let evaluaciones = [];
  const copia = (e) => ({ ...e });


  return {
    listar() {
      return evaluaciones.map(copia);
    },
    obtener(id) {
      const encontrada = evaluaciones.find((e) => e.id === id);
      return encontrada ? copia(encontrada) : undefined;
    },
    guardar(evaluacion) {
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const mayor = evaluaciones.reduce((max, e) => Math.max(max, e.id), 0);
        const nueva = { ...evaluacion, id: mayor + 1 };
        evaluaciones.push(nueva);
        return copia(nueva);
      }
      const i = evaluaciones.findIndex((e) => e.id === evaluacion.id);
      if (i === -1) evaluaciones.push(copia(evaluacion));
      else evaluaciones[i] = copia(evaluacion);
      return copia(evaluacion);
    },
    eliminar(id) {
      const antes = evaluaciones.length;
      evaluaciones = evaluaciones.filter((e) => e.id !== id);
      return evaluaciones.length < antes;
    },
  };
}