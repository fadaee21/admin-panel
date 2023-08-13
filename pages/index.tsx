import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
// import Chart from "@/components/Chart";
import useSWR from "swr";

const Home = () => {
  const Chart = dynamic(() => import("@/components/Chart"), {
    ssr: false,
  });
  const { data, isLoading } = useSWR("/global?url=/transactions/chart");
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4 className="fw-bold">داشبورد</h4>
      </div>

      <Chart />
    </>
  );
};

export default Home;
