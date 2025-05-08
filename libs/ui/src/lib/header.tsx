import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <h1>Custom header</h1>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/portfolio">Portfolio</Link>
    </header>
  )
}
