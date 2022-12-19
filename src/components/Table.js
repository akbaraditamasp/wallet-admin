import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import TextInput from "./TextInput";

export default function Table({
  data = [],
  columns = [],
  pageTotal = 0,
  onChange,
  limit = 10,
  ...props
}) {
  const [page, setPage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");

  const proceed = () => {
    onChange(current, search);
  };

  return (
    <div className="flex-1 relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 m-5 bg-white-100 rounded-sm border border-white-300 flex flex-col">
        <TextInput
          type="text"
          placeholder="Cari..."
          containerClassName="m-3"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              proceed();
            }
          }}
        />
        <OverlayScrollbarsComponent
          className="flex-1 relative"
          options={{ scrollbars: { autoHide: "scroll" } }}
          defer
        >
          <table className="table border-collapse min-w-full" {...props}>
            <thead className="sticky top-0 left-0">
              <tr>
                {columns.map((val, index) => (
                  <th key={`${index}`} className={val.className}>
                    {val.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => (
                <tr>
                  {columns.map((col, colIndex) => (
                    <td key={`${colIndex}`} className={col.rowClassName}>
                      {col.numbering
                        ? index + 1 + page
                        : col.data
                        ? val[col.data]
                        : col.render
                        ? col.render(val)
                        : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </OverlayScrollbarsComponent>
        <div className="px-5 py-3 text-right border-t border-white-300 flex-shrink-0 text-sm">
          <ReactPaginate
            nextLabel="&raquo;"
            pageRangeDisplayed={5}
            pageCount={pageTotal}
            className="-mb-3"
            nextLinkClassName="block py-2 px-4"
            pageLinkClassName="block py-2 px-4"
            previousLinkClassName="block py-2 px-4"
            activeClassName="bg-black-300 hover:bg-black-300 text-white-100"
            pageClassName="border border-white-300 hover:bg-white-200 mr-3 mb-3 rounded-sm inline-table"
            nextClassName="border border-white-300 hover:bg-white-200 mr-3 mb-3 rounded-sm inline-table"
            previousClassName="border border-white-300 hover:bg-white-200 mr-3 mb-3 rounded-sm inline-table"
            breakClassName="mr-3 mb-3 rounded-sm inline-table"
            marginPagesDisplayed={1}
            previousLabel="&laquo;"
            onPageChange={(e) => {
              setCurrent(e.selected + 1);
              proceed();
              setPage(e.selected * limit);
            }}
          />
        </div>
      </div>
    </div>
  );
}
