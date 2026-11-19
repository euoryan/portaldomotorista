import { bullets, icon } from '../ui.mjs';

const network = 'BLOCO B MOTORISTAS';
const password = 'onibus1001@';

export default {
  slug: 'wifimotoristas', title: 'Wi-Fi dos motoristas', category: 'recursos', sectors: ['ti'],
  icon: 'wifi', summary: 'Rede, senha e QR Code da unidade.',
  image: 'wifi.webp', terms: 'wifi wi-fi internet conexão qr code senha bloco b rede refeitório',
  sections: [
    { id: 'rede', title: 'Rede do Bloco B', html: `
      <p>O Wi-Fi está disponível nas áreas de descanso e nos refeitórios da unidade.</p>
      <div class="wifi-access"><div class="wifi-details">
        <span class="field-label">Nome da rede</span><strong class="network-name">${network}</strong>
        <label class="field-label" for="network-password">Senha de acesso</label>
        <input id="network-password" class="password-value" type="text" readonly value="${password}" spellcheck="false" autocomplete="off">
        <div class="wifi-actions" hidden><button type="button" class="button button-outline" data-toggle-pass aria-controls="network-password" aria-pressed="false">Mostrar senha</button><button type="button" class="button button-outline" data-copy>${icon('copy', 15)} Copiar</button></div>
        <span class="copy-status" role="status"></span></div>
        <details class="wifi-qr" open><summary>${icon('wifi', 15)} Conectar por QR Code ${icon('down', 14)}</summary>
          <figure class="wifi-code"><img width="144" height="144" src="/assets/images/wifi-bloco-b.png" alt="QR Code de conexão à rede BLOCO B MOTORISTAS"><figcaption>Aponte a câmera de outro celular.</figcaption></figure></details>
      </div>` },
    { id: 'conectar', title: 'Como conectar', html: '<h3>Neste celular</h3><p>Copie a senha acima e abra os ajustes de Wi-Fi. Escolha a rede <strong>BLOCO B MOTORISTAS</strong>, cole a senha e toque em conectar.</p><h3>Se o código estiver em outra tela</h3><p>Abra a câmera do celular e aponte para o QR Code. Toque na notificação, confirme a conexão e aguarde o ícone de Wi-Fi aparecer.</p>' },
    { id: 'ajuda', title: 'Se a conexão falhar', html: `${bullets(['Confira se você está em uma das áreas de cobertura.', 'Desative e ative o Wi-Fi do celular.', 'Se a rede já estiver salva, escolha a opção de esquecê-la e tente de novo.'])}<p class="reading-note">Se o problema continuar, informe ao Tráfego o nome da rede e o local da tentativa.</p>` }
  ]
};
