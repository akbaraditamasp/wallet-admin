const {
  forwardRef,
  Fragment,
  useState,
  useImperativeHandle,
  useEffect,
} = require("react");
const { FiX } = require("react-icons/fi");

const Modal = forwardRef(({ title, children }, ref) => {
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!hide) {
      setShow(true);
    }
  }, [hide]);

  useEffect(() => {
    let timeout;
    if (!show) {
      timeout = setTimeout(() => {
        setHide(true);
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [show]);

  useImperativeHandle(
    ref,
    () => ({
      hide: () => {
        setShow(false);
      },
      show: () => {
        setHide(false);
      },
    }),
    []
  );
  return (
    <div
      className={
        "bg-black-100 fixed top-0 left-0 w-full h-screen overflow-auto justify-center items-start z-40 transition-all duration-300 " +
        (hide ? "hidden" : "flex") +
        (show ? " bg-opacity-50" : " bg-opacity-0")
      }
      onClick={() => {
        setShow(false);
      }}
    >
      <div
        className={
          "bg-white-100 rounded m-5 w-full md:w-2/3 lg:w-2/5 transform transition-all duration-300 " +
          (show ? " translate-y-0" : " -translate-y-full")
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center p-5 border-b border-white-200">
          <h3 className="flex-1 text-lg monda font-bold">{title}</h3>
          <button
            className="w-8 h-8 flex justify-center items-center"
            type="button"
            onClick={() => {
              setShow(false);
            }}
          >
            <FiX />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
