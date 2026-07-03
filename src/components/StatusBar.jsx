export default function StatusBar({ usuario, path }) {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')

  return (
    <div className="app-statusbar">
      <span>👤 {usuario}</span>
      <span>📁 {path}</span>
      <span style={{ marginLeft: 'auto' }}>{hh}:{mm}</span>
    </div>
  )
}
