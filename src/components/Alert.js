export default function Alert({ children, className, color }) {
  let colorClassName = "bg-red-100 text-white-100";
  if (color === "yellow") {
    colorClassName = "bg-yellow-100 text-black-200";
  }
  if (color === "primary") {
    colorClassName = "bg-primary-400 text-white-100";
  }
  if (color === "green") {
    colorClassName = "bg-green-100 text-white-100";
  }
  return (
    <div className={"p-3 " + colorClassName + " " + className}>{children}</div>
  );
}
