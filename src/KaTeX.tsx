function KaTeX() {
  return (
    <div className="p-16 flex flex-col items-center justify-center space-y-6">
      <p className="font-bold text-7xl">
        Ka<del className="text-gray-500">hoot</del>TeX
      </p>
      <input
        type="text"
        placeholder="Enter your name"
        className="px-6 py-3 border rounded-lg text-xl"
      />
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
        Join
      </button>
    </div>
  );
}

export default KaTeX;
