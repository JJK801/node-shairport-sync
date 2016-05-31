# Documentation / API / Output / Stream

# (Class) Pipe extends [Stream](./README.md)

Provide this class to a [ShairportSync](../../ShairportSync.md) instance to make it output to a pipe file.

## Class

Create `ShairportSync` instance using Pipe this way:

```javascript
import {ShairportSync, Pipe} from 'shairport-sync';

const output = new Pipe();

output.file = '/my/pipe/file/path';

const instance = new ShairportSync(output);


```

Read [Stream](./README.md) reference for full implementation.

## Properties

`Pipe` instances expose the folowing properties:

Name | Type | Read-Only | Default | Desciption
---- | ---- | --------- | ------- | ----------
`file` | *String* | false |  | The path to the pipe file. (can be changed only when instance ins stopped)