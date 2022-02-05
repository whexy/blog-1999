import init, { emulate } from "@/projects/wasm-riscv-emu";
import { useState, useEffect } from "react";
import { PlayIcon } from "@heroicons/react/solid";

const WasmRiscvEmu = () => {
  const [rom, setRom] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fillInExample();
  }, []);

  const run = () => {
    init().then(() => {
      const res = emulate();
      setResult(res);
    });
  };

  // const clear = () => {
  //   setRom("");
  //   setResult(null);
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRom(e.target.value);
  };

  const fillInExample = () => {
    setRom(`0x00100093, // li	x1, 1
0x00200113, // li	x2, 2
0x002081b3, // add	x3, x1, x2
0x80000237, // li	x4, 0x80000000
0x00322023, // sw	x3, 0(x4)
0xdeadc2b7, // li	x5, 0xdeadbeef
0xeef28293, // (cont.)
0x00022303, // lw	x6, 0(x4)
0x006283b3, // add	x7, x5, x6
0x00722223, // sw	x7, 4(x4)
0x00721423, // sh	x7, 8(x4)
0x00720623, // sb	x7, 12(x4)`);
  };

  return (
    <div className="not-prose">
      <div className="flex flex-col space-y-2">
        <div>
          <textarea
            className="h-[450px] w-full resize-y rounded-xl border bg-gray-100 p-4 font-mono text-gray-900 dark:bg-gray-900 dark:text-gray-100"
            value={rom}
            onChange={handleChange}
            disabled={true}
          />
        </div>
        <div className="flex justify-end space-x-2">
          {/* <button
            className="rounded-xl bg-blue-100 dark:bg-blue-100/10 border border-blue-200"
            onClick={fillInExample}
          >
            <div className="px-4 py-1">Fill in Example</div>
          </button> */}
          <button
            className="rounded-xl border border-yellow-200 bg-yellow-100 dark:bg-yellow-100/10"
            onClick={run}
          >
            <div className="inline-flex items-center space-x-1 px-4 py-1">
              <PlayIcon className="h-6 w-6" />
              <p>Run</p>
            </div>
          </button>
          {/* <button
            className="rounded-xl bg-red-100 dark:bg-red-100/10 border border-red-200"
            onClick={clear}
          >
            <div className="inline-flex px-4 py-1 items-center space-x-1">
              <PlayIcon className="w-6 h-6" />
              <p>Clear</p>
            </div>
          </button> */}
        </div>
        {result && (
          <div>
            <div className="w-full columns-2 rounded-xl border bg-gray-100 p-4 font-mono text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100 sm:columns-3">
              {result.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasmRiscvEmu;
