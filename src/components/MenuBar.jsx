import { useState } from 'react'

export default function MenuBar({ onOpen }) {
  const [openMenu, setOpenMenu] = useState(null)

  const toggle = (name) => setOpenMenu(openMenu === name ? null : name)
  const close = () => setOpenMenu(null)

  return (
    <div className="win-menubar" onMouseLeave={close} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <span onClick={() => toggle('sistema')}>Sistema</span>
        {openMenu === 'sistema' && (
          <div className="dropdown-menu">
            <div onClick={() => { onOpen('iniciarSesion'); close() }}>Iniciar sesión</div>
            <div onClick={() => { onOpen('localizacionBD'); close() }}>Localización BD</div>
            <div className="dropdown-sep" />
            <div onClick={close}>Salir</div>
          </div>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <span onClick={() => toggle('ayuda')}>Ayuda</span>
        {openMenu === 'ayuda' && (
          <div className="dropdown-menu">
            <div onClick={close}>Acerca de VSIAF</div>
            <div onClick={close}>Manual de usuario</div>
          </div>
        )}
      </div>
    </div>
  )
}
