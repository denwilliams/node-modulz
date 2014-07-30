node-modulz
===========

Runs server modules in their own child process to prevent errors from one module affecting another and automatically restart crashed modules.

Usage:

```
{
    var modules = [
        {id: 'module 1', method: someFunction, options: moduleOpts},
        {id: 'module 2', method: someOtherFunction, options: module2Opts},
    ];
}

var modulz = require('modulz');
modulz.run(modules);

```
