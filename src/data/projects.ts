export type ProjectStatus = 'COMPLETED' | 'IN PROGRESS' | 'APPLIED' | 'EXPLORING';
export interface Project {
  id: string; name: string; category: string; tier: 1 | 2 | 3; status: ProjectStatus; statusNote?: string;
  description: string; achievement: string; stack: string[]; fullStack: string; details: { title: string; text: string }[];
  liveUrl: string; githubUrl: string; screenshot: string; flow: string[]; progression: string; note?: string;
}
// Screenshots use the matching, filename-based assets in /public. Empty means unavailable.
export const projects: Project[] = [
  {
    id: 'nomi', name: 'NOMI', category: 'AI assistant / Productivity', tier: 1, status: 'COMPLETED', statusNote: 'MVP',
    description: 'An AI productivity assistant that turns natural-language instructions into safe, validated Gmail and Calendar actions.',
    achievement: 'The AI proposes. The user approves. The backend executes.',
    stack: ['React 19', 'Node.js', 'MongoDB', 'Groq', 'Google APIs'],
    fullStack: 'React 19, Vite, React Router, Tailwind, Firebase Auth · Node.js, Express 5, MongoDB, Mongoose, Firebase Admin · Groq with a configurable AI provider architecture · Gmail API, Google Calendar API, Google OAuth, Cloudinary · Vercel + Render',
    details: [
      { title: 'An explicit approval model', text: 'Read-only actions run immediately. Sending, editing and deleting require an explicit Allow / Edit / Deny decision. The AI never executes arbitrary actions directly.' },
      { title: 'Mail and calendar, connected', text: 'Gmail search, read, draft, reply, send, mark read and attachments. Calendar checks, event creation, modification and deletion, plus Google Meet information where supported.' },
      { title: 'Separate identity and permission', text: 'Firebase handles app sign-in; Google OAuth separately authorizes Gmail and Calendar access. Credentials stay server-side and Google tokens are encrypted at rest. Taken through Google’s OAuth verification and compliance process. A substantial automated backend test suite validates the workflows.' },
    ],
    liveUrl: 'https://nomi.olutunmbipaul.xyz', githubUrl: 'https://github.com/Paulolutunmbi/NOMi', screenshot: '/nomi.png',
    flow: ['User message', 'AI intent', 'Action proposal', 'Validation', 'Approval', 'Execution', 'Result'],
    progression: 'From application logic to safe, AI-driven workflows.',
  },
  {
    id: 'crypto-vault', name: 'Crypto-Vault', category: 'Web3 / Smart contracts', tier: 1, status: 'COMPLETED', statusNote: 'SEPOLIA TESTNET',
    description: 'A non-custodial ERC-20 token time-lock app. Lock tokens now; withdraw after a future unlock time.',
    achievement: 'Your wallet is your identity. The contract enforces the lock.',
    stack: ['Solidity', 'Hardhat', 'TypeScript', 'ethers.js', 'OpenZeppelin'],
    fullStack: 'Solidity 0.8.28, OpenZeppelin 5.6.1, Hardhat, TypeScript, Mocha, Ethers · React 19, Vite, TypeScript, Tailwind, ethers.js · Ethereum Sepolia, chain ID 11155111',
    details: [
      { title: 'A complete locking lifecycle', text: 'Connect wallet → select ERC-20 → enter amount and unlock time → approve → create lock → wait → withdraw. Active, ready-to-withdraw and completed locks, chain-time tracking, unlock notifications, transaction status, Sepolia token detection, demo faucet and PWA install.' },
      { title: 'Enforced on-chain', text: 'TokenLocker uses lock IDs, owner-only withdrawals, unlock-time checks, OpenZeppelin SafeERC20 and reentrancy protection. A 0.0001 ETH protocol fee applies. No backend account database. Demo tokens HumbleToken (HMT) and MockToken (MTK) have no real value.' },
    ],
    liveUrl: 'https://veridian-vault.vercel.app', githubUrl: 'https://github.com/Paulolutunmbi/Crypto-Vault', screenshot: '/cryptovault.png',
    flow: ['Frontend', 'EVM wallet', 'TokenLocker', 'Sepolia'],
    note: 'Educational testnet project. Not independently audited. Not production financial infrastructure.',
    progression: 'From backend trust to rules enforced on-chain.',
  },
  {
    id: 'glimpse', name: 'Glimpse', category: 'Full-stack / Social platform', tier: 1, status: 'COMPLETED',
    description: 'A full-stack social platform connecting authentication, REST APIs, media uploads and realtime communication.',
    achievement: 'From a user’s first login to a live, connected feed.',
    stack: ['React 19', 'Express', 'MongoDB', 'Socket.IO', 'Cloudinary'],
    fullStack: 'React 19, Vite, React Router, Tailwind, Axios, Socket.IO client · Node.js, Express, MongoDB, Cloudinary · Vercel + Render',
    details: [
      { title: 'The complete product flow', text: 'Accounts, login, profiles, feed, post creation, likes, comments, user discovery, Cloudinary avatars, settings/privacy and forgot-password flow.' },
      { title: 'Realtime meets structured APIs', text: 'Socket.IO delivers new posts, likes and post deletions. Bearer-token authentication, protected routes, Axios interceptors, an API service abstraction and centralized user state keep the application organized.' },
    ],
    liveUrl: 'https://glimpse-theta-swart.vercel.app', githubUrl: 'https://github.com/Paulolutunmbi/Glimpse', screenshot: '/glimpse.png',
    flow: ['React client', 'REST API', 'MongoDB', 'Socket.IO'],
    note: '~50 early users (approximate, earlier stage).', progression: 'Building the full-stack foundation: identity, data and realtime.',
  },
  {
    id: 'aminat-studio', name: 'Aminat Studio', category: 'Client / Artist portfolio + CMS', tier: 2, status: 'COMPLETED',
    description: 'A real client-facing product: a public artist portfolio and gallery with a protected content management system.',
    achievement: 'HTTP-only JWT sessions. No tokens in localStorage.',
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Cloudinary'],
    fullStack: 'React 19, TypeScript, Vite, React Router, Tailwind, Motion, Lucide · Node.js, Express, MongoDB, Cloudinary · Vercel + Render',
    details: [
      { title: 'Public gallery, private studio', text: 'Featured work, gallery filtering and search, artwork details, related work, about and contact. Admin login/logout, session checks, password change/reset, artwork CRUD, filters, drag-and-drop ordering and studio settings. The backend enforces a maximum of three featured artworks and handles Cloudinary media.' },
    ],
    liveUrl: 'https://aminatstudio.vercel.app', githubUrl: 'https://github.com/Paulolutunmbi/Aminat-Studio', screenshot: '/aminatstudio.png', flow: [], progression: 'Applying full-stack engineering to real client work.',
  },
  {
    id: 'velocity-garage', name: 'Velocity Garage', category: 'Frontend / Car marketplace', tier: 2, status: 'COMPLETED',
    description: 'A responsive car marketplace to discover, filter, compare and save vehicles.',
    achievement: 'Complete discovery flows with persistent favorites.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Firebase Auth'],
    fullStack: 'JavaScript, HTML, CSS, Firebase Authentication, localStorage',
    details: [{ title: 'Product-focused frontend', text: 'Search and filtering, vehicle comparison, favorites and saved vehicles, Firebase Authentication and localStorage persistence in a responsive interface.' }],
    liveUrl: 'https://velocity-garage-murex.vercel.app/', githubUrl: 'https://github.com/Paulolutunmbi/velocity-garage', screenshot: '/velocitygarage.png', flow: [], progression: 'Moving from static pages to interactive product experiences.',
  },
  {
    id: 'bookdiverse', name: 'BookDiverse', category: 'Learning project / Frontend only', tier: 3, status: 'COMPLETED',
    description: 'Where my frontend journey started: learning to build complete multi-page product experiences.',
    achievement: 'A student demo. No backend, database, real payments or authentication.',
    stack: ['HTML5', 'CSS3', 'Bootstrap 5.3.8'],
    fullStack: 'HTML5, CSS3, Bootstrap 5.3.8, Google Fonts, responsive design',
    details: [{ title: 'An e-commerce interface concept', text: 'A buying/selling books concept: landing, login/signup UI, book and bookstore details, cart, checkout and profile; vendor signup, dashboard and order UI. Frontend only.' }],
    liveUrl: 'https://glimpse-theta-swart.vercel.app/', githubUrl: 'https://github.com/Paulolutunmbi/project_bookdiverse-SQI', screenshot: '/bookdiverse.png', flow: [], progression: 'The starting point: understanding interfaces and user journeys.',
  },
];
export const contactEmail: string = 'oluwatunmbipaul@gmail.com';
export const socialLinks = {
  github: 'https://github.com/Paulolutunmbi', linkedin: 'https://www.linkedin.com/in/paul-olutunmbi-ba61752b6/',
  x: 'https://x.com/DevHumbl3', instagram: 'https://www.instagram.com/olutunmbipaul', website: 'https://olutunmbipaul.xyz',
};
