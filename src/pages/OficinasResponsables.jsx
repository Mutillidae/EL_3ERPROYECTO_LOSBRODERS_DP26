import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

let nextId = 1

export default function OficinasResponsables({ onClose }) {
  const [cod, setCod] = useState('')
  const [nombreOficina, setNombreOficina] = useState('')
  const [observacion, setObservacion] = useState('')
  const [activo, setActivo] = useState(false)
  const [responsables, setResponsables] = useState([])
  const [editing, setEditing] = useState(false)
  const [selected, setSelected] = useState(null)

  const nuevo = () => {
    setCod('')
    setNombreOficina('')
    setObservacion('')
    setEditing(true)
  }

  const guardar = () => {
    if (!nombreOficina.trim()) return
    setActivo(true)
    setEditing(false)
    if (!cod) setCod(String(nextId++).padStart(3, '0'))
  }

  const deshacer = () => {
    setEditing(false)
  }

  const agregarResponsable = () => {
    setResponsables((r) => [
      ...r,
      { cod: String(r.length + 1).padStart(2, '0'), responsable: '', cargo: '', ci: '', expedido: '', estado: 'ACTIVO' },
    ])
  }

  return (
    <WindowFrame title="OFICINA" icon="🏢" onClose={onClose} width={760} height={520}>
      <div className="win-content-band small">UNIDAD: UA01 — Unidad de Activos Fijos</div>
      <div className="win-content-band">OFICINA</div>

      <div style={{ display: 'flex', gap: 20, padding: '14px 20px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <label style={{ fontSize: 12, minWidth: 60, fontWeight: 'bold' }}>Oficina</label>
            <input className="field-input" style={{ width: 60 }} value={cod} disabled />
            <select
              className="field-input"
              style={{ flex: 1 }}
              value={nombreOficina}
              disabled={!editing}
              onChange={(e) => setNombreOficina(e.target.value)}
            >
              <option value="">-- seleccione o escriba una nueva --</option>
              <option value="Gerencia General">Gerencia General</option>
              <option value="Contabilidad">Contabilidad</option>
              <option value="Activos Fijos">Activos Fijos</option>
            </select>
            <span style={{
              fontSize: 11, fontWeight: 'bold', padding: '3px 10px',
              background: activo ? '#d7f2d7' : '#f2d7d7',
              color: activo ? '#0a6b2a' : '#8b1a1a', border: '1px solid #999',
            }}>
              {activo ? 'ACTIVO' : 'INACTIVO'}
            </span>
          </div>
          {editing && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <label style={{ fontSize: 12, minWidth: 60 }}></label>
              <input
                className="field-input"
                style={{ flex: 1 }}
                placeholder="Nombre de la oficina (si es nueva)"
                value={nombreOficina}
                onChange={(e) => setNombreOficina(e.target.value)}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <label style={{ fontSize: 12, minWidth: 60, fontWeight: 'bold' }}>Observación</label>
            <textarea
              className="field-input"
              style={{ flex: 1, height: 46, resize: 'none' }}
              value={observacion}
              disabled={!editing}
              onChange={(e) => setObservacion(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 100 }}>
          <button className="btn-classic" onClick={nuevo}>Nuevo</button>
          <button className="btn-classic" disabled={!editing} onClick={guardar}>Modificar</button>
          <button className="btn-classic" disabled={activo || !cod} onClick={() => setActivo(true)}>Activar</button>
          <button className="btn-classic" disabled={!activo || !cod} onClick={() => setActivo(false)}>Inactivar</button>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ maxHeight: 210, overflowY: 'auto', border: '1px solid var(--grid-line)' }}>
          <table className="grid-table">
            <thead>
              <tr>
                <th style={{ width: 50 }}>Cod.</th>
                <th>Responsable</th>
                <th>Cargo</th>
                <th style={{ width: 70 }}>CI</th>
                <th style={{ width: 80 }}>Expedido</th>
                <th style={{ width: 80 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {responsables.map((r, i) => (
                <tr
                  key={i}
                  className={selected === i ? 'selected' : ''}
                  onClick={() => setSelected(i)}
                >
                  <td>{r.cod}</td>
                  <td>
                    <input
                      className="field-input"
                      style={{ width: '100%', border: 'none', background: 'transparent' }}
                      value={r.responsable}
                      onChange={(e) => {
                        const v = e.target.value
                        setResponsables((rows) => rows.map((row, idx) => idx === i ? { ...row, responsable: v } : row))
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="field-input"
                      style={{ width: '100%', border: 'none', background: 'transparent' }}
                      value={r.cargo}
                      onChange={(e) => {
                        const v = e.target.value
                        setResponsables((rows) => rows.map((row, idx) => idx === i ? { ...row, cargo: v } : row))
                      }}
                    />
                  </td>
                  <td>{r.ci}</td>
                  <td>{r.expedido}</td>
                  <td>{r.estado}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 6 - responsables.length) }).map((_, i) => (
                <tr key={`empty-${i}`}><td colSpan={6}>&nbsp;</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '14px 0' }}>
        <button className="btn-classic" disabled={!activo}>Activar</button>
        <button className="btn-classic" disabled={!activo}>Inactivar</button>
        <button className="btn-classic" onClick={agregarResponsable}>Nuevo</button>
        <button className="btn-classic">Modificar</button>
        <button className="btn-classic btn-primary">Guardar</button>
        <button className="btn-classic">Deshacer</button>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}
