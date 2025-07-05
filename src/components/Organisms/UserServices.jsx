function UserServices() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 font-medium text-gray-500">
              Service Name
            </th>
            <th className="py-2 px-4 font-medium text-gray-500">Type</th>
            <th className="py-2 px-4 font-medium text-gray-500">Service</th>
            <th className="py-2 px-4 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          <tr className="border-b text-[13px]">
            <td className="py-3 px-4">Business</td>
            <td className="py-3 px-4">Type</td>
            <td className="py-3 px-4">Business Development</td>
            <td className="py-3 px-4">
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                rejected
              </span>
            </td>
          </tr>
          {/* Row 2 */}
          <tr className="border-b text-[13px]">
            <td className="py-3 px-4">Business</td>
            <td className="py-3 px-4">Type</td>
            <td className="py-3 px-4">Business Development</td>
            <td className="py-3 px-4">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                Done
              </span>
            </td>
          </tr>
          {/* Row 3 */}
          <tr className=" text-[13px]">
            <td className="py-3 px-4">Business</td>
            <td className="py-3 px-4">Type</td>
            <td className="py-3 px-4">Business Development</td>
            <td className="py-3 px-4">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Waiting
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default UserServices