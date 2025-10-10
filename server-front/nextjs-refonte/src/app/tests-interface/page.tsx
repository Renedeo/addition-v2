export default function Page() {
  return (
    <div className="p-5 font-sans flex justify-center items-center h-screen">
      <div>
        <p className="text-lg font-bold text-center">Test interface</p>

        <div className="mt-2 text-center flex flex-col gap-2 items-center">
          Here are the links to the different tests:
          <ul className="list-disc pl-5 text-left w-fit ">
            <li >
              <a
                target="_self"
                href="/tests-interface/color"
                className="text-blue-500 underline"
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
