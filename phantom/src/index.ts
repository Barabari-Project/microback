import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors';
import { Hono } from 'hono';

import Index from '../index.html';

const app = new Hono({ strict: false }).basePath('/e1');

app.use('*', cors({ origin: '*' }));

app
  .post('/err', async (c) => {
    const error = await c.req.json();
    let keys = [];
    await Promise.all(error.map(async (e) => {
      const key = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

      await c.env.ERR.put(key, JSON.stringify(e))
      keys.push(key);
      return key;
    }));
    return c.text(keys.join('+'));
  })
  .get('/err', async (c) => {
    const keys = await c.env.ERR.list();

    // WHAT THE F&CK IS THIS ABOMINATION
    const errors = await Promise.all(
      keys.keys.map(async ({ name: key }) => {
        const v = await c.env.ERR.get(key);
        return {
          key,
          value: JSON.parse(v)
        }
      })
    );
    return c.json(errors);
  })
  .get("/ping", (c) => c.text("pong"))
  .get("/", (c) => c.html(Index))
  .get('/static/*', serveStatic({ root: './static' }));

export default app;