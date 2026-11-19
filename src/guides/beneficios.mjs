import { urls } from '../site.mjs';
import { bullets, link } from '../ui.mjs';

export default {
  slug: 'beneficios', title: 'Benefícios e parceiros', category: 'recursos', sectors: ['pessoal'],
  icon: 'descontos', summary: 'Descontos e condições dos parceiros.',
  image: 'beneficios.webp', terms: 'parcerias vantagens desconto estabelecimentos convênios Notion departamento pessoal',
  sections: [
    { id: 'acesso', title: 'Consultar as parcerias', html: `<p>A lista de parceiros fica no Notion. Abra o nome do estabelecimento para consultar o benefício e as orientações de uso.</p>${link('Ver parceiros e descontos', urls.partners, 'button button-primary', 'external')}` },
    { id: 'encontrar', title: 'O que está disponível', html: bullets(['Descontos em estabelecimentos parceiros da empresa.', 'Condições especiais negociadas para a equipe.', 'Novas parcerias, à medida que forem incluídas na lista.']) },
    { id: 'usar', title: 'Antes de usar um benefício', html: '<p>Abra a página do parceiro no dia em que for usar o benefício. Confira as regras do estabelecimento e se é preciso apresentar identificação. As condições podem mudar.</p>' }
  ]
};
