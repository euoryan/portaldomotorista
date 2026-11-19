export const brand = 'Portal do Motorista';

export const sectors = {
  empresa: 'Portal do Motorista',
  trafego: 'Tráfego',
  dlv: 'DLV (Documentos, Licenças e Veículos)',
  ti: 'Infraestrutura e TI (DevOps)',
  pessoal: 'Departamento Pessoal',
  pessoas: 'Gestão de Pessoas'
};

export const categoryNames = {
  guias: 'Orientações',
  operacao: 'Operação',
  recursos: 'Serviços'
};

export const urls = {
  support: 'https://t.me/oppmotorista',
  mechanic: 'https://euoryan.com/dt/fichamecanica/',
  routesBot: 'https://t.me/cadfastbot',
  badge: 'https://bit.ly/registrocrachas',
  telegram: 'https://telegram.org/apps',
  intelbras: 'https://alexandreturismo.com/portalintelbras/',
  intelbrasGroup: 'https://chat.whatsapp.com/Fab6eo9YprH2lew2MweLFJ',
  intelbrasAccess: 'https://zfrmz.com/SwdIV1FKbzZp7Eak9P4K',
  partners: 'https://alexandreroteiros.notion.site/Alexandre-Turismo-Parceiras-12d214b1b1b980e7a645d05ef6231d0f?source=copy_link'
};

// Os próximos guias entram automaticamente depois destes, por título.
export const guideOrder = [
  'guianovos', 'sinistro', 'nossasregras', 'diretoriosdelinks',
  'guiaintelbras', 'beneficios', 'wifimotoristas', 'bonificacao'
];

export const workLinks = [
  { label: 'Ficha mecânica', href: urls.mechanic, icon: 'wrench' },
  { label: 'Receber rotas', href: urls.routesBot, icon: 'route' },
  { label: 'Registrar falta de crachá', href: urls.badge, icon: 'badge' }
];

// A ordem da lista é a ordem de exibição. A data de publicação é opcional (AAAA-MM-DD).
// Campos: title, text, icon (cloud, alert, bell...), tone (info | warn | alert), href e cta opcionais.
export const notices = [
  {
    title: 'Cuidado com ruas alagadas', date: '2026-11-19', icon: 'cloud', tone: 'warn',
    text: 'A previsão do tempo indica chuva nos próximos dias. Não entre em ruas alagadas. Se a rua estiver alagada, pare e ligue para o Tráfego.'
  },
  {
    title: 'Siga os procedimentos em caso de acidente', date: '2026-11-19', icon: 'alert', tone: 'alert',
    text: 'Se houver um sinistro, garanta a segurança do local e acione o SAMU quando houver feridos. Depois, siga o passo a passo para registrar a ocorrência.',
    href: '/sinistro/', cta: 'Ver procedimentos'
  }
];
