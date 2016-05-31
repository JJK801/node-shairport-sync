# Documentation / API / Output / Stream

# (Class) Stdout extends [Stream](./README.md)

Provide this class to a [ShairportSync](../../ShairportSync.md) instance to make it output to stdout.

## Class

Create `ShairportSync` instance using Stdout this way:

```javascript
import {ShairportSync, Stdout} from 'shairport-sync';

const output = new Stdout();

const instance = new ShairportSync(output);
```

Read [Stream](./README.md) reference for full implementation.