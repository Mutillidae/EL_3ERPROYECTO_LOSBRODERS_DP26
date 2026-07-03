import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

const SEED = [
  { usuario: 'admin', nombre: 'Administrador del Sistema', rol: 'Administrador', estado: 'ACTIVO' },
]

export default function Administradores({ onClose }) {
  const [usuarios, setUsuarios] = useState(SEED)
  const [form, setForm] = useState({ usuario: '', nombre: '', rol: 'Operador', clave: '' })
  const [editing, setEditing] = useState(false)

  const nuevo = () => {
    setForm({ usuario: '', nombre: '', rol: 'Operador', clave: '' })
    setEditing(true)
  }

  const guardar = () => {
    if (!form.usuario.trim()) return
    setUsuarios((u) => [...u, { usuario: form.usuario, nombre: form.nombre, rol: form.rol, estado: 'ACTIVO' }])
    setEditing(false)
  }

  return (
    <WindowFrame title="ADMINISTRADORES" icon="👤" onClose={onClose} width={640} height={480}>
      <div className="win-content-band">ADMINISTRACION DE USUARIOS</div>

      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Field label="Usuario" value={form.usuario} disabled={!editing} onChange={(v) => setForm((f) => ({ ...f, usuario: v }))} />
          <Field label="Nombre completo" value={form.nombre} disabled={!editing} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 'bold', minWidth: 40 }}>Rol</label>
            <select className="field-input" value={form.rol} disabled={!editing}
              onChange={(e) => setForm((f) => ({ ...f, rol: e.target.value }))}>
              <option>Administrador</option>
              <option>Operador</option>
              <option>Consulta</option>
            </select>
          </div>
          <Field label="Contraseña" type="password" value={form.clave} disabled={!editing} onChange={(v) => setForm((f) => ({ ...f, clave: v }))} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button className="btn-classic" onClick={nuevo}>Nuevo</button>
          <button className="btn-classic btn-primary" disabled={!editing} onClick={guardar}>Guardar</button>
          <button className="btn-classic" disabled={!editing} onClick={() => setEditing(false)}>Deshacer</button>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <table className="grid-table">
          <thead>
            <tr><th>Usuario</th><th>Nombre</th><th style={{ width: 110 }}>Rol</th><th style={{ width: 80 }}>Estado</th></tr>
          </thead>
          <tbody>
            {usuarios.map((u, i) => (
              <tr key={i}>
                <td>{u.usuario}</td><td>{u.nombre}</td><td>{u.rol}</td><td>{u.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ position: 'absolute', bottom: 16, right: 20 }}>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}

function Field({ label, value, onChange, disabled, type = 'text' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
      <label style={{ fontSize: 12, fontWeight: 'bold', minWidth: 90 }}>{label}</label>
      <input className="field-input" style={{ flex: 1 }} type={type} value={value} disabled={disabled}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
