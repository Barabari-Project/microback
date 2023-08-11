# Main Site

Baseline: The general layout is the same as a sveltekit project all `paths` are configured based on folder based routing. Schools editor is largely a wrapper around [Sveltemirror](https://github.com/plutoniumm/sveltemirror), find it's documentation [here](https://plutoniumm.github.io/sveltemirror/docs).

```tree
.
├── README.md
├── src
│   ├── <svelte stuff>
│   └── templates
├── static
│   ├── CNAME
│   ├── embed.html
│   └── embed.html
└── <config files>
```

## Template
In case a previous edit is not in `localstorage` the editor will load the template from `src/templates`. This is a simple `html` file which is loaded into the editor. The editor will also save the current state into `localstorage` so that the next time the editor is loaded it will load the previous state.

### Embedding
The editor also supports embedding which you can do using it as an iframe

```html
<iframe src="/embed" width="100%" height="500px"></iframe>

<script>
  // the editor accepts code from parent via post message
  const ifr = document.querySelector('iframe');
  const code = `
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
  `;
  iframe.postMessage({ type:'code', code }, '*');
</script>
```

An example is also shown in `embed.html`