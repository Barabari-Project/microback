# microback

| folder | description | service |
| --- | --- | --- |
| iconic | Icons Service | `hydrogen` |
| proxy | Proxy Service | `helium` |

## Usage
**Iconic**
```js
import {i1} from './routes';
// GET
const svg = await i1.get('fab:github');
// returns svg string

// NONE
const svg = i1.none('fab:github', { size: 32 });
// https://bbs.barabariproject.org/i1/fab:github?size=32
```

**Proxy**
```js
import {p1} from './routes';

// NONE
const url = p1.none('https://imgur.com/a/12345');
// https://bbs.barabariproject.org/p1/?url=https://imgur.com/a/12345
```

## License
[GPLv3](./LICENSE)