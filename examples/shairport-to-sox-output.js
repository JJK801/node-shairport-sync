import {ShairportSync, Output} from 'shairport-sync'; // https://www.npmjs.com/package/shairport-sync
import {spawn} from 'child_process';

class Sox extends Output
{
    constructor (shairport) {
        super(shairport);

        shairport.on(ShairportSync.Events.START, proc => this.start(proc));

        this._file = null;
    }

    set file (file) {
        this._file = file;
    }

    get file () {
        return this._file;
    }

    start (proc) {
        const soxProc = spawn(
                            'sox', // Use sox command (you must previously install it)
                            [
                                '-t', 'raw',        // raw PCM input on stdin
                                '-c', 2,            // 2 Channels
                                '-b', 16,           // 16 Bits resolution
                                '-r', 44100,        // 44100 Hz sample rate
                                '-e', 'signed',     // Signed signal
                                '-',  this._file    // Write our previously declared file
                            ]
                        );

        proc.stdout.pipe(soxProc.stdin);
    }
}

// Create a Airplay receiver with stout output in order to pipe stream to our speaker
const airplay = new ShairportSync(Sox);

// Set the receiver public name
airplay.name        = 'My Airplay Receiver';

// Set Sox output file path
airplay.output.file = 'test.wav';

// Start the airplay receiver once properly configured
airplay.start();