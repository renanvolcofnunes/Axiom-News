// Worker do Axiom News: entrega os arquivos do site e responde /api/ibov.
import { ibov } from './ibov.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/ibov') return ibov();
    return env.ASSETS.fetch(request);
  },
};
