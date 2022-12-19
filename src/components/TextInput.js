const { forwardRef } = require("react");

const TextInput = forwardRef(
  ({ containerClassName, className, label, left, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && <label className="text-black-200 font-bold">{label}</label>}
        <div className="h-12 border border-white-300 w-full flex items-center rounded-sm">
          {left && <div className="ml-3 mr-1 text-black-400">{left}</div>}
          <input
            ref={ref}
            className={
              "h-full flex-1 p-2 rounded-sm focus:outline-none " + className
            }
            {...props}
          />
        </div>
      </div>
    );
  }
);

export default TextInput;
