type CommandHook = {
    name: string;
    active: boolean;
    action: Function;
};

class CommandManager {
    base: string;
    commandList: CommandHook[];
    constructor(base) {
      this.base = base;
      this.commandList = [];
    }
    registerCommand(hook: CommandHook) {
      if (typeof hook === "function") {
        this.commandList.push(hook);
      }
    }
    run() {
      const { base } = this;
      this.commandList.forEach((command, index) => {
        command.active && command.action(base);
      });
    }
}
export default CommandManager;