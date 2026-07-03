import { useState } from 'react'
import WindowFrame from '../components/WindowFrame.jsx'

export default function IniciarSesion({ onClose, onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const ingresar = () => {
    if (!usuario.trim() || !clave.trim()) {
      setError('Ingrese usuario y contraseña.')
      return
    }
    onLogin(usuario)
    onClose()
  }

  return (
    <WindowFrame title="Iniciar sesión" icon="🔑" onClose={onClose} width={380} height={260}>
      <div className="win-content-band">INICIAR SESION</div>
      <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: 12, minWidth: 78, fontWeight: 'bold' }}>Usuario:</label>
          <input className="field-input" style={{ flex: 1 }} value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: 12, minWidth: 78, fontWeight: 'bold' }}>Contraseña:</label>
          <input className="field-input" style={{ flex: 1 }} type="password" value={clave}
            onChange={(e) => setClave(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ingresar()} />
        </div>
        {error && <div style={{ fontSize: 11, color: '#8b1a1a' }}>{error}</div>}
      </div>
      <div style={{ position: 'absolute', bottom: 16, right: 20, display: 'flex', gap: 10 }}>
        <button className="btn-classic btn-primary" onClick={ingresar}>Ingresar</button>
        <button className="btn-classic" onClick={onClose}>Cancelar</button>
      </div>
    </WindowFrame>
  )
}
