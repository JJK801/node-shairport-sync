# Documentation / API

# (Interface) Output

## Interface

Implements `Output` interface using:

```javascript
import {Output} from 'shairport-sync';

class CustomOutput extends Output
{
    // This function must return the output name for 'shairport-sync' command's '--output' option.
    get name () {
        return 'my-custom-output-name';
    }

    // This function must return the output arguments for 'shairport-sync' command.
    get args () {
        return [
            ['-d', 'myValue']
        ];
    }

    start (proc) {
        if (!this.started) return; // no-op if instance is started

        super.start(proc);         // Use main logic

        // ... Put your custom logic here
    }
}
```

The previous example will result in a command like:

```
shairport-sync --output my-custom-output-name -- -d myValue
```

## Properties

`Output` instances expose the folowing properties:

Name | Type | Read-Only | Default | Desciption
---- | ---- | --------- | ------- | ----------
`name` | *String* | true |  | Name of the output for `shairport-sync` command.
`args` | *Array<String>* | true |  | Output arguments to be be passed to the `shairport-sync` command.
`started` | *Boolean* | true | false | Whether the output is started.

## Methods

`Output` instances expose the folowing methods:

## Methods

`ShairportSync` instances expose the folowing methods:

<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="4">Arguments</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>start</code></td>
      <td colspan="4"><code>(process)</code></td>
      <td>Start airplay receiver output</td>
    </tr>
    <tr>
     <td rowspan="2"></td>
      <td><code>process</code></td>
      <td><a href="https://nodejs.org/api/child_process.html#child_process_class_childprocess">ChildProcess</a></td>
      <td>true</td>
      <td></td>
      <td>ChildProcess started by the receiver</td>
    </tr>
  </tbody>
</table>

## Built-in childs

Class | Type | Default | Description
----- | ---- | ------- | -----------
[Pipe](./Stream/Pipe.md) | *Class* | false | Pipe the output stream through a file.
[Stdout](./Stream/Stdout.md) | *Class* | true | Pipe the output stream through stdout.
[Stream](./Stream/README.md) | *Interface* | false | Pipe the output PCM audio stream through a property.
