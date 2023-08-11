# Main Site

Baseline: The general layout is the same as a sveltekit project all `paths` are configured based on folder based routing

```tree
.
├── README.md
├── content
│   └── <roadmaps>
├── plugins
│   ├── accordion
│   └── data
├── scripts
│   ├── build.sh
│   ├── lib/
│   └── meta.js
├── src
│   └── <svelte stuff>
├── static
│   ├── css/
│   ├── data/: Roadmaps
│   ├── errors.js: Global Error Logger
│   ├── favicon.png
│   ├── icons/: All icons
│   ├── images/: All large/prominent images
│   └── test/
└── <config files>
```

## General Website Caveats
### Stats
Main page stats are fetch from a [GSheet](https://docs.google.com/spreadsheets/d/1zWC5x7sAPFKI0ggBy9JErXpHk-F0IMzPI68zPqb70nw/). THIS IS A LIVE DATABASE. PLEASE TREAT IT WITH CARE. These are fetch everytime the main page is loaded.

### Icons
All icons which are not in `static/icons` are fetch via `BBS` which are in turn either redirected to `FontAwesome` into `fas`, `far` and `fab` or are custom icons with inline SVGs.

### Css
All CSS is based on atomic styling. It is effectively what tailwind does but more micro styles. All other CSS is manually written or is built from `AtomiCSS`.

Basic examples (find rest in the css file itself):
- `f`: Flex | `f-col`: Flex Column
- `fw4`: Font Weight 400 | `fw6`: Font Weight 600
- `m5`: Margin 5px | `m20`: Margin 20px
- `p5`: Padding 5px | `p20`: Padding 20px
- `rx5`: Border Radius 5px | `rx20`: Border Radius 20px
- `blur`: Filter Blur with parameters `--bg`, `--sz`
- `p-abs`: Position Absolute | `p-rel`: Position Relative
- `o-50`: Opacity 50% | `o-33`: Opacity 33%
- `w-33`: Width 33% | `w-100`: Width 100%
- etc.

## SEO
All SEO stuff is generated from `components/meta.svelte` for all: Static Crawlers, Twitter and Facebook. The `robots.txt` file has been set to the most liberal settings to allow full indexing. Cloudflare pages additionally also helps with SEO. We've also already registered the domain with google search console.

# Roadmaps

- H2: Section Title
- H3: Foldable Subsection Title
- Non-youtube links will be automatically converted to embeds

```yaml
---
title: "DSA Guide"
desc: "A basic roadmap for Data Structures and Algorithms covering all the important topics needed for every Software Engineer"
icon: "fas:sitemap"
draft: false
---

# Basics of Language
## Basics of C++
- https://www.youtube.com/watch?v=yGB9jhsEsr8&t=20s&ab_channel=CodeWithHarry
- https://geeksforgeeks.org/cpp-programming-basics/

## STL in C++
- https://www.youtube.com/watch?v=WgMPrLX-zsA&ab_channel=CodeHelp-byBabbar
```

```ts
interface FrontMatter {
  // displayed as H1
  title: string;
  // displayed under title
  desc: string;
  // icon to be displayed, fetched from BBS Icons
  icon: string;
  // if the roadmap is draft mode it gets ignored on build
  draft: boolean;
}
```

## Processing: ([Plugins](https://github.com/Barabari-Project/Barabari-Project/tree/main/plugins))
Each roadmap file is taken and an Abstract Syntax Tree is generated from the markdown file. The AST is then preprocessed as follows:

- All links are CHECKED against [list](https://github.com/Barabari-Project/Barabari-Project/blob/main/plugins/accordion/utils.js) for:
- - `Accepted`: These links are passed as is
- - `Warning`: These links are passed but a warning is generated of why it's preferable to use a different link
- - `Blocked`: These links are blocked and completely removed. And a warning is generated on why it's blocked

Once processed the AST is edited to remove out the old `href` and insert a new card for the link. These links contain the necessary metadata also which is pulled in from the `static/data` folder.

> [!IMPORTANT]
> You have to generate these metadata files beforehand manually before dev mode. When building the site the metadata is automatically generated.

## Metadata generation

```sh
node ./scripts/meta.js
```

This script creates a PromiseQueue with concurrency 6 and fetches metadata for each link in the `content` folder. The metadata is then stored in the `static/data` folder with the same name as the file. You can run this multiple times as the previous metadata is appended to and not overwritten. So don't worry if it fails midway due to network issues or system issues.

# Mini files
## Error handling (`errors.js`)
All errors are logged by `errors.js` and reported to global error logger which can be viewed at [E1](https://bbs.barabariproject.org/e1/).

This includes errors in main site and schools editor. Some preliminary information about the error file, line number and error message is logged. It also runs a counted to see most common error types so debugging is easier.

## Test Files (`test/*`)
When teaching kids about what requests are `/test/text` and `/test/json` may be used as a test endpoint to show how requests work. They're both hosted on main site and NOT BBS.

# Build
Local builds can be manually triggered by, this build cannot be deployed wit without `wrangler`.

```sh
node ./scripts/meta.js
sh ./scripts/build.sh
```

CI/CD is handled by GitHub Actions and the site is deployed to Cloudflare Pages automatically and is set to on push. So in case you're sure the website builds, just push to main and it will automatically deploy.

# Known tooling docs
- [Nodejs](https://nodejs.org/docs/latest/api/)
- [SvelteKit](https://kit.svelte.dev/docs)
- [Svelte](https://svelte.dev/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)
- [Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/)

Most of the tools are provided to us by the maintainers under MIT License. Plutoniumm's AtomiCSS is under GNU GPL v3.0. The Barabari Project logo is provided to Barabari for use by barabariproject.org, it's subdomains and it's operations only without allowance for distribution.