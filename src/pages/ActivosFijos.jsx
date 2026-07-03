import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

const SEED = [
  { cod: '00001', descripcion: 'Escritorio de madera', grupo: 'Muebles y Enseres', valor: '850.00', oficina: 'Contabilidad', estado: 'ACTIVO' },
  { cod: '00002', descripcion: 'Computadora de escritorio', grupo: 'Equipo de Computación', valor: '4200.00', oficina: 'Activos Fijos', estado: 'ACTIVO' },
  { cod: '00003', descripcion: 'Impresora láser', grupo: 'Equipo de Computación', valor: '1100.00', oficina: 'Gerencia General', estado: 'ACTIVO' },
]

export default function ActivosFijos({ onClose }) {
  const [rows, setRows] = useState(SEED)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ descripcion: '', grupo: '', valor: '', oficina: '' })
  const [editing, setEditing] = useState(false)

  const nuevo = () => {
    setForm({ descripcion: '', grupo: '', valor: '', oficina: '' })
    setSelected(null)
    setEditing(true)
  }

  const guardar = () => {
    if (!form.descripcion.trim()) return
    const cod = String(rows.length + 1).padStart(5, '0')
    setRows((r) => [...r, { cod, ...form, estado: 'ACTIVO' }])
    setEditing(false)
  }

  const seleccionar = (i) => {
    setSelected(i)
    setForm(rows[i])
    setEditing(false)
  }

  return (
    <WindowFrame title="ACTIVOS FIJOS" icon="🗄" onClose={onClose} width={800} height={540}>
      <div className="win-content-band small">UNIDAD: UA01&nbsp;&nbsp;&nbsp;Unidad de Activos Fijos</div>
      <div className="win-content-band">ACTIVOS FIJOS</div>

      <div style={{ display: 'flex', gap: 20, padding: '14px 20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Field label="Descripción" value={form.descripcion} disabled={!editing}
            onChange={(v) => setForm((f) => ({ ...f, descripcion: v }))} />
          <Field label="Grupo" value={form.grupo} disabled={!editing}
            onChange={(v) => setForm((f) => ({ ...f, grupo: v }))} />
          <Field label="Valor Bs." value={form.valor} disabled={!editing}
            onChange={(v) => setForm((f) => ({ ...f, valor: v }))} />
          <Field label="Oficina" value={form.oficina} disabled={!editing}
            onChange={(v) => setForm((f) => ({ ...f, oficina: v }))} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 110 }}>
          <button className="btn-classic" onClick={nuevo}>Nuevo</button>
          <button className="btn-classic" disabled={selected === null} onClick={() => setEditing(true)}>Modificar</button>
          <button className="btn-classic btn-primary" disabled={!editing} onClick={guardar}>Guardar</button>
          <button className="btn-classic" disabled={!editing} onClick={() => setEditing(false)}>Deshacer</button>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ maxHeight: 260, overflowY: 'auto', border: '1px solid var(--grid-line)' }}>
          <table className="grid-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Cod.</th>
                <th>Descripción</th>
                <th>Grupo</th>
                <th style={{ width: 90 }}>Valor Bs.</th>
                <th>Oficina</th>
                <th style={{ width: 80 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={selected === i ? 'selected' : ''} onClick={() => seleccionar(i)}>
                  <td>{r.cod}</td>
                  <td>{r.descripcion}</td>
                  <td>{r.grupo}</td>
                  <td style={{ textAlign: 'right' }}>{r.valor}</td>
                  <td>{r.oficina}</td>
                  <td>{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '14px 0' }}>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}

function Field({ label, value, onChange, disabled }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <label style={{ fontSize: 12, minWidth: 90, fontWeight: 'bold' }}>{label}</label>
      <input
        className="field-input"
        style={{ flex: 1 }}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
