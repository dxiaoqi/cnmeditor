

function registerPlugins(base, plugin) {
    if (!plugin) throw Error('Plugin can not be undefined')
    const {type, ...control} = plugin
    base.lifeHook.forEach(hn => {
        if (control[hn]) {
            const fns = (base.plugins[hn] = base.plugins[hn] || [])
            fns.push(control[hn])
        }
    })
}
class Plugin {
    constructor(Core) {
        this.Core = Core;
        this.plugins = {}
        this.lifeHook = ['init', 'load', 'tojs', 'render']
        // ...生命周期定义
    }
    registerPlugins(plugins) {
        if (plugins instanceof Array) {
            plugins.forEach(p => {registerPlugins(this, p)})
        } else {
            registerPlugins(this, plugins)
        }
    }
    run(...arg) {
       let fns = Object.values(this.plugins).reduce((pre, cur) => pre.concat(cur), []) || []
       let index  = 0
        function next (...overrides) {
            const fn = fns[index++]
            if (!fn) {
                return
            }
            if (overrides.length) {
                arg = overrides
            }
            fn(...arg, next)
        }
        return next()
    }
}
// const P = new Plugin();
// function re() {
//     return {
//         init(arg, next) {
//             next(1)
//         }
//     }
// }
// function fe() {
//     return {
//         init(arg, next) {
//             console.log(arg)
//             next(1)
//         }
//     }
// }
// P.registerPlugins([re(), fe()])
// P.run('')

module.exports = Plugin