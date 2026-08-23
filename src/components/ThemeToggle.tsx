import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'

type Theme = 'light' | 'dark'

function getCurrentTheme(): Theme {
  const savedTheme = localStorage.getItem('kyra-theme')

  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.dataset.theme = savedTheme
    return savedTheme
  }

  // No saved preference → always default to light
  document.documentElement.dataset.theme = 'light'
  return 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme)

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem('kyra-theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon aria-hidden="true" size={17} />
      ) : (
        <Sun aria-hidden="true" size={17} />
      )}
    </button>
  )
}