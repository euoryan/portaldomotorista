import { urls } from '../site.mjs';
import { bullets, resourceLinks } from '../ui.mjs';

export default {
  slug: 'diretoriosdelinks', cover: 'diretoriolinks', title: 'Diretório de links', category: 'recursos', sectors: ['ti'],
  icon: 'aneis', summary: 'Formulários e sistemas da operação.',
  image: 'diretorio.webp', terms: 'formulários sistemas atalhos ficha mecânica crachá bot Telegram rotas',
  sections: [
    { id: 'links', title: 'Formulários e acessos', html: resourceLinks([
      ['Ficha mecânica', 'Preencha o registro do veículo.', urls.mechanic],
      ['Receber rotas', 'Consulte suas viagens no bot do Telegram.', urls.routesBot],
      ['Registro de crachá', 'Informe a ausência de crachá.', urls.badge],
      ['Guia para novos motoristas', 'Configure os acessos da primeira viagem.', '/guianovos/'],
      ['Guia Intelbras', 'Consulte os procedimentos do contrato.', '/guiaintelbras/'],
      ['Falar com o Tráfego', 'Atendimento pelo Telegram.', urls.support]
    ]) },
    { id: 'notas', title: 'Ao preencher os registros', html: bullets(['A ficha mecânica é obrigatória. Inclua os detalhes e os identificadores solicitados no formulário.', 'Registre toda ausência de crachá.', 'Use o bot de rotas apenas para as funções disponíveis no próprio aplicativo.']) }
  ]
};
