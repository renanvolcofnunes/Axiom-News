# Axiom News

Portal de notícias do dia, sem lado: resumos próprios, várias fontes por assunto e as versões de cada lado quando há disputa.

## Como o site funciona

- `index.html`: o layout e o código da página. Raramente muda.
- `data/edicao.json`: todo o conteúdo da edição (manchete, editorias, agenda, mercado). As atualizações automáticas mexem só neste arquivo.
- `fotos/`: fotos da Agência Brasil (licença Creative Commons BY 3.0 BR), sempre com crédito do fotógrafo.
- `worker/`: código do Cloudflare Worker que publica o site e responde `/api/ibov` com a cotação do Ibovespa.
- `wrangler.jsonc` e `.assetsignore`: configuração da publicação no Cloudflare.
- `_headers`: regras de cache.
- `logo/` e `favicon.svg`: símbolo da marca (versão normal e negativa) e ícone da aba.

## Cotações ao vivo

A faixa do mercado busca dólar, euro e bitcoin na AwesomeAPI a cada minuto e o Ibovespa em `/api/ibov` (com atraso de cerca de 15 minutos). Se essas fontes falharem, aparecem os números gravados na última edição.

## Editar à mão

Abra `data/edicao.json` no GitHub, edite e salve (commit). O Cloudflare publica a nova versão em cerca de um minuto.

Cada matéria segue este formato:

```json
{
  "kicker": "Investigação",
  "quando": "Hoje",
  "titulo": "Título da matéria",
  "resumo": "Duas ou três frases.",
  "foto": { "src": "fotos/onibus.jpg", "credito": "Tomaz Silva/Agência Brasil" },
  "lados": [ { "quem": "Um lado", "txt": "..." }, { "quem": "Outro lado", "txt": "..." } ],
  "fontes": [ { "n": "Agência Brasil", "u": "https://..." } ]
}
```

`foto` e `lados` são opcionais. `"destaque": false` tira a matéria dos destaques do topo.
