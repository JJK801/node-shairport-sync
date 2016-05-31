import {ShairportSync, Stdout} from 'shairport-sync'; // https://www.npmjs.com/package/shairport-sync
import {spawn} from 'child_process';

const outputFile = "test.wav"

/**
 * Spawn a sox with CD quality:
 * - PCM audio input
 * - 2 channels
 * - 16 Bits
 * - 44100 Hz
 * - Output to a custom file
 */
const sox = spawn(
                'sox', // Use sox command (you must previously install it)
                [
                    '-t', 'raw',        // raw PCM input
                    '-c', 2,            // 2 Channels
                    '-b', 16,           // 16 Bits resolution
                    '-r', 44100,        // 44100 Hz sample rate
                    '-e', 'signed',     // Signed signal
                    '-',  outputFile    // Write our previously declared file
                ]
            );

// Create a Airplay receiver with stout output in order to pipe stream to our speaker
const airplay = new ShairportSync(Stdout);

// Set the receiver public name
airplay.name = 'My Airplay Receiver';

// Start the airplay receiver once properly configured
airplay.start();

// pipe Airplay's PCM stream to sox program (then it writes the file)
airplay.output.stream.pipe(sox.stdin);