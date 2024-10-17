# Rule Engine

A React application that allows users to create, combine, and evaluate rules. The rules are represented as Abstract Syntax Trees (AST) and can be visualized using a tree structure.

## Features

- **Create Rule**: Allows users to input a rule in the format `field operator value` (e.g., `age > 30`). The rule is validated and converted into an AST.
- **Combine Rules**: Combines multiple rules using logical operators (`AND`, `OR`) to create a more complex rule represented as a single AST.
- **Evaluate Rule**: Evaluates the combined AST against provided JSON data to determine if the data satisfies the rule.
- **Visualize AST**: Displays the AST of individual rules and the combined AST as a tree structure using `react-d3-tree`.

- **NOTE** : when we click on create rule -> a tree is generated and shown at frontend but it is in left-most corner , you need to drag it to the center to clearly see it , same happens when we click on combine rules.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/amantripathigithub/Application-1-Rule-Engine-with-AST.git

cd Application-1-Rule-Engine-with-AST.git



Backend Setup
Navigate to the backend directory:

---cd backend



Install dependencies:

---npm install



Start the backend server:

---node index.js

The backend server will run on http://localhost:5000.





Frontend Setup

Navigate to the frontend directory:

---cd frontend

Install dependencies:

---npm install


Start the frontend development server:

---npm start


The frontend server will run on http://localhost:3000.





Usage
Open your web browser and navigate to http://localhost:3000.

Create Rule: Enter a rule in the input field and click "Create Rule". The rule should be in the format field operator value (e.g., age > 30).

Combine Rules: After creating at least two rules, click "Combine Rules" to combine them into a single AST.

Evaluate Rule: Enter JSON data in the textarea (e.g., {"age": 32, "department": "Sales"}) and click "Evaluate Rule". The result (true/false) will be displayed based on whether the data satisfies the combined rule.

Visualize AST: The AST for individual rules and the combined AST will be displayed as tree structures.

Example : 
Create the following rules:

age > 30
department = Sales
age < 25
department = Marketing
Combine the rules.

Enter the following JSON data for evaluation:
{
  "age": 32,
  "department": "Sales"
}
The evaluation result should be true if the combined AST is satisfied by the provided data.

```

## screenshots


![Screenshot (2392)](https://github.com/user-attachments/assets/243d5199-dc74-44f3-8126-d7a1f7410b1a)
![Screenshot (2391)](https://github.com/user-attachments/assets/d36689e5-a79c-42b5-87bf-9fdc5e987750)
![Screenshot (2390)](https://github.com/user-attachments/assets/cfde3fcc-ceb4-4874-ae61-3685ac81ff1d)
![Screenshot (2389)](https://github.com/user-attachments/assets/f130f8bd-65ec-4434-ac1d-a917f63df247)
![Screenshot (2388)](https://github.com/user-attachments/assets/6edfc4ef-1c97-492b-8f74-c6135549d04d)
![Screenshot (2387)](https://github.com/user-attachments/assets/b897ea98-9912-4dae-86ce-f6f3230962e2)
![Screenshot (2386)](https://github.com/user-attachments/assets/00f671ec-8644-4e1d-812d-83faf29311ad)
![Screenshot (2385)](https://github.com/user-attachments/assets/34f1dda1-42d1-42b2-80d5-08b21eaa0491)
![Screenshot (2384)](https://github.com/user-attachments/assets/31a6574a-6b1a-4aae-a486-932a42cd680c)
