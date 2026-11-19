import { urls } from './site.mjs';

const shapes = {
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 20a2.2 2.2 0 0 0 4 0"/>',
  wrench: '<path d="M14 6a5 5 0 0 0-6 6L3.8 17a2.1 2.1 0 0 0 3.2 3l5-4.4A5.6 5.6 0 0 0 19.5 8l-3.6 3.1-3-3L16 4.5z"/>',
  badge: '<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M9 6V3h6v3m-1 6h4m-4 4h3M5.5 17c.5-2.5 5.5-2.5 6 0"/><circle cx="8.5" cy="11.5" r="1.6"/>',
  guides: '<path d="M4 5h4v15H4zM10 5h4v15h-4zM16 6l3-1 4 14-3 1z"/>',
  return: '<path d="M20 5v6a3 3 0 0 1-3 3H4m5-5-5 5 5 5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  external: '<path d="M14 3h7v7m-11 4L21 3m-1 11v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-4"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/>',
  announcement: '<path d="m3 10 14-5v14L3 14zm3 5 1 5h3l-1-4m12-7v5"/>',
  book: '<path d="M12 6v15M3 4c4 0 6 .5 9 2 3-1.5 5-2 9-2v14c-4 0-6 .5-9 2-3-1.5-5-2-9-2z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M8 13h8m-8 4h6"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  route: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h8a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h8"/>',
  phone: '<path d="M7 3H4c-1 0-2 1-2 2 1 9 8 16 17 17 1 0 2-1 2-2v-3l-5-2-2 2c-3-1-6-4-7-7l2-2z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-9v.01"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4 4 0 0 1-.5 9.5M8 21l1-2m4 2 1-2m4 2 1-2"/>',
  alert: '<path d="M12 3 2 20h20zM12 10v4.5m0 3v.01"/>',
  filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  rows: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  home: '<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>'
};

export function icon(name, size = 18) {
  const px = Math.round(size * .86);
  return `<svg width="${px}" height="${px}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shapes[name]}</svg>`;
}

export function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function link(label, href, className = 'text-link', glyph = '') {
  const external = /^https?:/.test(href);
  return `<a class="${className}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(label)}${glyph ? icon(glyph, 15) : ''}</a>`;
}

export function supportLink(className = 'button button-outline', label = 'Falar com o Tráfego') {
  return `<a class="${className}" href="${urls.support}" target="_blank" rel="noopener noreferrer">${icon('headset', 16)}<span>${label}</span></a>`;
}

export function bullets(items) {
  return `<ul class="reading-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

export function steps(items) {
  return `<ol class="reading-steps">${items.map(([title, detail]) =>
    `<li><div><strong>${title}</strong><p>${detail}</p></div></li>`).join('')}</ol>`;
}

export function resourceLinks(items) {
  return `<ul class="resources">${items.map(([title, desc, href]) => {
    const external = /^https?:/.test(href);
    return `<li><a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
      <span><strong>${title}</strong><small>${desc}</small></span>${icon(external ? 'external' : 'arrow', 16)}
    </a></li>`;
  }).join('')}</ul>`;
}
