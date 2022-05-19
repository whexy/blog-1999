const Statistics = ({ data }) => {
  return (
    <div className="grid sm:grid-cols-2">
      {data.map((item, index) => (
        <SU key={index} {...item} />
      ))}
    </div>
  );
};

const SU = ({
  fact,
  des,
  detail = null,
}: {
  fact: string;
  des: string;
  detail: string | null;
}) => {
  return (
    <div className="not-prose secondbg m-4 rounded-md p-4 font-sans">
      <div className="text-center font-title text-6xl font-extrabold">
        {fact}
      </div>
      <p className="pb-2 text-center">{des}</p>
      {detail && (
        <p className="whitespace-pre-wrap text-center text-xs font-light opacity-80">
          {detail}
        </p>
      )}
    </div>
  );
};

export default Statistics;
