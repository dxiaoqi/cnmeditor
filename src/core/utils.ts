import Selection from "./selection";
export function selection(ele: object){
  // 选中的元素
  Selection.getSelect(ele);
}
export function hashCode(str: string): number{ //Create an hash Int based on string input.
	let hash = 5381, i = str.length;
	while(i) hash = (hash * 33) ^ str.charCodeAt(--i)
	return hash >>> 0; //Force Negative bit to Positive;
}


export function randomID(): number{
	return (+new Date()) + (Math.random() * 100000000 | 0) + (++randomID.nextID);
} randomID.nextID = 0;

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
      })
  });
  return derivedCtor;
}