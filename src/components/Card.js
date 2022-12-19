export default function Card({ className, children }) {
  return (
    <div className={"bg-white-100 rounded-sm p-5 " + className}>{children}</div>
  );
}
