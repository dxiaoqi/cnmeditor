function updatePathTarget(obj, path, prototype, value) {
  let index = path.shift();
  let target = obj[index];
  if (!target) {
    throw new Error("can not get the node in path");
  }
  while (index) {
    console.log(index);
    target = target.childrens;
    index = path.shift();
  }
  target[prototype] = value;
  return obj
}

export default updatePathTarget;
