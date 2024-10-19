import React, { useState } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import './App.css';

function App() {
  const [inputRule, setInputRule] = useState('');
  const [ruleList, setRuleList] = useState([]);

  const [jsonData, setJsonData] = useState('{}');
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [finalAst, setFinalAst] = useState(null);

  const handleRuleCreation = async () => {
    try {
      if (inputRule.trim() === '') {

        throw new Error('Please provide a rule');

      }

      
      const ruleRegex = /^\s*([a-zA-Z_]\w*)\s*(>|<|=)\s*([\w\d]+)\s*$/;

      if (!ruleRegex.test(inputRule.trim())) {

        throw new Error('Invalid format. Use: "field operator value"');
      }

      const response = await axios.post('http://localhost:5000/create_rule', { rule: inputRule });

      setRuleList([...ruleList, response.data.ast]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.error : error.message);
    }
  };

  const handleRuleCombination = async () => {
    try {
      if (ruleList.length < 2) {

        throw new Error('You need at least two rules to combine');

      }

      const response = await axios.post('http://localhost:5000/combine_rules', { rules: ruleList });
      setFinalAst(response.data.ast);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred on the server');

    }
  };

  const handleEvaluation = async () => {

    try {
      if (!finalAst || !jsonData || typeof JSON.parse(jsonData) !== 'object') {
        throw new Error('Invalid AST or data provided');
      }
      const response = await axios.post('http://localhost:5000/evaluate_rule', { ast: finalAst, data: JSON.parse(jsonData) });
      setEvaluationResult(response.data.result);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred on the server');
    }
  };

  const handleInputChange = (e) => setInputRule(e.target.value);
  const handleJsonChange = (e) => setJsonData(e.target.value);

  const convertAstToTreeData = (astNode) => {
    if (!astNode) return null;
    if (astNode.type === 'operand') {
      return { name: `${astNode.field} ${astNode.operator} ${astNode.value}` };
    }
    return {
      name: astNode.operator,
      children: [convertAstToTreeData(astNode.left), convertAstToTreeData(astNode.right)].filter(Boolean),
    };
  };

  return (
    <div className="App">
      
      <header className="App-header">
        
        <h1>Rule Engine Web Application</h1>
        
        <div className="form-group">
          <input
            type="text"
            
            value={inputRule}
            onChange={handleInputChange}

            placeholder="Type your rule here"
            className="form-input"

          />
          <button onClick={handleRuleCreation} className="form-button">Create Rule</button>
        </div>
        <div className="form-group">
          <button onClick={handleRuleCombination} className="form-button">Combine Rules</button>

        </div>
        <div className="form-group">
          <textarea
            value={jsonData}
            onChange={handleJsonChange}
            placeholder="Input JSON data"

            className="form-textarea"
          />
          <button onClick={handleEvaluation} className="form-button">Evaluate Rule</button>
        </div>
        {evaluationResult !== null && <div className="result">Result: {evaluationResult.toString()}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="ast-display">
          <h2>Current Rules AST</h2>

          {ruleList.length > 0 && (
            <div style={{ width: '100%', height: '500px' }}>
              <Tree data={convertAstToTreeData(ruleList[ruleList.length - 1])} />
            </div>
          )}
          <h2>Combined AST</h2>
          {finalAst && (
            <div style={{ width: '100%', height: '500px' }}>
              <Tree data={convertAstToTreeData(finalAst)} />

            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
