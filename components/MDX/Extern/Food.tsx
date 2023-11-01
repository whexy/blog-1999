interface Resturant {
  name: string;
  address: string;
  star: number;
  comment: string;
}

const Food = (r: Resturant) => {
  return (
    <div className="not-prose secondbg mb-4 rounded-lg p-4">
      <div className="flex flex-col pb-2 lg:flex-row lg:justify-between">
        <div className="font-title">
          <p className="text-xl font-semibold">{r.name}</p>
          <p className="text-sm">{r.address}</p>
        </div>
        <div>
          <p className="text-yellow-500">
            {Array.from({ length: r.star }, () => "★").join("")}
            {Array.from({ length: 5 - r.star }, () => "☆").join("")}
          </p>
        </div>
      </div>
      <p className="text-base">{r.comment}</p>
    </div>
  );
};

export default Food;
