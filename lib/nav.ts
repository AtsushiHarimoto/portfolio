export interface NavItemConfig {
  key: string;
  path: string;
  icon: string;
  gradient: string;
  glowColor: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { key: 'home', path: '/', icon: '家', gradient: 'from-[#ffc0d3]/20 to-[#ffc0d3]/5', glowColor: 'rgba(255,192,211,0.4)' },
  { key: 'projects', path: '/projects/', icon: '術', gradient: 'from-[#e8b4d4]/20 to-[#c096b4]/5', glowColor: 'rgba(232,180,212,0.4)' },
  { key: 'articles', path: '/articles/', icon: '法', gradient: 'from-[#c096b4]/20 to-[#a78bfa]/5', glowColor: 'rgba(192,150,180,0.4)' },
  { key: 'career', path: '/career/', icon: '道', gradient: 'from-[#a78bfa]/20 to-[#8b7cf7]/5', glowColor: 'rgba(167,139,250,0.4)' },
  { key: 'about', path: '/about/', icon: '人', gradient: 'from-[#8b7cf7]/20 to-[#6c5ce7]/5', glowColor: 'rgba(108,92,231,0.4)' },
];
