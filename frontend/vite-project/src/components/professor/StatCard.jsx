//@ts-nocheck
export default function StatCard({ title, count, icon: Icon, color }) {
  const colorMap = {
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorMap[color]}`}>
        <Icon size={26} />
      </div>

      <div>
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  );
}
