import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono().basePath('/e1');

app.use('*', cors({ origin: '*' }));

app
  .post('/err/', async (c) => {
    const error = await c.req.text();
    const key = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

    const res = await c.env.ERR.put(key, error);
    return c.text(key);
  });

export default app;