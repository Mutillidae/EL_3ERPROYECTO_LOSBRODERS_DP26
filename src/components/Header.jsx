export default function Header({ usuario }) {
  return (
    <div className="app-banner">
      <div className="app-banner-stripe">
        <span style={{ background: '#d52b1e' }} />
        <span style={{ background: '#f9e300' }} />
        <span style={{ background: '#007934' }} />
      </div>
      <div className="app-banner-logo">
        <div className="app-banner-title">V.S.I.A.F.</div>
        <div className="app-banner-subtitle">Sistema de Activos Fijos</div>
      </div>
      <div className="app-banner-user">
        <div><strong>USUARIO:</strong> {usuario}</div>
        <div><strong>BACKUPS:</strong> None</div>
      </div>
    </div>
  )
}
