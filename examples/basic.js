import {ShairportSync} from 'shairport-sync'; // https://www.npmjs.com/package/shairport-sync

// Create a Airplay receiver
const airplay = new ShairportSync(); // Default output will stream PCM Audio through 'airplay.output.stream'

// Set the receiver public name
airplay.name = 'My Airplay Receiver';

// Start the airplay receiver once properly configured
airplay.start();

// pipe Airplay's PCM stream to any writeable stream (other lib, spawned process, file, ...)
airplay.output.stream.pipe(someWriteableStream);