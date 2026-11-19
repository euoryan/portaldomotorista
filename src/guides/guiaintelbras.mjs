import { urls } from '../site.mjs';
import { bullets, link } from '../ui.mjs';

export default {
  slug: 'guiaintelbras', title: 'Guia Intelbras', category: 'operacao', sectors: ['empresa', 'trafego'],
  icon: 'camera', summary: 'Rotas, embarque e cartão de acesso.',
  image: 'intelbras.webp', terms: 'contrato cartão de acesso crachá grupo WhatsApp itinerário roteiro embarque',
  sections: [
    { id: 'portal', title: 'Portal do contrato', html: `<p>O portal da Intelbras reúne o link de cada rota, o roteiro e o grupo de WhatsApp usado no atendimento.</p>${link('Abrir portal do contrato', urls.intelbras, 'button button-primary', 'external')}` },
    { id: 'inicio', title: 'Início da viagem', html: `<p>Avise no grupo da rota quando a viagem começar. Compartilhar sua localização é opcional.</p><p>Se houver um bloqueio no caminho, informe o novo trajeto no grupo.</p>${link('Abrir comunidade no WhatsApp', urls.intelbrasGroup, 'text-link', 'external')}` },
    { id: 'gestao', title: 'Alterações de rota', html: bullets(['Siga as alterações enviadas pelo Tráfego.', 'Oriente o passageiro que quiser mudar a rota a fazer o pedido ao Departamento Pessoal da Intelbras.', 'Use os pontos de parada como referência para o atendimento.']) },
    { id: 'acesso', title: 'Cartão de acesso', html: `<p>O cartão é obrigatório. Se o passageiro esquecer o cartão, registre os dados do funcionário no formulário de ocorrência.</p>${link('Registrar ausência de cartão', urls.intelbrasAccess, 'button button-outline', 'external')}` }
  ]
};
