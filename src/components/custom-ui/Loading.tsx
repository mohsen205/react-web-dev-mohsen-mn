const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        {/* <Spinner className="mb-2" /> */}
        <p className="text-gray-700">Loading category list...</p>
      </div>
    </div>
  );
};

export default Loading;
