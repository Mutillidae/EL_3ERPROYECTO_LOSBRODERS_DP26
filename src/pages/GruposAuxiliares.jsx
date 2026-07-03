import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

const GRUPOS_SEED = [
  { cod: '1', nombre: 'Muebles y Enseres', depreciacion: '10%' },
  { cod: '2', nombre: 'Equipo de Computación', depreciacion: '25%' },
  { cod: '3', nombre: 'Vehículos', depreciacion: '20%' },
]

export default function GruposAuxiliares({ onClose }) {
  const [grupos, setGrupos] = useState(GRUPOS_SEED)
  const [selectedGrupo, setSelectedGrupo] = useState(0)
  const [auxiliares, setAuxiliares] = useState({
    0: ['Sillas', 'Mesas', 'Estantes'],
    1: ['Laptops', 'Impresoras'],
    2: ['Camionetas', 'Motocicletas'],
  })
  const [nuevoAuxiliar, setNuevoAuxiliar] = useState('')

  const agregarAuxiliar = () => {
    if (!nuevoAuxiliar.trim()) return
    setAuxiliares((a) => ({
      ...a,
      [selectedGrupo]: [...(a[selectedGrupo] || []), nuevoAuxiliar.trim()],
    }))
    setNuevoAuxiliar('')
  }

  return (
    <WindowFrame title="GRUPOS Y AUXILIARES" icon="🗂" onClose={onClose} width={700} height={480}>
      <div className="win-content-band small">UNIDAD: UA01&nbsp;&nbsp;&nbsp;Unidad de Activos Fijos</div>
      <div className="win-content-band">GRUPOS Y AUXILIARES</div>

      <div style={{ display: 'flex', gap: 16, padding: 16, height: 320 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 6 }}>GRUPOS</div>
          <div style={{ flex: 1, border: '1px solid var(--grid-line)', overflowY: 'auto' }}>
            <table className="grid-table">
              <thead><tr><th style={{ width: 40 }}>Cod</th><th>Nombre</th><th style={{ width: 70 }}>Deprec.</th></tr></thead>
              <tbody>
                {grupos.map((g, i) => (
                  <tr key={i} className={selectedGrupo === i ? 'selected' : ''} onClick={() => setSelectedGrupo(i)}>
                    <td>{g.cod}</td><td>{g.nombre}</td><td>{g.depreciacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 6 }}>
            AUXILIARES DE: {grupos[selectedGrupo]?.nombre}
          </div>
          <div style={{ flex: 1, border: '1px solid var(--grid-line)', overflowY: 'auto', background: '#fffbe0' }}>
            {(auxiliares[selectedGrupo] || []).map((a, i) => (
              <div key={i} style={{ padding: '5px 8px', fontSize: 12, borderBottom: '1px solid var(--grid-line)' }}>{a}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <input
              className="field-input"
              style={{ flex: 1 }}
              placeholder="Nuevo auxiliar..."
              value={nuevoAuxiliar}
              onChange={(e) => setNuevoAuxiliar(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarAuxiliar()}
            />
            <button className="btn-classic" onClick={agregarAuxiliar}>Agregar</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '12px 0' }}>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}
