import './ThemeSelector.css'
import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233']
export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme()
  const toggle = (e) => {
    e.preventDefault()
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }
  console.log(mode)
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="dark/light toggle icon"
          onClick={toggle}
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }} // filter use to invert value
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  )
}
