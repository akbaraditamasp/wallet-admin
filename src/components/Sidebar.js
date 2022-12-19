import { Link } from "react-router-dom";

export const Wrapper = ({ children }) => {
  return <ul className="flex flex-col">{children}</ul>;
};

export const List = ({ children, active, icon, ...props }) => {
  const Icon = icon;
  return (
    <li className="pl-5 mb-2">
      <Link
        className={
          "rounded-l-md pr-5 py-3 monda pl-3 flex items-center " +
          (active
            ? "bg-primary-500 text-white-100"
            : "text-black-400 hover:bg-primary-100")
        }
        {...props}
      >
        <span className="w-6 mr-2 flex justify-center items-center">
          <Icon />
        </span>
        {children}
      </Link>
    </li>
  );
};
