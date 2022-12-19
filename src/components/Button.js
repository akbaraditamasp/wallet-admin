export default function Button({ className, color, children, ...props }) {
  let colorClassName = "bg-primary-500 hover:bg-primary-600 text-white-100";
  if (color === "red") {
    colorClassName = "bg-red-200 hover:bg-red-300 text-white-100";
  }
  if (color === "yellow") {
    colorClassName = "bg-yellow-200 hover:bg-yellow-300 text-black-100";
  }
  if (color === "green") {
    colorClassName = "bg-green-200 hover:bg-green-300 text-white-100";
  }
  return (
    <button
      className={
        "disabled:cursor-not-allowed px-3 py-2 h-12 rounded-sm " +
        colorClassName +
        " " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
