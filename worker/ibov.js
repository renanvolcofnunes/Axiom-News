// /api/ibov: busca a cotação do Ibovespa (com atraso de ~15 min) e devolve só o necessário para a página.
// Existe porque o navegador não consegue ler a fonte diretamente (bloqueio de CORS).

const FONTE = 'https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?interval=5m&range=1d';

export async function ibov() {
  try {
    const r = await fetch(FONTE, {
      headers: { 'User-Agent': 'Mozilla/5.0 (AxiomNews)', 'Accept': 'application/json' },
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    if (!r.ok) return resposta({ erro: 'fonte indisponível', status: r.status }, 502);
    const j = await r.json();
    const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
    if (!m || !m.regularMarketPrice) return resposta({ erro: 'resposta sem cotação' }, 502);
    return resposta({
      preco: m.regularMarketPrice,
      anterior: m.chartPreviousClose ?? m.previousClose,
      hora: m.regularMarketTime,
    });
  } catch (e) {
    return resposta({ erro: 'falha ao consultar a fonte' }, 502);
  }
}

function resposta(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
