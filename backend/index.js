const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const { generateRuleAst, mergeRules, validateRule } = require('./models');
const app = express();
const serverPort = 5000;


app.use(cors());
app.use(bodyParser.json());

app.post('/rule/new', (req, res) => {
  try {
    const ruleDefinition = req.body.rule;

    
    if (typeof ruleDefinition !== 'string') {
      throw new Error('Expected rule in string format');
    }

    
    const ruleAst = generateRuleAst(ruleDefinition);
    res.json({ ruleAst });
  } catch (err) {
    
    res.status(400).json({ error: err.message });
  }
});


app.post('/rule/combine', (req, res) => {
  try {
    const ruleSet = req.body.rules;

    
    if (!Array.isArray(ruleSet) || ruleSet.length < 2) {
      throw new Error('Provide at least two valid rules to combine');
    }

    
    const combinedAst = mergeRules(ruleSet);
    res.json({ combinedAst });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post('/rule/evaluate', (req, res) => {
  try {
    const { ruleAst, inputData } = req.body;

   
    if (typeof ruleAst !== 'object' || typeof inputData !== 'object') {
      throw new Error('Invalid input: expected both rule AST and data to be objects');
    }

    
    const evaluationResult = validateRule(ruleAst, inputData);
    res.json({ evaluationResult });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(serverPort, () => {
  console.log(`Server active and listening on port ${serverPort}`);
});
