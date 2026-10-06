import { describe, expect, it } from 'vitest';
import { projects, contactEmail } from '@/data/projects';

describe('Portfolio content integrity', () => {
  it('preserves project hierarchy and explicit missing assets', () => {
    expect(projects.filter(p => p.tier === 1).map(p => p.name)).toEqual(['NOMI', 'Crypto-Vault', 'Glimpse']);
    expect(projects.filter(p => p.tier === 2)).toHaveLength(2);
    expect(projects.filter(p => p.tier === 3).map(p => p.name)).toEqual(['BookDiverse']);
    expect(projects.filter(p => p.screenshot).length).toBe(5);
    expect(projects.find(p => p.id === 'crypto-vault')?.liveUrl).toBe('https://veridian-vault.vercel.app');
    expect(contactEmail).toBe('oluwatunmbipaul@gmail.com');
  });
  it('keeps testnet and frontend limitations visible in project data', () => {
    expect(projects.find(p => p.id === 'crypto-vault')?.note).toContain('Not independently audited');
    expect(projects.find(p => p.id === 'bookdiverse')?.achievement).toContain('No backend');
    expect(projects.every(p => p.githubUrl.startsWith('https://github.com/Paulolutunmbi/'))).toBe(true);
  });
});