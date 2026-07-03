import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

const today = new Date()

export default function GenerarReportes({ onClose }) {
  const [grupoTodos, setGrupoTodos] = useState(true)
  const [auxiliarTodos, setAuxiliarTodos] = useState(true)
  const [activoTodos, setActivoTodos] = useState(true)
  const [oficinaTodos, setOficinaTodos] = useState(true)
  const [responsableTodos, setResponsableTodos] = useState(true)
  const [anioDe, setAnioDe] = useState(2015)
  const [anioA, setAnioA] = useState(currentYearSafe())
  const [generado, setGenerado] = useState(false)

  function currentYearSafe() {
    return today.getFullYear()
  }

  const generar = () => {
    setGenerado(true)
    setTimeout(() => setGenerado(false), 2500)
  }

  return (
    <WindowFrame title="REPORTES A MEDIDA" icon="🖨" onClose={onClose} width={560} height={520}>
      <div className="win-content-band small">UNIDAD: UA01&nbsp;&nbsp;&nbsp;Unidad de Activos Fijos</div>
      <div className="win-content-band">REPORTES</div>

      <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 'bold' }}>Entidad:</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <input className="field-input" style={{ width: 60 }} value="821" disabled />
            <input className="field-input" style={{ flex: 1 }} value="Administración Autónoma para Obras Sanitarias - Potosí" disabled />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 'bold' }}>Unidad:</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
            <input className="field-input" style={{ width: 60 }} value="UA01" disabled />
            <input className="field-input" style={{ flex: 1 }} value="Unidad de Activos Fijos" disabled />
            <button className="btn-classic">Consolidado</button>
          </div>
        </div>

        <div style={{ border: '1px solid #b9cbe0', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ReportRow label="Grupo:" code="0" todos={grupoTodos} setTodos={setGrupoTodos} />
          <ReportRow label="Auxiliar:" code="0" todos={auxiliarTodos} setTodos={setAuxiliarTodos} />
        </div>

        <div style={{ border: '1px solid #b9cbe0', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ReportRow label="Activo:" code="" todos={activoTodos} setTodos={setActivoTodos} />
          <ReportRow label="Oficina:" code="0" todos={oficinaTodos} setTodos={setOficinaTodos} />
          <ReportRow label="Responsable:" code="0" todos={responsableTodos} setTodos={setResponsableTodos} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #b9cbe0', padding: 12 }}>
          <label style={{ fontSize: 12 }}>De: Año:</label>
          <input className="field-input" style={{ width: 60 }} type="number" value={anioDe} onChange={(e) => setAnioDe(e.target.value)} />
          <span style={{ fontSize: 11 }}>Año Inicial de los Reportes a Generar</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #b9cbe0', borderTop: 'none', padding: '0 12px 12px', marginTop: -12 }}>
          <label style={{ fontSize: 12 }}>A: Año:</label>
          <input className="field-input" style={{ width: 60 }} type="number" value={anioA} onChange={(e) => setAnioA(e.target.value)} />
          <span style={{ fontSize: 11 }}>Año Final de los Reportes a Generar</span>
          <button className="btn-classic" style={{ marginLeft: 'auto' }}>Todos</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
          <span>Calculados A:</span>
          <span>Dia: <b>{String(today.getDate()).padStart(2, '0')}</b></span>
          <span>Mes: <b>{String(today.getMonth() + 1).padStart(2, '0')}</b></span>
          <span>Año: <b>{today.getFullYear()}</b></span>
          <span>UFV: <input className="field-input" style={{ width: 60 }} value="2.35998" disabled /></span>
          <button className="btn-classic">Hoy</button>
        </div>

        {generado && (
          <div style={{ fontSize: 12, color: '#0a6b2a', textAlign: 'center' }}>
            ✔ Reporte generado (simulado, sin datos reales).
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '10px 0' }}>
        <button className="btn-classic btn-primary" onClick={generar}>Reportes</button>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}

function ReportRow({ label, code, todos, setTodos }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <label style={{ fontSize: 12, minWidth: 80, fontWeight: 'bold' }}>{label}</label>
      <input className="field-input" style={{ width: 40 }} value={code} disabled />
      <select className="field-input" style={{ flex: 1 }} disabled={todos}>
        <option>-- todos --</option>
      </select>
      <button
        className="btn-classic"
        style={{ background: todos ? 'var(--btn-face-active)' : undefined }}
        onClick={() => setTodos((t) => !t)}
      >
        Todos
      </button>
    </div>
  )
}
