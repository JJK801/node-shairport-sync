# Documentation

* [API](./API/README.md)
    * [ShairportSync](./API/ShairportSync.md) - *Create a Airplay receiver*
    * [Output](./API/Output/README.md) - *ShairportSync Output Interface*
        * [Stream](./API/Output/Stream/README.md) - *ShairportSync Stream Output Interface*
            * [Stdout](./API/Output/Stream/Stdout.md) - *ShairportSync Output in Stdout*
            * [Pipe](./API/Output/Stream/Pipe.md) - *ShairportSync Output in a pipe file*
* [Examples](../examples)
    * [Basic](../examples/basic.js) - *Basic usage example*
    * [ShairportSync to Sox](../examples/shairport-to-sox.js) - *Send received Audio to [Sox](http://sox.sourceforge.net/) program to convert it and write a file*
    * [ShairportSync to Sox (direct output)](../examples/shairport-to-sox-output.js) - *Send received Audio to [Sox](http://sox.sourceforge.net/) program to convert it and write a file*
    * [ShairportSync to Speakers](../examples/shairport-to-speakers.js) - *Send received Audio to your speakers*