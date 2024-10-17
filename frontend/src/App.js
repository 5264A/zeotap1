import React, { useState } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import './App.css';

function App() {
  const [rule, setRule] = useState('');
  const [rules, setRules] = useState([]);
  const [data, setData] = useState('{}');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [combinedAst, setCombinedAst] = useState(null);

  const createRule = async () => {
    try {
      if (rule.trim() === '') {
        throw new Error('No rule provided');
      }

      // Basic validation for rule format
      const rulePattern = /^\s*([a-zA-Z_]\w*)\s*(>|<|=)\s*([\w\d]+)\s*$/;
      if (!rulePattern.test(rule.trim())) {
        throw new Error('Invalid rule format. Expected format: "field operator value"');
      }

      const response = await axios.post('http://localhost:5000/create_rule', { rule });
      setRules([...rules, response.data.ast]);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  const combineRules = async () => {
    try {
      if (rules.length < 2) {
        throw new Error('At least two rules are required to combine');
      }
      const response = await axios.post('http://localhost:5000/combine_rules', { rules });
      setCombinedAst(response.data.ast);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Server error');
    }
  };

  const evaluateRule = async () => {
    try {
      if (!combinedAst || !data || typeof JSON.parse(data) !== 'object') {
        throw new Error('Invalid rule or data');
      }
      const response = await axios.post('http://localhost:5000/evaluate_rule', { ast: combinedAst, data: JSON.parse(data) });
      setResult(response.data.result);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Server error');
    }
  };

  const handleRuleChange = (e) => setRule(e.target.value);
  const handleDataChange = (e) => setData(e.target.value);

  const renderTree = (ast) => {
    const transformAstToTreeData = (node) => {
      if (!node) return null;
      if (node.type === 'operand') {
        return { name: `${node.field} ${node.operator} ${node.value}` };
      }
      return {
        name: node.operator,
        children: [transformAstToTreeData(node.left), transformAstToTreeData(node.right)].filter(Boolean),
      };
    };
    return transformAstToTreeData(ast);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rule Engine</h1>
        <div className="form-group">
          <input
            type="text"
            value={rule}
            onChange={handleRuleChange}
            placeholder="Enter rule"
            className="form-input"
          />
          <button onClick={createRule} className="form-button">Create Rule</button>
        </div>
        <div className="form-group">
          <button onClick={combineRules} className="form-button">Combine Rules</button>
        </div>
        <div className="form-group">
          <textarea
            value={data}
            onChange={handleDataChange}
            placeholder="Enter JSON data"
            className="form-textarea"
          />
          <button onClick={evaluateRule} className="form-button">Evaluate Rule</button>
        </div>
        {result !== null && <div className="result">Result: {result.toString()}</div>}
        {error && <div className="error">{error}</div>}
        <div className="ast-display">
          <h2>Rules AST</h2>
          {rules.length > 0 && (
            <div style={{ width: '100%', height: '500px' }}>
              <Tree data={renderTree(rules[rules.length - 1])} />
            </div>
          )}
          <h2>Combined AST</h2>
          {combinedAst && (
            <div style={{ width: '100%', height: '500px' }}>
              <Tree data={renderTree(combinedAst)} />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
