'use client'
import { useEffect, useState } from "react";
import styles from '../styles/page.module.css'

// Interfaces
interface Actividad {
  titulo: string;
  dia: string;
  lugar: string;
  encargado: string;
  tipo: string;
}

interface Participante {
  nombreComp: string;
  apellidoComp: string;
  celular: number;
  funcion: string;
  edad: number;
}

interface Iniciativa {
  tituloPlan: string;
  descripcion: string;
  responsable: string;
  duracionMeses: number;
}

// Estados iniciales
const estadoInicialActividad: Actividad = {
  titulo: "",
  dia: "",
  lugar: "",
  encargado: "",
  tipo: ""
};

const estadoInicialParticipante: Participante = {
  nombreComp: "",
  apellidoComp: "",
  celular: 0,
  funcion: "",
  edad: 0
};

const estadoInicialIniciativa: Iniciativa = {
  tituloPlan: "",
  descripcion: "",
  responsable: "",
  duracionMeses: 0
};

export default function Home() {
  const miStorage = window.localStorage;

  const [actividad, setActividad] = useState(estadoInicialActividad);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [editActividadIndex, setEditActividadIndex] = useState<number | null>(null);

  const [participante, setParticipante] = useState(estadoInicialParticipante);
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [editParticipanteIndex, setEditParticipanteIndex] = useState<number | null>(null);

  const [iniciativa, setIniciativa] = useState(estadoInicialIniciativa);
  const [iniciativas, setIniciativas] = useState<Iniciativa[]>([]);
  const [editIniciativaIndex, setEditIniciativaIndex] = useState<number | null>(null);

  useEffect(() => {
    const act = miStorage.getItem("actividades");
    const par = miStorage.getItem("participantes");
    const ini = miStorage.getItem("iniciativas");

    if (act) setActividades(JSON.parse(act));
    if (par) setParticipantes(JSON.parse(par));
    if (ini) setIniciativas(JSON.parse(ini));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    stateSetter: Function,
    state: any
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "celular" || name === "edad" || name === "duracionMeses" ? Number(value) : value;
    stateSetter({ ...state, [name]: parsedValue });
  };

  // Registro / Actualización
  const registrarActividad = () => {
    if (editActividadIndex !== null) {
      if (confirm("¿Actualizar esta actividad?")) {
        const lista = [...actividades];
        lista[editActividadIndex] = actividad;
        setActividades(lista);
        miStorage.setItem("actividades", JSON.stringify(lista));
        setEditActividadIndex(null);
        setActividad(estadoInicialActividad);
      }
    } else {
      const lista = [...actividades, actividad];
      setActividades(lista);
      miStorage.setItem("actividades", JSON.stringify(lista));
      setActividad(estadoInicialActividad);
    }
  };

  const registrarParticipante = () => {
    if (editParticipanteIndex !== null) {
      if (confirm("¿Actualizar este participante?")) {
        const lista = [...participantes];
        lista[editParticipanteIndex] = participante;
        setParticipantes(lista);
        miStorage.setItem("participantes", JSON.stringify(lista));
        setEditParticipanteIndex(null);
        setParticipante(estadoInicialParticipante);
      }
    } else {
      const lista = [...participantes, participante];
      setParticipantes(lista);
      miStorage.setItem("participantes", JSON.stringify(lista));
      setParticipante(estadoInicialParticipante);
    }
  };

  const registrarIniciativa = () => {
    if (editIniciativaIndex !== null) {
      if (confirm("¿Actualizar esta iniciativa?")) {
        const lista = [...iniciativas];
        lista[editIniciativaIndex] = iniciativa;
        setIniciativas(lista);
        miStorage.setItem("iniciativas", JSON.stringify(lista));
        setEditIniciativaIndex(null);
        setIniciativa(estadoInicialIniciativa);
      }
    } else {
      const lista = [...iniciativas, iniciativa];
      setIniciativas(lista);
      miStorage.setItem("iniciativas", JSON.stringify(lista));
      setIniciativa(estadoInicialIniciativa);
    }
  };

  // Editar
  const editarActividad = (i: number) => {
    setActividad(actividades[i]);
    setEditActividadIndex(i);
  };

  const editarParticipante = (i: number) => {
    setParticipante(participantes[i]);
    setEditParticipanteIndex(i);
  };

  const editarIniciativa = (i: number) => {
    setIniciativa(iniciativas[i]);
    setEditIniciativaIndex(i);
  };

  // Eliminar
  const eliminarActividad = (i: number) => {
    if (confirm("¿Eliminar esta actividad?")) {
      const lista = actividades.filter((_, index) => index !== i);
      setActividades(lista);
      miStorage.setItem("actividades", JSON.stringify(lista));
    }
  };

  const eliminarParticipante = (i: number) => {
    if (confirm("¿Eliminar este participante?")) {
      const lista = participantes.filter((_, index) => index !== i);
      setParticipantes(lista);
      miStorage.setItem("participantes", JSON.stringify(lista));
    }
  };

  const eliminarIniciativa = (i: number) => {
    if (confirm("¿Eliminar esta iniciativa?")) {
      const lista = iniciativas.filter((_, index) => index !== i);
      setIniciativas(lista);
      miStorage.setItem("iniciativas", JSON.stringify(lista));
    }
  };

  return (
    <div className="app-container">

      {/* Formulario Actividad */}
      <section className="form-section">
        <h1>Formulario de Actividad</h1>
        <form>
          <input name="titulo" type="text" placeholder="Título" value={actividad.titulo} onChange={(e) => handleInputChange(e, setActividad, actividad)} />
          <input name="dia" type="date" value={actividad.dia} onChange={(e) => handleInputChange(e, setActividad, actividad)} />
          <input name="lugar" type="text" placeholder="Lugar" value={actividad.lugar} onChange={(e) => handleInputChange(e, setActividad, actividad)} />
          <input name="encargado" type="text" placeholder="Encargado" value={actividad.encargado} onChange={(e) => handleInputChange(e, setActividad, actividad)} />
          <select name="tipo" value={actividad.tipo} onChange={(e) => handleInputChange(e, setActividad, actividad)}>
            <option value="">Tipo de actividad</option>
            <option value="Taller">Taller</option>
            <option value="Charla">Charla</option>
            <option value="Reunión">Reunión</option>
          </select>
          <button type="button" onClick={registrarActividad}>{editActividadIndex !== null ? "Actualizar" : "Registrar"}</button>
        </form>
      </section>

      {/* Formulario Participante */}
      <section className="form-section">
        <h1>Formulario de Participante</h1>
        <form>
          <input name="nombreComp" type="text" placeholder="Nombre" value={participante.nombreComp} onChange={(e) => handleInputChange(e, setParticipante, participante)} />
          <input name="apellidoComp" type="text" placeholder="Apellido" value={participante.apellidoComp} onChange={(e) => handleInputChange(e, setParticipante, participante)} />
          <input name="celular" type="number" placeholder="Celular" value={participante.celular} onChange={(e) => handleInputChange(e, setParticipante, participante)} />
          <input name="edad" type="number" placeholder="Edad" value={participante.edad} onChange={(e) => handleInputChange(e, setParticipante, participante)} />
          <select name="funcion" value={participante.funcion} onChange={(e) => handleInputChange(e, setParticipante, participante)}>
            <option value="">Función</option>
            <option value="Voluntario">Voluntario</option>
            <option value="Encargado">Encargado</option>
          </select>
          <button type="button" onClick={registrarParticipante}>{editParticipanteIndex !== null ? "Actualizar" : "Registrar"}</button>
        </form>
      </section>

      {/* Formulario Iniciativa */}
      <section className="form-section">
        <h1>Formulario de Iniciativa</h1>
        <form>
          <input name="tituloPlan" type="text" placeholder="Título del plan" value={iniciativa.tituloPlan} onChange={(e) => handleInputChange(e, setIniciativa, iniciativa)} />
          <input name="descripcion" type="text" placeholder="Descripción" value={iniciativa.descripcion} onChange={(e) => handleInputChange(e, setIniciativa, iniciativa)} />
          <input name="responsable" type="text" placeholder="Responsable" value={iniciativa.responsable} onChange={(e) => handleInputChange(e, setIniciativa, iniciativa)} />
          <input name="duracionMeses" type="number" placeholder="Duración en meses" value={iniciativa.duracionMeses} onChange={(e) => handleInputChange(e, setIniciativa, iniciativa)} />
          <button type="button" onClick={registrarIniciativa}>{editIniciativaIndex !== null ? "Actualizar" : "Registrar"}</button>
        </form>
      </section>

      <hr />

      {/* Listados */}
      <section className="list-section">
        <h2>Actividades</h2>
        <ul>
          {actividades.map((a, i) => (
            <li key={i}>
              {a.titulo} - {a.dia} - {a.lugar} - {a.tipo} - {a.encargado}
              <button onClick={() => editarActividad(i)}>Editar</button>
              <button onClick={() => eliminarActividad(i)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Participantes</h2>
        <ul>
          {participantes.map((p, i) => (
            <li key={i}>
              {p.nombreComp} {p.apellidoComp} - {p.celular} - {p.funcion} - {p.edad} años
              <button onClick={() => editarParticipante(i)}>Editar</button>
              <button onClick={() => eliminarParticipante(i)}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Iniciativas</h2>
        <ul>
          {iniciativas.map((i, index) => (
            <li key={index}>
              {i.tituloPlan} - {i.descripcion} - Responsable: {i.responsable} - {i.duracionMeses} meses
              <button onClick={() => editarIniciativa(index)}>Editar</button>
              <button onClick={() => eliminarIniciativa(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}