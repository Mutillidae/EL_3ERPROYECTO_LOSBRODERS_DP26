import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

const currentYear = new Date().getFullYear()

export default function AdministrarUnidad({ onClose }) {
  const [log, setLog] = useState('')

  const accion = (msg) => setLog(msg)

  return (
    <WindowFrame title="ADMINISTRACION DE RECURSOS" icon="🖥" onClose={onClose} width={520} height={430}>
      <div className="win-content-band">ADMINISTRACION DE RECURSOS</div>
      <div style={{ display: 'flex', padding: 18, gap: 18 }}>
        <div style={{ width: 190 }}>
          <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 8, textAlign: 'center' }}>CIERRE DE GESTION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <button className="btn-classic" onClick={() => accion(`Gestión ${currentYear} cerrada.`)}>Cerrar Gestión</button>
            <button className="btn-classic" onClick={() => accion('Formulario de cambio de gestión abierto.')}>Cambiar Gestión</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-classic" onClick={() => accion('Herramienta de Importar/Exportar abierta.')}>Importar/Exportar</button>
            <button className="btn-classic" onClick={() => accion('Tabla de índices UFV abierta.')}>Indices UFV</button>
            <button className="btn-classic" onClick={() => accion('Panel de seguridad abierto.')}>Seguridad</button>
            <button className="btn-classic" onClick={() => accion('Reindexación completada.')}>Re-indexar</button>
            <button className="btn-classic" onClick={() => accion('Asistente de migración abierto.')}>Migrador</button>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="field-input" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            {currentYear}
          </div>
          <div style={{ background: '#eaf2fb', border: '1px solid #8ba3bd', minHeight: 46, padding: 6, fontSize: 12 }}>
            {log}
          </div>
          <div style={{
            flex: 1,
            border: '1px solid #8ba3bd',
            background: 'linear-gradient(135deg, #dceaf7, #9dbfdc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 46,
          }}>
            🖥️
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 20 }}>
        <button className="btn-classic" onClick={onClose}>Salir</button>
      </div>
    </WindowFrame>
  )
}
