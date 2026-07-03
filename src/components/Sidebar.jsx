const MENU_ITEMS = [
  { key: 'activosFijos', label: 'Activos Fijos' },
  { key: 'gruposAuxiliares', label: 'Grupos y Auxiliares' },
  { key: 'oficinasResponsables', label: 'Oficinas y Responsables' },
  { key: 'generarReportes', label: 'Generar Reportes' },
  { key: 'administradores', label: 'Administradores' },
  { key: 'iniciarSesion', label: 'Iniciar sesión' },
  { key: 'respaldosBD', label: 'Respaldos BD' },
  { key: 'administrarUnidad', label: 'Administrar Unidad' },
  { key: 'localizacionBD', label: 'Localizacion BD' },
]

export default function Sidebar({ onOpen, activeKey, disabledKeys = [] }) {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-title">MENU PRINCIPAL</div>
      {MENU_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`btn-classic sidebar-btn${activeKey === item.key ? ' sidebar-btn-active' : ''}`}
          disabled={disabledKeys.includes(item.key)}
          onClick={() => onOpen(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
