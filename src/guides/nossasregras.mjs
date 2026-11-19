import { bullets, link } from '../ui.mjs';
import { urls } from '../site.mjs';

export default {
  slug: 'nossasregras', title: 'Nossas regras', category: 'guias', sectors: ['empresa'],
  summary: 'Consulte as orientações da empresa para a garagem, o atendimento aos passageiros e cada etapa da viagem.',
  image: 'regras.webp', terms: 'manual checklist veículo manutenção pneus garagem horário rota ar-condicionado folga dispensa telefone visão',
  sections: [
    { id: 'checklist', title: 'Checklist do veículo', html: bullets([
      'Confira a água e o óleo do motor, a calibragem dos pneus e os níveis de diesel e ARLA.',
      'Teste as luzes de freio, as setas e os faróis. Antes de sair, confira se o ar está carregado.',
      'Registre as avarias que encontrar e encaminhe ao Tráfego.'
    ]) },
    { id: 'garagem', title: 'Na garagem', html: bullets(['Entre em primeira marcha, com o pisca-alerta ligado. Estacione nos locais indicados.', 'Abasteça na entrada e libere a área em seguida.', 'Antes de desligar o veículo, desligue o itinerário, os faróis, o ar e o pisca-alerta. Ao encerrar, organize cintos, bancos e cortinas.']) },
    { id: 'passageiros', title: 'Atendimento aos passageiros', html: '<p>Mantenha um atendimento profissional e respeitoso. Evite discussões e conversas privadas, salvo quando o Tráfego solicitar. Tenha cuidado ao abrir e fechar as portas e espere todos se acomodarem antes de partir.</p>' },
    { id: 'viagem', title: 'Durante a viagem', html: bullets(['O manual orienta manter o ar-condicionado a 23 °C e usar a luz de guia no corredor nas rotas noturnas.', 'Respeite os horários de cada ponto. Nunca passe antes da hora marcada.', 'Comunique atrasos imediatamente e mantenha a rota programada.']) },
    { id: 'comunicacao', title: 'Comunicação nos grupos', html: '<p>Avise no grupo quando iniciar a rota ou se houver atraso. Compartilhe a localização quando necessário. Se surgir um conflito, procure o Tráfego em particular e evite responder no grupo.</p>' },
    { id: 'operacao', title: 'Escala e itinerário', html: '<p>Confirme a escala e o veículo antes de começar. Siga a planilha ou o roteiro da viagem e confira o itinerário eletrônico. Em caso de dúvida, fale com a supervisão.</p>' },
    { id: 'emergencia', title: 'Em caso de emergência', html: `<p>Se precisar de socorro, acione o suporte imediatamente. Em caso de acidente, avise a supervisão e siga o ${link('procedimento de sinistro', '/sinistro/')}.</p>` },
    { id: 'folgas', title: 'Folgas e dispensas', html: '<p>Faça o pedido com antecedência e aguarde a confirmação oficial. Em uma emergência, avise assim que puder.</p>' },
    { id: 'contato', title: 'Contato do Tráfego', html: `<p>Ligue para ${link('(48) 99117-9435', 'tel:+5548991179435')} ou envie uma mensagem para ${link('@oppmotorista', urls.support)} no Telegram.</p>` },
    { id: 'visao', title: 'Visão da empresa', html: '<blockquote>“Ser a melhor empresa de transporte de passageiros do estado de Santa Catarina para nossos clientes, colaboradores e sócios.”</blockquote>' }
  ]
};
