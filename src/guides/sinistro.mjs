import { bullets, icon, supportLink } from '../ui.mjs';

export default {
  slug: 'sinistro', title: 'Em caso de sinistro', category: 'operacao', sectors: ['dlv'],
  icon: 'onibus', summary: 'Como agir e registrar um acidente.',
  image: 'sinistro.webp', terms: 'procedimento colisão emergência ocorrência feridos SAMU 192 CNH CRLV áudio bonificação',
  sections: [
    { id: 'primeiro', title: 'Primeiras medidas', html: `
      <p>Antes de sair do veículo, verifique se o local é seguro. Confira como estão os passageiros. Se houver feridos, chame o SAMU.</p>
      <a class="emergency-contact" href="tel:192" aria-label="Ligar para o SAMU, 192">
        <span class="phone-icon">${icon('phone', 18)}</span><span class="service-name"><strong>SAMU 192</strong><small>Atendimento de urgência</small></span>
        <span class="call-action">Ligar ${icon('diagonal', 14)}</span></a>
      <p>Sinalize a via assim que for seguro. Evite discutir responsabilidades no local. Não assuma culpa nem se comprometa a pagar pelos danos.</p>` },
    { id: 'passos', title: 'Aviso e registro da ocorrência', html: `
      <h3>Avise o Tráfego</h3><p>Assim que for seguro, envie pelo Telegram o local, a situação dos passageiros e o que você já sabe sobre o acidente. Siga as orientações que receber.</p>
      ${supportLink('button button-outline', 'Comunicar o sinistro ao Tráfego')}
      <h3>Fotografe e anote os dados</h3><p>Faça os registros apenas quando puder circular em segurança.</p>
      ${bullets(['Fotografe a posição dos veículos na via, as placas e todos os lados de cada veículo.', 'Registre os danos no veículo da empresa e nos veículos de terceiros.', 'Fotografe a CNH e o CRLV do terceiro envolvido e anote um telefone de contato.'])}
      <h3>Grave um relato em áudio</h3><p>Informe a data, o horário, o local e o sentido em que você dirigia. Conte como foi a colisão e identifique os veículos envolvidos.</p>
      <p>Descreva os danos e diga se havia feridos. Relate apenas o que você viu.</p>` },
    { id: 'orientacoes', title: 'Orientações finais', html: '<p>O registro completo permite apurar a ocorrência. O descumprimento deste procedimento acarreta a perda da bonificação.</p>' },
    { id: 'dlv', title: 'Comparecimento ao DLV', html: '<p>No dia seguinte, compareça ao setor de Documentos, Licenças e Veículos no prazo de 24 horas úteis. O setor recebe seu relato e faz os registros complementares. Caso o DLV passe uma orientação diferente, siga a indicação do setor.</p>' }
  ]
};
