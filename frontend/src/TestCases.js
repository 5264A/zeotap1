import React, { useState } from 'react';
import axios from 'axios';
import './TestCases.css';

function TestCases() {
  const [results, setResults] = useState([]);

  
  const tests = [
    {
      description: 'Generate AST for individual rules',
      payload: { rule: '((age > 30 AND department == "Sales") OR (age < 25 AND department == "Marketing")) AND (salary > 50000 OR experience > 5)' },
      endpoint: '/create_rule',
    },
    {
      description: 'Merge rules and verify AST reflects combined logic',
      payload: { rules: [
        '((age > 30 AND department == "Sales") OR (age < 25 AND department == "Marketing")) AND (salary > 50000 OR experience > 5)',
        '((age > 30 AND department == "Marketing")) AND (salary > 20000 OR experience > 5)'
      ] },
      endpoint: '/combine_rules',
    },
    {
      description: 'Evaluate rule logic with various data sets',
      payload: { 
        ast: {
          type: 'operator',
          left: {
            type: 'operator',
            left: { type: 'operand', value: ['age', '>', 30] },
            right: { type: 'operand', value: ['department', '==', 'Sales'] },
            value: 'AND'
          },
          right: { type: 'operand', value: ['salary', '>', 50000] },
          value: 'AND'
        },
        data: { age: 35, department: 'Sales', salary: 60000, experience: 3 }
      },
      endpoint: '/evaluate_rule',
    },
  ];

  // Function to execute the test cases
  const executeTests = async () => {
    const testResults = [];
    for (const test of tests) {
      try {
        const response = await axios.post(`http://localhost:5000${test.endpoint}`, test.payload);
        testResults.push({ description: test.description, output: JSON.stringify(response.data, null, 2) });
      } catch (error) {
        testResults.push({ description: test.description, output: error.response ? error.response.data.error : 'Error during request' });
      }
    }
    setResults(testResults);
  };

  return (
    <div className="TestCases">
      <button onClick={executeTests} className="test-button">Run Tests</button>
      <div className="test-results">
        {results.map((result, index) => (
          <div key={index} className="test-result">
            <h4>{result.description}</h4>
            <pre>{result.output}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestCases;
