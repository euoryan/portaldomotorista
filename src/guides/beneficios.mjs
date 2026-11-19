import { urls } from '../site.mjs';
import { bullets, link } from '../ui.mjs';

export default {
  slug: 'beneficios', title: 'Benefícios e parceiros', category: 'recursos', sectors: ['pessoal'],
  summary: 'Veja quais parceiros oferecem descontos para a equipe e confira as condições antes de usar um benefício.',
  image: 'beneficios.webp', terms: 'parcerias vantagens desconto estabelecimentos convênios Notion departamento pessoal',
  sections: [
    { id: 'acesso', title: 'Consultar as parcerias', html: `<p>A lista de parceiros fica no Notion. Abra o nome do estabelecimento para consultar o benefício e as orientações de uso.</p>${link('Ver parceiros e descontos', urls.partners, 'button button-primary', 'external')}` },
    { id: 'encontrar', title: 'O que está disponível', html: bullets(['Descontos em estabelecimentos parceiros da empresa.', 'Condições especiais negociadas para a equipe.', 'Novas parcerias, à medida que forem incluídas na lista.']) },
    { id: 'usar', title: 'Antes de usar um benefício', html: '<p>Consulte a página do parceiro no dia em que pretende utilizar o benefício. As condições podem mudar e alguns estabelecimentos pedem identificação ou têm regras próprias.</p>' }
  ]
};
