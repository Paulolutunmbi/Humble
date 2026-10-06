import { ArrowDownRight, ArrowUpRight, GitBranch, Github, Image, ShieldCheck, LockKeyhole, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project, ProjectStatus } from '@/data/projects';

export function Status({ status, note }: { status: ProjectStatus; note?: string | undefined }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}><span className="status-dot" />{status}{note && <span className="status-note"> / {note}</span>}</span>;
}
function Screenshot({ project }: { project: Project }) {
  return project.screenshot ? <div className="project-screenshot"><img src={project.screenshot} alt={`${project.name} application screenshot`} loading="lazy" /></div> : <div className="screenshot-placeholder"><Image size={20} strokeWidth={1.3} /><span>PROJECT SCREENSHOT</span><small>TODO · Add real {project.name} screenshot</small></div>;
}
function Flow({ project }: { project: Project }) {
  const Icon = project.id === 'nomi' ? ShieldCheck : project.id === 'crypto-vault' ? LockKeyhole : Radio;
  return <div className="architecture"><div className="architecture-label"><GitBranch size={14} /> SYSTEM AT A GLANCE <Icon size={16} /></div><div className="flow">{project.flow.map((step, i) => <div className="flow-part" key={step}><div className={`flow-node ${step === 'Approval' || step === 'TokenLocker' ? 'flow-node-accent' : ''}`}><span>0{i + 1}</span>{step}</div>{i < project.flow.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}</div>)}</div>{project.id === 'nomi' && <div className="approval-line"><span>Read → execute</span><span>Write → <b>Allow / Edit / Deny</b></span></div>}</div>;
}
export function ProjectBlock({ project, index }: { project: Project; index: number }) {
  return <article className={`project project-tier-${project.tier}`} id={project.id}>
    <div className="project-topline"><span className="mono project-number">0{index + 1} / {project.category}</span><Status status={project.status} note={project.statusNote} /></div>
    <div className="project-layout"><div className="project-copy"><h3>{project.name}<ArrowUpRight aria-hidden="true" /></h3><p className="project-description">{project.description}</p><div className="tech-tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div><p className="achievement"><ArrowDownRight size={16} />{project.achievement}</p><div className="project-links">{project.liveUrl ? <Button asChild variant="outline" size="sm"><a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a></Button> : <Button variant="outline" size="sm" disabled>Link coming soon <ArrowUpRight /></Button>}<Button asChild variant="ghost" size="sm"><a href={project.githubUrl} target="_blank" rel="noreferrer"><Github />GitHub</a></Button></div>{project.note && <p className="project-note">{project.note}</p>}</div><div className="project-visual"><Screenshot project={project} />{project.flow.length > 0 && <Flow project={project} />}</div></div>
    <details className="project-details"><summary>Engineering notes <span>+</span></summary><div className="details-grid">{project.details.map(detail => <div key={detail.title}><h4>{detail.title}</h4><p>{detail.text}</p></div>)}<div className="full-stack"><h4>Full stack & deployment</h4><p>{project.fullStack}</p></div>{project.id === 'nomi' && <div className="example-requests"><h4>Example requests</h4><p>“Find unread mail from my manager.”<br />“Reply to Paul and say thanks.”<br />“Put a call on my calendar tomorrow at 3.”</p></div>}</div></details>
  </article>;
}
