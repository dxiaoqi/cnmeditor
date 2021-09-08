export default function Pext(props: object) {
  return <div {...props}>{(props as any).value}</div>;
}
