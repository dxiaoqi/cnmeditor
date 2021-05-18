

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
    run(key = this.lifeHook[0], ...arg) {
       let fns = this.plugins[key] || []
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

function re(op, next) {
    return {
        type: 'cmd',
        init(arg, next) {
            next(1)
        },
        load(arg, next) {
            next(2)
        }
    }
}
function be(op, next) {
    return {
        type: 'cmd',
        init(arg) {
            console.log('init', arg)
        },
        load(arg) {
            console.log('init', arg)
        }
    }
}
const a= new Plugin()
a.registerPlugins([re(),be()])
a.run('init', '11')
a.run('load', '11')
// console.log(a)
module.exports = Plugin