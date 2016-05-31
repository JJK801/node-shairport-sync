# Documententation / API

# (Class) ShaiportSync extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

## Class

Create `ShairportSync` instance using:

```javascript
new ShairportSync(output)
```

With this arguments:

Name | Type | Required | Default
---- | ---- | -------- | -------
`output` | [Output](./Output) | false | [Stdout](./Output/Stream/Stdout.md)

## Properties

`ShairportSync` instances expose the folowing properties:

Name | Type | Read-Only | Default | Desciption
---- | ---- | --------- | ------- | ----------
`process` | [ChildProcess](https://nodejs.org/api/child_process.html#child_process_class_childprocess) | true |  | Child process generated when receiver start
`output` | [Output](./Output) | true | [Stdout](./Output/Stream/Stdout.js) | Output object
`name` | *String* | false |  | Public name of the receiver (can be modified on stoped instance only)

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
      <td colspan="4"><code>(options)</code></td>
      <td>Start airplay receiver</td>
    </tr>
    <tr>
     <td rowspan="2"></td>
      <td><code>options</code></td>
      <td><i>Array</i></td>
      <td>false</td>
      <td>[]</td>
      <td>Custom options to be passed to shairport-sync command.</td>
    </tr>
  </tbody>
</table>

## Events

You can listen to instance's events using:

```javascript
const instance = new ShairportSync();

// Listen to 'START' event
instance.once(ShairportSync.Events.START, () => console.log('Receiver started.'));
```

`ShairportSync.Events` object contains the following events list:

<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Arguments</th>
      <th rowspan="2">Description</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>START</code></td>
      <td colspan="2"><code>(instance)</code></td>
      <td>Emitted once shairport-sync process were spawned.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>instance</code></td>
      <td><code>ShairportSync</code></td>
      <td>The ShairportSync instance that emitted this event</td>
    </tr>
  </tbody>
</table>