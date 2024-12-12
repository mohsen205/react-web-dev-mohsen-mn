const Error = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-red-500 text-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">Error</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
};

export default Error;
