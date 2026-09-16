import { Briefcase, Folder, GraduationCap, Send, UserRound } from 'lucide-react'

export type MobileTab = 'home' | 'education' | 'experience' | 'projects' | 'me'

const tabs = [
  { id: 'home', label: 'Me', icon: UserRound },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'me', label: 'Connect', icon: Send },
] as const

export function MobileBottomNav({ activeTab, onSelect }: {
  activeTab: MobileTab
  onSelect: (hash: string) => void
}) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile section navigation">
      {tabs.map(({ id, label, icon: Icon }) => (
        <a key={id} href={`#${id}`} aria-current={activeTab === id ? 'location' : undefined}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            onSelect(`#${id}`)
          }}>
          <Icon size={21} strokeWidth={activeTab === id ? 2.3 : 1.7} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}
