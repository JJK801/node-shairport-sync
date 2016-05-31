# Documentation / API / Output

# (Interface) Stream extends [Output](../README.md)

## Interface

Implements `Stream` interface using:

```javascript
import {Stream} from 'shairport-sync';

class CustomStream extends Stream
{
    // This method must return a readeable stream containing PCM Audio from 'shairport-sync' command
    get stream () {
        return myStream;
    }
}
```

Read [Output](../README.md) reference for full implementation.

## Properties

`Output` instances expose the folowing properties:

Name | Type | Read-Only | Default | Desciption
---- | ---- | --------- | ------- | ----------
`stream` | [stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable) | true |  | A readable stream that can be piped to any other library.

## Built-in childs

Class | Type | Default | Description
----- | ---- | ------- | -----------
[Pipe](./Pipe.md) | *Class* | false | Pipe the output stream through a file.
[Stdout](./Stdout.md) | *Class* | true | Pipe the output stream through stdout.
