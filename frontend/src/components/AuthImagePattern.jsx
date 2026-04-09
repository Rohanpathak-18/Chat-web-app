const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-base-200  pt-25">
      <div className="max-w-sm text-center">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg bg-blue-900 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;