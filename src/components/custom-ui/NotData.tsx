import { FC } from "react";

interface NoDateProps {
  searchKey: string;
}

const NotData: FC<NoDateProps> = ({ searchKey }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h2 className="text-lg font-semibold">No Data Found</h2>
      <p className="text-gray-500">
        We couldn't find any results for "{searchKey}".
      </p>
    </div>
  );
};

export default NotData;
