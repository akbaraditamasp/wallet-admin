import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { GoCreditCard, GoInbox, GoPerson } from "react-icons/go";
import { NumericFormat } from "react-number-format";
import { WebContext } from "../components/Layout";
import service from "../service";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function Dashboard() {
  const { state, setActive, setTitle, setLoading } = useContext(WebContext);
  const [stats, setStats] = useState({});
  const [graph, setGraph] = useState([]);

  const getStats = () =>
    new Promise((resolve) => {
      service
        .get("/stats")
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve({});
        });
    });

  const getGraph = () =>
    new Promise((resolve) => {
      service
        .get("/stats/transaction")
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          resolve([]);
        });
    });

  useEffect(() => {
    setActive("Dashboard");
    setTitle("Dashboard");

    (async () => {
      setLoading(true);
      const stats = await getStats();
      setStats(stats);
      const graph = await getGraph();
      setGraph(graph);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="rounded border bg-white-100 border-white-300 p-5 flex items-center">
          <div className="flex-1">
            <div className="text-sm text-black-200">JUMLAH USER</div>
            <NumericFormat
              value={stats.users | 0}
              thousandSeparator={true}
              displayType="text"
              renderText={(value) => (
                <div className="text-3xl font-bold">{value}</div>
              )}
            />
          </div>
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded border border-primary-400 bg-primary-400 bg-opacity-25">
            <GoPerson size={24} className="text-primary-600" />
          </div>
        </div>
        <div className="rounded border bg-white-100 border-white-300 p-5 flex items-center">
          <div className="flex-1">
            <div className="text-sm text-black-200">TRANSAKSI HARI INI</div>
            <NumericFormat
              value={stats.transactions | 0}
              thousandSeparator={true}
              displayType="text"
              renderText={(value) => (
                <div className="text-3xl font-bold">{value}</div>
              )}
            />
          </div>
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded border border-green-100 bg-green-100 bg-opacity-25">
            <GoInbox size={24} className="text-green-300" />
          </div>
        </div>
        <div className="rounded border bg-white-100 border-white-300 p-5 flex items-center">
          <div className="flex-1">
            <div className="text-sm text-black-200">SALDO</div>
            <NumericFormat
              value={stats.balances | 0}
              thousandSeparator={true}
              displayType="text"
              prefix="Rp"
              renderText={(value) => (
                <div className="text-3xl font-bold">{value}</div>
              )}
            />
          </div>
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded border border-red-100 bg-red-100 bg-opacity-25">
            <GoCreditCard size={24} className="text-red-300" />
          </div>
        </div>
      </div>
      <div className="mt-5 p-5 bg-white-100 rounded">
        <div className="text-xl text-center font-bold mb-5">
          Grafik Transaksi
        </div>
        <Line
          options={{
            responsive: true,
          }}
          data={{
            labels: graph.map((val) => val.label),
            datasets: [
              {
                data: graph.map((val) => val.data),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
