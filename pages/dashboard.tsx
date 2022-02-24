import Main from "@/components/Main";
import fetcher from "@/lib/fetcher";
import { useEffect, useState, VFC } from "react";
import useSWR from "swr";
import Skeleton from "@/components/Skeleton";
import PageTitle from "@/components/tiny/PageTitle";

const numThousands = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const KeyView = () => {
  return (
    <Main>
      <PageTitle title="Dashboard" emoji="📇" />
      <div className="grid grid-cols-1 pb-10 sm:grid-cols-2">
        <AlltimeViewItem />
        <Last24ViewItem />
      </div>
    </Main>
  );
};

const AlltimeViewItem = () => {
  const { data } = useSWR(
    "/api/vistors?start=0&end=4828118400000",
    fetcher,
  );
  return (
    <DashBoardItem
      title="All-Time Views"
      value={data ? numThousands(data.views) : null}
    />
  );
};

const Last24ViewItem = () => {
  const [date, setDate] = useState(new Date().getTime());

  useEffect(() => {
    setDate(new Date().getTime());
  }, []);

  const { data } = useSWR(
    `/api/vistors?start=${date - 3600 * 1000 * 24}&end=${date}`,
    fetcher,
  );

  return (
    <DashBoardItem
      title="Last 24h Views"
      value={data ? numThousands(data.views) : null}
    />
  );
};

const DashBoardItem: VFC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="secondbg m-2 rounded-lg p-4">
      <div className="">{title}</div>
      <div className="mt-2 text-3xl font-bold text-black dark:text-white">
        {value ? value : <Skeleton width={100} />}
      </div>
    </div>
  );
};

export default KeyView;
