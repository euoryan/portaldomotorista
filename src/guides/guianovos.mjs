import { urls } from '../site.mjs';
import { bullets, link, resourceLinks, steps } from '../ui.mjs';

export default {
  slug: 'guianovos', title: 'Guia para novos motoristas', category: 'guias', sectors: ['empresa'],
  summary: 'Prepare o celular para receber suas rotas e veja por onde começar na primeira viagem.',
  image: 'integracao.webp', terms: 'integração cadastro primeiro dia Telegram cadfastbot grupos passageiros contratos ar-condicionado',
  sections: [
    { id: 'config', title: 'Antes da primeira rota', html: steps([
      ['Instale o Telegram', `${link('Baixe o aplicativo', urls.telegram)}, crie sua conta e confirme o número do celular. A equipe usa o Telegram para se comunicar e enviar as viagens.`],
      ['Faça o cadastro de rotas', `Abra o ${link('@cadfastbot', urls.routesBot)} e preencha seus dados. Confira tudo antes de concluir. O sistema não permite editar o cadastro depois do envio.`],
      ['Salve o contato do Tráfego', `Adicione ${link('@oppmotorista', urls.support)} aos contatos. Você também pode guardar este portal nos favoritos do celular.`]
    ]) },
    { id: 'clientes', title: 'Clientes atendidos', html: '<p>Entre os contratos atendidos estão Intelbras, Mercado Livre, Renner, C-Pack, Schaefer, Gerdau, JBS, Liderança, EntreRios, ETE, Sodexo, Quantity, CBA e Visão.</p>' },
    { id: 'procedimentos', title: 'Na rotina de viagem', html: `
      <h3>No grupo da rota</h3>${bullets(['Avise quando iniciar a rota. Em caso de atraso, comunique os passageiros e o Tráfego.', 'Compartilhe sua localização quando necessário. Se houver um conflito, procure o Tráfego em particular.'])}
      <h3>Com os passageiros</h3><p>Atenda com respeito e evite prolongar discussões. Mantenha as conversas no grupo, salvo quando o Tráfego pedir contato em particular.</p>
      <h3>Antes de seguir</h3><p>Confirme se o passageiro está chegando e aguarde até que todos estejam acomodados. A orientação de integração indica ar-condicionado a 22 °C e luz do corredor acesa quando necessário.</p>
      ${resourceLinks([['Nossas regras', 'Manual do serviço de transporte', '/nossasregras/'], ['Em caso de sinistro', 'Atendimento e registro de acidentes', '/sinistro/']])}` }
  ]
};
