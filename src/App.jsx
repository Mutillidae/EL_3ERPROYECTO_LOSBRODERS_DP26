import { useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import StatusBar from './components/StatusBar.jsx'
import MenuBar from './components/MenuBar.jsx'
import FountainScene from './components/FountainScene.jsx'
import './styles/App.css'

import ActivosFijos from './pages/ActivosFijos.jsx'
import GruposAuxiliares from './pages/GruposAuxiliares.jsx'
import OficinasResponsables from './pages/OficinasResponsables.jsx'
import GenerarReportes from './pages/GenerarReportes.jsx'
import Administradores from './pages/Administradores.jsx'
import IniciarSesion from './pages/IniciarSesion.jsx'
import RespaldosBD from './pages/RespaldosBD.jsx'
import AdministrarUnidad from './pages/AdministrarUnidad.jsx'
import LocalizacionBD from './pages/LocalizacionBD.jsx'

const WINDOW_COMPONENTS = {
  activosFijos: ActivosFijos,
  gruposAuxiliares: GruposAuxiliares,
  oficinasResponsables: OficinasResponsables,
  generarReportes: GenerarReportes,
  administradores: Administradores,
  respaldosBD: RespaldosBD,
  administrarUnidad: AdministrarUnidad,
  localizacionBD: LocalizacionBD,
  // iniciarSesion handled separately (needs onLogin)
}

export default function App() {
  const [activeWindow, setActiveWindow] = useState(null)
  const [usuario, setUsuario] = useState('admin')
  const [loginOpen, setLoginOpen] = useState(false)

  const openWindow = (key) => {
    if (key === 'iniciarSesion') {
      setLoginOpen(true)
      return
    }
    // Si se aprieta el mismo botón, se cierra; si se aprieta otro, reemplaza al anterior.
    setActiveWindow((current) => (current === key ? null : key))
  }

  const closeWindow = (key) => {
    setActiveWindow((current) => (current === key ? null : current))
  }

  return (
    <div className="app-desktop">
      <div className="app-window">
        <div className="win-titlebar">
          <span className="win-titlebar-text app-window-titlebar-text">
            <span>🗄</span>
            <span>SISTEMA DE ACTIVOS FIJOS <small>— Administración Autónoma para Obras Sanitarias - Potosí</small></span>
          </span>
          <span className="win-controls">
            <button title="Minimizar">_</button>
            <button title="Maximizar">▢</button>
            <button className="win-close" title="Cerrar">✕</button>
          </span>
        </div>

        <MenuBar onOpen={openWindow} />

        <div className="app-content-label">SISTEMA DE ACTIVOS FIJOS</div>

        <Header usuario={usuario} />

        <div className="app-body">
          <Sidebar onOpen={openWindow} activeKey={activeWindow} />

          <div className="app-content">
            <div className="app-content-header">
              <div><b>ENTIDAD:</b> 821 &nbsp; Administración Autónoma para Obras Sanitarias - Potosí</div>
            </div>
            <div className="app-content-header" style={{ paddingTop: 0 }}>
              <div><b>UNIDAD:</b> UA01 &nbsp; Unidad de Activos Fijos</div>
            </div>
            <FountainScene />
          </div>
        </div>

        <StatusBar usuario={usuario} path="c:\vsiaf\" />
      </div>

      {activeWindow && WINDOW_COMPONENTS[activeWindow] && (() => {
        const Comp = WINDOW_COMPONENTS[activeWindow]
        return <Comp key={activeWindow} onClose={() => closeWindow(activeWindow)} />
      })()}

      {loginOpen && (
        <IniciarSesion
          onClose={() => setLoginOpen(false)}
          onLogin={(u) => setUsuario(u)}
        />
      )}
    </div>
  )
}
