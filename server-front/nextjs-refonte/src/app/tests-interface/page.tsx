export default function Page() {
  return (
    <div className="p-5 font-sans flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <p className="text-lg font-bold text-center text-gray-800">Test Interface</p>

        <div className="mt-4 text-center flex flex-col gap-4 items-center">
          <p className="text-gray-600">Here are the links to the different tests:</p>
          <ul className="list-disc pl-5 text-left w-fit text-gray-700">
            <li>
              <a
                target="_self"
                href="/tests-interface/color"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Color Conversion Test
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
