import React, { useState } from "react";

const Compare = () => {
  const [inputText1, setInputText1] = useState("");
  const [lineCount1, setLineCount1] = useState(0);
  const [inputText2, setInputText2] = useState("");
  const [lineCount2, setLineCount2] = useState(0);
  const [tcCount, setTcCount] = useState(0);
  const [tcInput, setTcInput] = useState("");
  const [differences, setDifferences] = useState([]);
  const [matchedTestCases, setMatchedTestCases] = useState("");

  const handleInputChange1 = (e) => {
    const input = e.target.value;
    setInputText1(input);
    const lines1 = input.split("\n");
    setLineCount1(lines1.length);
    compareLines(lines1, inputText2.split("\n"), tcInput.split("\n"));
  };

  const handleInputChange2 = (e) => {
    const input = e.target.value;
    setInputText2(input);
    const lines2 = input.split("\n");
    setLineCount2(lines2.length);
    compareLines(inputText1.split("\n"), lines2, tcInput.split("\n"));
  };

  const handleTestCaseChange = (e) => {
    const input = e.target.value;
    setTcInput(input);
    const lines3 = input.split("\n");
    setTcCount(lines3.length);
    compareLines(inputText1.split("\n"), inputText2.split("\n"), lines3);
  };

  const compareLines = (lines1, lines2, tcInputs) => {
    const maxLines = Math.max(lines1.length, lines2.length);
    const diffs = [];
    const matchedLines = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i]?.trim().toUpperCase() || "";
      const line2 = lines2[i]?.trim().toUpperCase() || "";

      if (line1 !== line2) {
        diffs.push(i + 1);
        matchedLines.push(`${tcInputs[i] || ""}`);
      }

      setDifferences(diffs);
      setMatchedTestCases(matchedLines.join("\n"));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(matchedTestCases)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy. Check console for details.");
        console.log(err);
      });
  };

  return (
    <div className="px-6 bg-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center py-8">
        Wrong answer on test 2? 😟
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
          <textarea
            className="w-full h-96 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tcInput}
            onChange={handleTestCaseChange}
            placeholder="Write the test cases"
          />
          <p className="text-sm text-gray-500 mt-2">Total Lines: {tcCount}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <textarea
            className="w-full h-96 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText1}
            onChange={handleInputChange1}
            placeholder="Write your output"
          />
          <p className="text-sm text-gray-500 mt-2">
            Total Lines: {lineCount1}
          </p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Answer</h2>
          <textarea
            className="w-full h-96 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText2}
            onChange={handleInputChange2}
            placeholder="Write the expected answer"
          />
          <p className="text-sm text-gray-500 mt-2">
            Total Lines: {lineCount2}
          </p>
        </div>
      </div>

      {differences.length > 0 ? (
        <p className="text-sm text-red-600 mb-4">
          Differences at: {differences.join(", ")}
        </p>
      ) : (
        <p className="text-sm text-green-600 mb-4">
          No differences found (yet)
        </p>
      )}

      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Matched Test Cases</h3>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={matchedTestCases}
          readOnly
          placeholder="Test Cases with differences will appear here"
        />
        <button
          onClick={copyToClipboard}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Copy Test Cases
        </button>
      </div>
    </div>
  );
};

export default Compare;
