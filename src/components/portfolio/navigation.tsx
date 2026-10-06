import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Monitor, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/data/projects';
export const sections = ['Work', 'About', 'Engineering', 'Experience', 'Community', 'Learning', 'Contact'];
type Theme = 'system' | 'light' | 'dark';
export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  useEffect(() => { const stored = localStorage.getItem('portfolio-theme'); if (stored === 'light' || stored === 'dark') setTheme(stored); }, []);
  useEffect(() => { const query = window.matchMedia('(prefers-color-scheme: dark)'); const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && query.matches)); apply(); query.addEventListener('change', apply); localStorage.setItem('portfolio-theme', theme); return () => query.removeEventListener('change', apply); }, [theme]);
  return <header className="site-header"><nav className="nav-inner" aria-label="Main navigation"><a href="#" className="wordmark" aria-label="Paul Olutunmbi home">paul<span>.</span><span className="wordmark-surname">olutunmbi</span></a><div className="desktop-nav">{sections.map(section => <a key={section} href={`#${section.toLowerCase()}`}>{section}</a>)}</div><div className="nav-actions"><Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')} aria-label={`Color theme: ${theme}. Switch to ${theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'}`} title={`Theme: ${theme}`}>{theme === 'system' ? <Monitor /> : theme === 'light' ? <Sun /> : <Moon />}</Button><Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></nav>{menuOpen && <div className="mobile-nav">{sections.map(section => <a key={section} href={`#${section.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{section}<ArrowUpRight size={17} /></a>)}<a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a></div>}</header>;
}
