import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono({ strict: false })
  .basePath('/p1')
  .use('*', cors({ origin: '*' }));

app.get('/', (c) => {
  const { url } = c.req.query();
  if (!url) return c.text('url is required', 400);

  const headers = new Headers(c.req.headers || {});

  return fetch(url, { headers }).then((response) => {
    headers.set('access-control-allow-origin', '*');
    headers.set('access-control-allow-headers', '*');
    headers.set('access-control-allow-methods', '*');
    headers.set('access-control-allow-credentials', 'true');

    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  });
}).post('/', async (c) => {
  const { url } = c.req.query();
  if (!url) return c.text('url is required', 400);

  const body = await c.req.text();
  const headers = new Headers(c.req.headers || {});
  return fetch(url, {
    method: "POST", headers, body
  }).then((response) => new Response(
    response.body, {
    status: response.status,
    headers: response.headers
  })
  );
});

export default app;