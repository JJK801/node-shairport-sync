import {ShairportSync, Stdout} from 'shairport-sync'; // https://www.npmjs.com/package/shairport-sync
import Speaker from 'speaker';                        // https://www.npmjs.com/package/speaker

/**
 * Create a speaker with CD quality:
 * - 2 channels
 * - 16 Bits
 * - 44100 Hz
 */
const speaker = new Speaker({
  channels:   2,
  bitDepth:   16,
  sampleRate: 44100,
  signed:     true
});

// Create a Airplay receiver with stout output in order to pipe stream to our speaker
const airplay = new ShairportSync(Stdout);

// Set the receiver public name
airplay.name = 'My Airplay Receiver';

// Start the airplay receiver once properly configured
airplay.start();

// pipe Airplay's PCM stream to our speaker instance
airplay.output.stream.pipe(speaker);