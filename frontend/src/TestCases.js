import React, { useState } from 'react';
import axios from 'axios';
import './TestCases.css';

function TestCases() {
  const [testResults, setTestResults] = useState([]);

  const testCases = [
    {
      description: 'Create individual rules and verify their AST representation',
      request: { rule: '((age > 30 AND department == "Sales") OR (age < 25 AND department == "Marketing")) AND (salary > 50000 OR experience > 5)' },
      endpoint: '/create_rule',
    },
    {
      description: 'Combine rules and ensure the resulting AST reflects the combined logic',
      request: { rules: [
        '((age > 30 AND department == "Sales") OR (age < 25 AND department == "Marketing")) AND (salary > 50000 OR experience > 5)',
        '((age > 30 AND department == "Marketing")) AND (salary > 20000 OR experience > 5)'
      ] },
      endpoint: '/combine_rules',
    },
    {
      description: 'Evaluate rule for different scenarios',
      request: { 
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

  const runTests = async () => {
    const results = [];
    for (const testCase of testCases) {
      try {
        const response = await axios.post(`http://localhost:5000${testCase.endpoint}`, testCase.request);
        results.push({ description: testCase.description, result: JSON.stringify(response.data, null, 2) });
      } catch (err) {
        results.push({ description: testCase.description, result: err.response.data.error });
      }
    }
    setTestResults(results);
  };

  return (
    <div className="TestCases">
      <button onClick={runTests} className="test-button">Run Test Cases</button>
      <div className="test-results">
        {testResults.map((result, index) => (
          <div key={index} className="test-result">
            <h4>{result.description}</h4>
            <pre>{result.result}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestCases;
