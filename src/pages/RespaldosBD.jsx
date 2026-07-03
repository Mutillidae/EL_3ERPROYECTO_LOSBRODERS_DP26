import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

export default function RespaldosBD({ onClose }) {
  const [respaldos, setRespaldos] = useState([])
  const [selected, setSelected] = useState(null)

  const hacerRespaldo = () => {
    const now = new Date()
    const nuevo = {
      archivo: `vsiaf_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${now.getHours()}${now.getMinutes()}.zip`,
      dia: `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`,
      hora: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      usuario: 'admin',
      descripcion: 'Respaldo generado manualmente desde el sistema.',
    }
    setRespaldos((r) => [...r, nuevo])
  }

  const borrar = () => {
    if (selected === null) return
    setRespaldos((r) => r.filter((_, i) => i !== selected))
    setSelected(null)
  }

  return (
    <WindowFrame title="COPIAS DE SEGURIDAD VSIAF" icon="💾" onClose={onClose} width={660} height={430}>
      <div className="win-content-band">ADMINISTRACION DE BACKUPS</div>
      <div style={{ display: 'flex', gap: 16, padding: 16, height: 240 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 6 }}>RESPALDOS REALIZADOS:</div>
          <div style={{ flex: 1, background: '#eaf2fb', border: '1px solid #8ba3bd', overflowY: 'auto' }}>
            {respaldos.length === 0 && (
              <div style={{ padding: 8, fontSize: 12, color: '#555' }}>[VACIO...]</div>
            )}
            {respaldos.map((r, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  padding: '5px 8px',
                  fontSize: 12,
                  cursor: 'pointer',
                  background: selected === i ? 'var(--btn-face-active)' : 'transparent',
                }}
              >
                {r.archivo}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 6 }}>DESCRIPCION DE LOS ARCHIVOS DE RESPALDO</div>
          <table className="grid-table" style={{ marginBottom: 8 }}>
            <thead>
              <tr>
                <th>ARCHIVO<br /><span style={{ fontWeight: 'normal' }}>.zip</span></th>
                <th>DIA<br /><span style={{ fontWeight: 'normal' }}>/ /</span></th>
                <th>HORA</th>
                <th>USUARIO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selected !== null ? respaldos[selected]?.archivo.replace('.zip', '') : ''}</td>
                <td>{selected !== null ? respaldos[selected]?.dia : ''}</td>
                <td>{selected !== null ? respaldos[selected]?.hora : ''}</td>
                <td>{selected !== null ? respaldos[selected]?.usuario : ''}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>DESCRIPCION</div>
          <div style={{ flex: 1, background: '#eaf2fb', border: '1px solid #8ba3bd', padding: 6, fontSize: 12 }}>
            {selected !== null ? respaldos[selected]?.descripcion : ''}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, padding: '14px 0', borderTop: '1px solid #b9cbe0' }}>
        <button className="btn-classic btn-primary" onClick={hacerRespaldo}>Respaldar</button>
        <button className="btn-classic" disabled={selected === null}>Restaurar</button>
        <button className="btn-classic">Copiar a …</button>
        <button className="btn-classic">Copiar de …</button>
        <button className="btn-classic" disabled={selected === null} onClick={borrar}>Borrar</button>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}
