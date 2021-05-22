function assembleTree(base, nodes, parent = []) {
    nodes.forEach((n, index) => {
      let path = parent.length ? parent.concat(index) : [index]; // 数组记录path
      n.path = path;
      // match的生命周期
      base.run("match", n);
      if (n.childrens && n.childrens instanceof Array) {
        assembleTree(base, n.childrens, path);
      }
    });
    return nodes;
  }
  
  export default assembleTree;
  