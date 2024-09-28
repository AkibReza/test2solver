import React, { useState } from "react";

function YesNoComparator() {
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [testCaseInput, setTestCaseInput] = useState("");
  const [lineCount1, setLineCount1] = useState(0);
  const [lineCount2, setLineCount2] = useState(0);
  const [lineCount3, setLineCount3] = useState(0);
  const [differences, setDifferences] = useState([]);
  const [matchedTestCases, setMatchedTestCases] = useState(""); // For displaying matched lines

  const handleInputChange1 = (event) => {
    const input = event.target.value;
    setInputText1(input);
    const lines1 = input.split("\n");
    setLineCount1(lines1.length);
    compareLines(lines1, inputText2.split("\n"), testCaseInput.split("\n"));
  };

  const handleInputChange2 = (event) => {
    const input = event.target.value;
    setInputText2(input);
    const lines2 = input.split("\n");
    setLineCount2(lines2.length);
    compareLines(inputText1.split("\n"), lines2, testCaseInput.split("\n"));
  };

  const handleTestCaseChange = (event) => {
    const input = event.target.value;
    setTestCaseInput(input);
    const lines3 = input.split("\n");
    setLineCount3(lines3.length);
    compareLines(inputText1.split("\n"), inputText2.split("\n"), lines3);
  };

  const compareLines = (lines1, lines2, lines3) => {
    const maxLines = Math.max(lines1.length, lines2.length);
    const diffs = [];
    const matchedLines = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i]?.trim().toUpperCase() || "";
      const line2 = lines2[i]?.trim().toUpperCase() || "";

      if (line1 !== line2) {
        diffs.push(i + 1); // Store the line number where there's a difference
        matchedLines.push(`${lines3[i] || ""}`); // Get corresponding line from the third textarea
      }
    }

    setDifferences(diffs);
    setMatchedTestCases(matchedLines.join("\n")); // Set the matched test cases
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(matchedTestCases)
      .then(() => {
        alert("Different test cases copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <h1>Yes/No Comparator</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h2>List 1</h2>
          <textarea
            rows="10"
            cols="30"
            value={inputText1}
            onChange={handleInputChange1}
            placeholder="Type 'YES' or 'NO' on each line"
          />
          <p>Total lines: {lineCount1}</p>
        </div>

        <div>
          <h2>List 2</h2>
          <textarea
            rows="10"
            cols="30"
            value={inputText2}
            onChange={handleInputChange2}
            placeholder="Type 'YES' or 'NO' on each line"
          />
          <p>Total lines: {lineCount2}</p>
        </div>
      </div>

      <div>
        <h2>Test Cases</h2>
        <textarea
          rows="10"
          cols="60"
          value={testCaseInput}
          onChange={handleTestCaseChange}
          placeholder="Enter test cases here"
        />
        <p>Total lines: {lineCount3}</p>
      </div>

      <div>
        <h3>Differences:</h3>
        {differences.length > 0 ? (
          <p>Lines that differ: {differences.join(", ")}</p>
        ) : (
          <p>No differences</p>
        )}
      </div>

      <div>
        <h3>Matched Test Cases (lines with differences):</h3>
        <textarea
          rows="10"
          cols="60"
          value={matchedTestCases}
          readOnly
          placeholder="Lines from test cases where differences occur will appear here"
        />
        <button onClick={copyToClipboard}>Copy Text</button>
      </div>
    </div>
  );
}

export default YesNoComparator;
