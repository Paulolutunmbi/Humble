import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactEmail, socialLinks } from '@/data/projects';
export function Contact() {
  const [notice, setNotice] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contactEmail) { setNotice('Paul’s email is not added yet. Please reach out on LinkedIn or GitHub.'); return; }
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setNotice('Your email app will open with your message ready to send.');
  }
  return <section id="contact" className="contact-section section"><div className="section-label"><span>07 / CONTACT</span><span>LET’S MAKE SOMETHING REAL</span></div><div className="contact-grid"><div><h2>Good things start<br />with a <em>conversation.</em></h2><p>Have a project, an opportunity or something interesting to share? I’d love to hear from you.</p><Button variant="outline" asChild={Boolean(contactEmail)} disabled={!contactEmail}>{contactEmail ? <a href={`mailto:${contactEmail}`}><Mail />{contactEmail}</a> : <><Mail />[ADD EMAIL]</>}</Button><div className="social-links">{Object.entries(socialLinks).map(([name, url]) => <a href={url} target="_blank" rel="noreferrer" key={name}>{name === 'x' ? 'X / Twitter' : name === 'website' ? 'Current site' : name.charAt(0).toUpperCase() + name.slice(1)}<ArrowUpRight size={16} /></a>)}</div></div><form onSubmit={submit}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Johnson" required /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="alex@example.com" required /></label></div><label>Your message<textarea name="message" placeholder="What do you have in mind?" rows={4} required /></label><Button type="submit">Compose email <ArrowUpRight /></Button><p className="form-note">Opens your email app. Nothing is stored here.</p>{notice && <p role="status" className="form-notice">{notice}</p>}</form></div></section>;
}
