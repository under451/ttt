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

interface Evento {
  nombre: string;
  fecha: string;
  lugar: string;
  organizador: string;
}

interface Beneficiario {
  nombre: string;
  edad: number;
  direccion: string;
  tipo: string;
}

interface Proyecto {
  nombre: string;
  objetivo: string;
  responsable: string;
  presupuesto: number;
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

const estadoInicialEvento: Evento = {
  nombre: "",
  fecha: "",
  lugar: "",
  organizador: ""
};

const estadoInicialBeneficiario: Beneficiario = {
  nombre: "",
  edad: 0,
  direccion: "",
  tipo: ""
};

const estadoInicialProyecto: Proyecto = {
  nombre: "",
  objetivo: "",
  responsable: "",
  presupuesto: 0
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

  const [evento, setEvento] = useState(estadoInicialEvento);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [editEventoIndex, setEditEventoIndex] = useState<number | null>(null);

  const [beneficiario, setBeneficiario] = useState(estadoInicialBeneficiario);
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [editBeneficiarioIndex, setEditBeneficiarioIndex] = useState<number | null>(null);

  const [proyecto, setProyecto] = useState(estadoInicialProyecto);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [editProyectoIndex, setEditProyectoIndex] = useState<number | null>(null);

  useEffect(() => {
    const act = miStorage.getItem("actividades");
    const par = miStorage.getItem("participantes");
    const ini = miStorage.getItem("iniciativas");
    const evt = miStorage.getItem("eventos");
    const ben = miStorage.getItem("beneficiarios");
    const proy = miStorage.getItem("proyectos");

    if (act) setActividades(JSON.parse(act));
    if (par) setParticipantes(JSON.parse(par));
    if (ini) setIniciativas(JSON.parse(ini));
    if (evt) setEventos(JSON.parse(evt));
    if (ben) setBeneficiarios(JSON.parse(ben));
    if (proy) setProyectos(JSON.parse(proy));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    stateSetter: Function,
    state: any
  ) => {
    const { name, value } = e.target;
    const parsedValue = ["celular", "edad", "duracionMeses", "presupuesto"].includes(name) ? Number(value) : value;
    stateSetter({ ...state, [name]: parsedValue });
  };

  const crearHandlers = (estado: any, setEstado: Function, lista: any[], setLista: Function, index: number | null, setIndex: Function, storageKey: string, mensaje: string) => {
    if (index !== null) {
      if (confirm(`¿Actualizar ${mensaje}?`)) {
        const nuevaLista = [...lista];
        nuevaLista[index] = estado;
        setLista(nuevaLista);
        miStorage.setItem(storageKey, JSON.stringify(nuevaLista));
        setIndex(null);
        setEstado(estadoInicial(estado));
      }
    } else {
      const nuevaLista = [...lista, estado];
      setLista(nuevaLista);
      miStorage.setItem(storageKey, JSON.stringify(nuevaLista));
      setEstado(estadoInicial(estado));
    }
  };

  const estadoInicial = (estado: any) => {
    if ("titulo" in estado) return estadoInicialActividad;
    if ("nombreComp" in estado) return estadoInicialParticipante;
    if ("tituloPlan" in estado) return estadoInicialIniciativa;
    if ("fecha" in estado) return estadoInicialEvento;
    if ("direccion" in estado) return estadoInicialBeneficiario;
    if ("objetivo" in estado) return estadoInicialProyecto;
    return {};
  };

  const crearEditar = (i: number, lista: any[], setEstado: Function, setIndex: Function) => {
    setEstado(lista[i]);
    setIndex(i);
  };

  const crearEliminar = (i: number, lista: any[], setLista: Function, storageKey: string, mensaje: string) => {
    if (confirm(`¿Eliminar ${mensaje}?`)) {
      const nuevaLista = lista.filter((_: any, index: number) => index !== i);
      setLista(nuevaLista);
      miStorage.setItem(storageKey, JSON.stringify(nuevaLista));
    }
  };

  return (
    <div className="app-container">

      {/* Reutilizar secciones */}
      {/* Aquí deberías copiar/pegar el bloque del formulario como hiciste antes pero usando los nuevos estados */}

      {/* Listados */}
      <section className="list-section">
        <h2>Actividades</h2>
        <ul>
          {actividades.map((a, i) => (
            <li key={i}>
              {a.titulo} - {a.dia} - {a.lugar} - {a.tipo} - {a.encargado}
              <button onClick={() => crearEditar(i, actividades, setActividad, setEditActividadIndex)}>Editar</button>
              <button onClick={() => crearEliminar(i, actividades, setActividades, "actividades", "actividad")}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Participantes</h2>
        <ul>
          {participantes.map((p, i) => (
            <li key={i}>
              {p.nombreComp} {p.apellidoComp} - {p.celular} - {p.funcion} - {p.edad} años
              <button onClick={() => crearEditar(i, participantes, setParticipante, setEditParticipanteIndex)}>Editar</button>
              <button onClick={() => crearEliminar(i, participantes, setParticipantes, "participantes", "participante")}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Iniciativas</h2>
        <ul>
          {iniciativas.map((i, index) => (
            <li key={index}>
              {i.tituloPlan} - {i.descripcion} - Responsable: {i.responsable} - {i.duracionMeses} meses
              <button onClick={() => crearEditar(index, iniciativas, setIniciativa, setEditIniciativaIndex)}>Editar</button>
              <button onClick={() => crearEliminar(index, iniciativas, setIniciativas, "iniciativas", "iniciativa")}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Eventos</h2>
        <ul>
          {eventos.map((e, i) => (
            <li key={i}>
              {e.nombre} - {e.fecha} - {e.lugar} - {e.organizador}
              <button onClick={() => crearEditar(i, eventos, setEvento, setEditEventoIndex)}>Editar</button>
              <button onClick={() => crearEliminar(i, eventos, setEventos, "eventos", "evento")}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Beneficiarios</h2>
        <ul>
          {beneficiarios.map((b, i) => (
            <li key={i}>
              {b.nombre}, {b.edad} años - {b.direccion} ({b.tipo})
              <button onClick={() => crearEditar(i, beneficiarios, setBeneficiario, setEditBeneficiarioIndex)}>Editar</button>
              <button onClick={() => crearEliminar(i, beneficiarios, setBeneficiarios, "beneficiarios", "beneficiario")}>Eliminar</button>
            </li>
          ))}
        </ul>

        <h2>Proyectos</h2>
        <ul>
          {proyectos.map((p, i) => (
            <li key={i}>
              {p.nombre} - {p.objetivo} - Responsable: {p.responsable} - ${p.presupuesto}
              <button onClick={() => crearEditar(i, proyectos, setProyecto, setEditProyectoIndex)}>Editar</button>
              <button onClick={() => crearEliminar(i, proyectos, setProyectos, "proyectos", "proyecto")}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
