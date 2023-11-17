import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono({ strict: false })
  .basePath('/p1')
  .use('*', cors({ origin: '*' }));

const get30x = (source: string): Promise<string> =>
  fetch(source, {
    method: 'HEAD',
    redirect: 'follow'
  })
    .then((response) => response.url);

app.get('/redirect', (c) => {
  const { url } = c.req.query();
  if (!url) return c.text('url is required', 400);

  return get30x(url).then(c.text);
});

app.get('/proxy', (c) => {
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
}).post('/proxy', async (c) => {
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