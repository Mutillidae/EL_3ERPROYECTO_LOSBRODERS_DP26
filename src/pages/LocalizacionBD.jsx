import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

export default function LocalizacionBD({ onClose }) {
  const [dir, setDir] = useState('c:\\vsiaf\\')
  const [saved, setSaved] = useState(false)

  return (
    <WindowFrame title="Localización de archivos" icon="📁" onClose={onClose} width={520} height={230}>
      <div className="win-content-band">LOCALIZACION DE ARCHIVOS</div>
      <div style={{ padding: '22px 24px' }}>
        <div style={{ fontWeight: 'bold', color: 'var(--text-navy)', marginBottom: 14 }}>
          Directorio donde se encuentra la Base de Datos
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, minWidth: 68 }}>Directorio:</label>
          <input
            className="field-input"
            style={{ flex: 1 }}
            value={dir}
            onChange={(e) => { setDir(e.target.value); setSaved(false) }}
          />
          <button
            className="btn-classic"
            style={{ width: 30 }}
            onClick={() => setDir((d) => d)}
            title="Explorar"
          >
            …
          </button>
        </div>
        {saved && (
          <div style={{ marginTop: 10, fontSize: 11, color: '#0a6b2a' }}>
            ✔ Ruta grabada correctamente.
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 20, display: 'flex', gap: 10 }}>
        <button className="btn-classic btn-primary" onClick={() => setSaved(true)}>Grabar</button>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}
