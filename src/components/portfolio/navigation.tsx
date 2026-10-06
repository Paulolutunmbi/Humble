import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Monitor, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/data/projects';
const pageSections = ['Work', 'About', 'Engineering', 'Experience', 'Community', 'Learning', 'Contact'];
const navigationSections = ['Work', 'About', 'Engineering', 'Experience', 'Contact'];
type Theme = 'system' | 'light' | 'dark';
export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [activeSection, setActiveSection] = useState('work');
  useEffect(() => { const stored = localStorage.getItem('portfolio-theme'); if (stored === 'light' || stored === 'dark') setTheme(stored); }, []);
  useEffect(() => { const query = window.matchMedia('(prefers-color-scheme: dark)'); const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && query.matches)); apply(); query.addEventListener('change', apply); localStorage.setItem('portfolio-theme', theme); return () => query.removeEventListener('change', apply); }, [theme]);
  useEffect(() => {
    const targets = pageSections.map(section => document.getElementById(section.toLowerCase())).filter((target): target is HTMLElement => Boolean(target));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  const activeIndex = Math.max(0, pageSections.findIndex(section => section.toLowerCase() === activeSection));
  return <header className="site-header"><nav className="nav-inner" aria-label="Main navigation"><a href="#" className="wordmark" aria-label="Paul Olutunmbi home">paul<span>.</span><span className="wordmark-surname">olutunmbi</span></a><div className="desktop-nav">{navigationSections.map(section => <a key={section} href={`#${section.toLowerCase()}`} aria-current={activeSection === section.toLowerCase() ? 'location' : undefined}>{section}</a>)}</div><div className="nav-actions"><Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')} aria-label={`Color theme: ${theme}. Switch to ${theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'}`} title={`Theme: ${theme}`}>{theme === 'system' ? <Monitor /> : theme === 'light' ? <Sun /> : <Moon />}</Button><Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></nav><div className="section-progress" role="progressbar" aria-label={`Page section: ${pageSections[activeIndex]}`} aria-valuemin={1} aria-valuemax={pageSections.length} aria-valuenow={activeIndex + 1}><span className="section-progress-track" /><span className="section-progress-marker" style={{ left: `${(activeIndex / (pageSections.length - 1)) * 100}%` }} /></div>{menuOpen && <div className="mobile-nav">{navigationSections.map(section => <a key={section} href={`#${section.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{section}<ArrowUpRight size={17} /></a>)}<a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a></div>}</header>;
}
