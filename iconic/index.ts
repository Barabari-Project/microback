import { cors } from 'hono/cors';
import { Hono } from 'hono';

const app = new Hono().basePath('/i1');

// cors for *.barabariproject.org & localhost
app.use('*',
  cors({
    origin: ['*.barabariproject.org', 'localhost']
  })
);

const icon_types = new Map([
  ['fab', "FortAwesome/Font-Awesome/6.x/svgs/brands"],
  ['far', "FortAwesome/Font-Awesome/6.x/svgs/regular"],
  ['fas', "FortAwesome/Font-Awesome/6.x/svgs/solid"]
]);

app.get('/:icon', async (c) => {
  let { icon } = c.req.param();
  let [type, name] = icon.split(':');

  if (!icon_types.has(type)) {
    return c.text('icon type not found', 404);
  }

  const value = icon_types.get(type);
  if (typeof value === 'string') {
    const url = `https://raw.githubusercontent.com/${value}/${name}.svg`;
    const res = await fetch(url).then(r => r.text());

    return c.text(res, 200, {
      'Content-Type': 'image/svg+xml'
    });
  }

  return c.text('icon type not found', 404);
});

export default app;