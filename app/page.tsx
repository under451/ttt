'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const miStorage = typeof window !== "undefined" ? window.localStorage : null;

  interface Actividad {
    titulo: string;
    dia: string;
    lugar: string;
    encargado: string;
    tipo: string;
  }

  const estadoInicialActividad: Actividad = {
    titulo: "",
    dia: "",
    lugar: "",
    encargado: "",
    tipo: ""
  };

  const [actividad, setActividad] = useState(estadoInicialActividad);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [editActividadIndex, setEditActividadIndex] = useState<number | null>(null);

  useEffect(() => {
    const item = miStorage?.getItem("actividades");
    if (item) setActividades(JSON.parse(item));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setter: Function,
    state: any
  ) => {
    const { name, value } = e.target;
    setter({ ...state, [name]: value });
  };

  const handleSave = () => {
    if (editActividadIndex !== null) {
      if (confirm("¿Desea actualizar este registro?")) {
        const lista = [...actividades];
        lista[editActividadIndex] = actividad;
        setActividades(lista);
        miStorage?.setItem("actividades", JSON.stringify(lista));
        setEditActividadIndex(null);
        setActividad(estadoInicialActividad);
      }
    } else {
      const lista = [...actividades, actividad];
      setActividades(lista);
      miStorage?.setItem("actividades", JSON.stringify(lista));
      setActividad(estadoInicialActividad);
    }
  };

  const handleEdit = (i: number) => {
    setActividad(actividades[i]);
    setEditActividadIndex(i);
  };

  const handleDelete = (i: number) => {
    if (confirm("¿Está seguro de eliminar este elemento?")) {
      const lista = actividades.filter((_, idx) => idx !== i);
      setActividades(lista);
      miStorage?.setItem("actividades", JSON.stringify(lista));
    }
  };

  return (
    <div className="app-container">
      <style>{`
        .app-container {
          font-family: sans-serif;
          background: #f9f9f9;
          padding: 30px;
          max-width: 800px;
          margin: auto;
          color: #111;
        }

        h1, h2 {
          color: #111;
          margin-bottom: 10px;
        }

        .form-section, .list-section {
          background: #fff;
          padding: 20px;
          margin-bottom: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          color: #111;
        }

        button {
          padding: 10px 16px;
          background-color: #007acc;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 5px;
        }

        button:hover {
          background-color: #005fa3;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          background: #f1f1f1;
          margin-bottom: 8px;
          padding: 10px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #111;
        }

        li span {
          flex-grow: 1;
        }

        li button {
          background-color: #4CAF50;
          margin-left: 5px;
        }

        li button:last-child {
          background-color: #e53935;
        }
      `}</style>

      <section className="form-section">
        <h1>Registrar Actividad</h1>
        <input
          name="titulo"
          placeholder="Título"
          value={actividad.titulo}
          onChange={(e) => handleInputChange(e, setActividad, actividad)}
        />
        <input
          name="dia"
          type="date"
          value={actividad.dia}
          onChange={(e) => handleInputChange(e, setActividad, actividad)}
        />
        <input
          name="lugar"
          placeholder="Lugar"
          value={actividad.lugar}
          onChange={(e) => handleInputChange(e, setActividad, actividad)}
        />
        <input
          name="encargado"
          placeholder="Encargado"
          value={actividad.encargado}
          onChange={(e) => handleInputChange(e, setActividad, actividad)}
        />
        <select
          name="tipo"
          value={actividad.tipo}
          onChange={(e) => handleInputChange(e, setActividad, actividad)}
        >
          <option value="">Selecciona Tipo</option>
          <option value="Taller Educativo">Taller Educativo</option>
          <option value="Taller Cultural">Taller Cultural</option>
          <option value="Taller Deportivo">Taller Deportivo</option>
          <option value="Charla Informativa">Charla Informativa</option>
          <option value="Charla Motivacional">Charla Motivacional</option>
          <option value="Actividad Recreativa">Actividad Recreativa</option>
        </select>
        <button onClick={handleSave}>
          {editActividadIndex !== null ? "Actualizar" : "Registrar"}
        </button>
      </section>

      <section className="list-section">
        <h2>Actividades Registradas</h2>
        <ul>
          {actividades.map((a, i) => (
            <li key={i}>
              <span>{a.titulo} - {a.dia} - {a.lugar} - {a.tipo} - {a.encargado}</span>
              <div>
                <button onClick={() => handleEdit(i)}>Editar</button>
                <button onClick={() => handleDelete(i)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
