import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { WebContext } from "../components/Layout";
import Table from "../components/Table";
import service from "../service";

export default function Transaction() {
  const { setActive, setTitle, setLoading } = useContext(WebContext);
  const [data, setData] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);

  const getData = (page = 1, q = "") => {
    console.log(q);
    setLoading(true);
    service
      .get("/transaction", {
        params: {
          page,
          limit: 20,
          q,
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
        setPageTotal(response.data.page_total);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setActive("Transaksi");
    setTitle("Transaksi");

    getData();
  }, []);

  return (
    <Table
      columns={[
        {
          label: "NO",
          numbering: true,
          className: "w-0",
          rowClassName: "text-center",
        },
        {
          label: "TANGGAL",
          className: "w-48",
          render: (val) => moment(val.created_at).format("DD/MM/YYYY HH:mm"),
        },
        {
          label: "USER",
          render: (val) => val.user.username,
        },
        {
          label: "NOMINAL",
          render: (val) => (
            <NumericFormat
              thousandSeparator={true}
              prefix="Rp"
              value={val.amount}
              displayType="text"
            />
          ),
        },
        {
          label: "STATUS",
          rowClassName: "uppercase",
          data: "status",
        },
        {
          label: "JENIS",
          className: "w-0",
          rowClassName: "uppercase",
          render: (val) => (
            <span
              className={
                (val.type === "in" ? "bg-primary-400" : "bg-red-200") +
                " block p-1 rounded-full text-xs text-center text-white-100"
              }
            >
              {val.type}
            </span>
          ),
        },
        {
          label: "KETERAGAN",
          data: "title",
          className: "w-96",
        },
      ]}
      data={data}
      style={{
        width: 1200,
      }}
      pageTotal={pageTotal}
      onChange={getData}
      limit={20}
    />
  );
}
