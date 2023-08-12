# microback

| folder | description | service |
| --- | --- | --- |
| iconic | Icons Service | `hydrogen` |

## Usage

```js
import BBS from './routes';

// GET
const svg = await BBS.i1.get('fab:github');
// returns svg string

// NONE
const svg = BBS.i1.none('fab:github', { size: 32 });
// https://bbs.barabariproject.org/i1/fab:github?size=32
```

## License
[GPLv3](./LICENSE)