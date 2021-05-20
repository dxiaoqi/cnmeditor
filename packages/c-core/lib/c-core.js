'use strict';
const Plugin = require('./plugin');
const loadSchema = require('./loadSchema');
module.exports = cCore;

function cCore() {
    // TODO
    const P = new Plugin();
    console.log(P)
    P.registerPlugins([loadSchema()])
    P.run('初始化')
    return {
        Plugin
    }
}