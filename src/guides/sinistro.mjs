import { bullets, icon, supportLink } from '../ui.mjs';

export default {
  slug: 'sinistro', title: 'Em caso de sinistro', category: 'operacao', sectors: ['dlv'],
  summary: 'O que fazer quando há um acidente, desde o atendimento aos passageiros até o registro no DLV.',
  image: 'sinistro.webp', terms: 'procedimento colisão emergência ocorrência feridos SAMU 192 CNH CRLV áudio bonificação',
  sections: [
    { id: 'primeiro', title: 'Primeiras medidas', html: `
      <p>Confira se é seguro sair do veículo e veja como estão os passageiros. Se houver feridos, chame o SAMU pelo 192. Sinalize o local assim que houver condições.</p>
      <div class="emergency"><div><strong>SAMU · 192</strong><span>Atendimento de urgência</span></div><a class="button" href="tel:192">${icon('phone', 16)} Ligar 192</a></div>
      <p>No local, evite discutir responsabilidades. Não assuma culpa nem se comprometa a pagar pelos danos.</p>` },
    { id: 'passos', title: 'Aviso e registro da ocorrência', html: `
      <h3>Avise o Tráfego</h3><p>Assim que for seguro, envie pelo Telegram o local, a situação dos passageiros e o que você já sabe sobre o acidente. Siga as orientações que receber.</p>
      ${supportLink('button button-outline', 'Comunicar o sinistro ao Tráfego')}
      <h3>Fotografe e anote os dados</h3><p>Faça os registros apenas quando puder circular em segurança.</p>
      ${bullets(['Fotografe a posição dos veículos na via, as placas e todos os lados de cada veículo.', 'Registre os danos no veículo da empresa e nos veículos de terceiros.', 'Fotografe a CNH e o CRLV do terceiro envolvido e anote um telefone de contato.'])}
      <h3>Grave um relato em áudio</h3><p>Informe a data, o horário, o local e o sentido em que você dirigia. Descreva como a colisão aconteceu, quais veículos estavam envolvidos, os danos observados e se havia feridos. Relate o que você viu e evite suposições.</p>` },
    { id: 'orientacoes', title: 'Orientações finais', html: '<p>O registro completo permite apurar a ocorrência. O descumprimento deste procedimento acarreta a perda da bonificação.</p>' },
    { id: 'dlv', title: 'Comparecimento ao DLV', html: '<p>No dia seguinte, compareça ao setor de Documentos, Licenças e Veículos no prazo de 24 horas úteis. O setor recebe seu relato e faz os registros complementares. Caso o DLV passe uma orientação diferente, siga a indicação do setor.</p>' }
  ]
};
