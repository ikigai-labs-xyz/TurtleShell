const parser = require("@solidity-parser/parser");

  const extractValue = (valueNode) => {
    const type = valueNode?.type;
    let value = "";
    if (type === "NumberLiteral") {
      value = valueNode.number;
    } else if (type === "BooleanLiteral") {
      value = valueNode.value;
    } else if (type === "StringLiteral") {
      value = valueNode.value;
    } else if (type === "ArrayLiteral") {
      value = valueNode.elements.map((element) => extractValue(element));
    } else if (type === "TupleExpression") {
      value = valueNode.components.map((component) => extractValue(component));
    }

    return value;
  };

    const extractExpression = (expression) => {
    const type = expression.type;
    if (type === "Identifier") {
      return expression.name;
    } else if (type === "NumberLiteral") {
      return expression.number;
    } else if (type === "BooleanLiteral") {
      return expression.value;
    } else if (type === "StringLiteral") {
      return expression.value;
    } else if (type === "ArrayLiteral") {
      return expression.elements.map((element) => extractValue(element));
    } else if (type === "TupleExpression") {
      return expression.components.map((component) => extractValue(component));
    } else if (type === "MemberAccess") {
      const _expression = expression.expression;
      const memberName = expression.memberName;
      return `${extractExpression(_expression)}.${memberName}`;
    } else if (type === "IndexAccess") {
      const base = expression.base;
      const index = expression.index;
      return `${extractExpression(base)}[${extractValue(index)}]`;
    } else if (type === "BinaryOperation") {
      const left = expression.left;
      const right = expression.right;
      const operator = expression.operator;
      const leftValue = extractExpression(left);
      const rightValue = extractExpression(right);
      return `${leftValue} ${operator} ${rightValue}`;
    }
  };

  const extractFunctionStatements = (statements) => {
    const statementTokens = statements.map((statement) => {
      const type = statement.type;
      if (type === "ExpressionStatement") {
        const expression = statement.expression;
        const expressionString = extractExpression(expression);
        return `${expressionString};`;
      }
    });
    return statementTokens;
  };

    const extractTypeName = (typeName) => {
      console.log(typeName)
    const type = typeName.type;
    if (type === "ElementaryTypeName") {
      return typeName.name;
    } else if (type === "UserDefinedTypeName") {
      return typeName.namePath;
    } else if (type === "ArrayTypeName") {
      const baseTypeName = extractTypeName(typeName.baseTypeName);
      const length = typeName.length;
      return `${baseTypeName}[${length}]`;
    } else if (type === "Mapping") {
      const keyType = extractTypeName(typeName.keyType);
      const valueType = extractTypeName(typeName.valueType);
      return `mapping(${keyType} => ${valueType})`;
    }
  }


const parseContract = (contract) => {
  const ast = parser.parse(contract);

  const pragmaAst = ast.children.find(
    (node) => node.type === "PragmaDirective"
  );

  const pragmaTokens = `pragma solidity ${pragmaAst?.value || ''};`;

  const contractDefinitionList = ast.children.filter(
    (node) => node.type === "ContractDefinition"
  );

  const contractDefinitionTokensList = [];
  const functionLevelTokenslist = [];
  const functionStatementsTokensList = [];

  for(let contractDefinition of contractDefinitionList){
      const contractName = contractDefinition.name;
      const stateVariableDeclarations = contractDefinition.subNodes.filter(
        (node) => node.type === "StateVariableDeclaration"
      );
      const functionDefinitions = contractDefinition.subNodes.filter(
        (node) => node.type === "FunctionDefinition"
      );

      const stateVariableDeclarationTokens = stateVariableDeclarations.map(
        (node) => {

          const variables = node.variables[0];
          const name = variables.name;
          const type = extractTypeName(variables.typeName);
          const visibility = variables.visibility == "default" ? "internal" : variables.visibility;
          const value = extractValue(variables.initialValue);
          const valueString = value ? ` = ${value}` : "";
          return `${type} ${visibility} ${name} ${valueString};`;
        }
      );

        const functionDefinitionTokens = functionDefinitions.map((node) => {
    const name = node.isConstructor ? "constructor" : node.name;
    const visibility =
      node.visibility == "default"
        ? node.isConstructor
          ? ""
          : "internal"
        : node.visibility;
    const parameters = node.parameters.parameters;
    const parametersString = parameters
      ?.map((parameter) => `${extractTypeName(parameter.typeName)} ${parameter.name}`)
      .join(", ");
    const returnParameters = node.returnParameters;
    const returnParametersString = returnParameters
      ?.map((parameter) => `${extractTypeName(parameter.typeName)} ${parameter.name}`)
      .join(", ");
    const statements = node.body.statements;
    const statementsString = extractFunctionStatements(statements).join(" ");
    return `function ${name || ""} (${parametersString || ""}) ${
      visibility || ""
    } returns (${returnParametersString || ""}) {${statementsString || ""}}`;
  });

        const functionLevelTokens = functionDefinitionTokens.map((node) => {
          return node + ` contract ${contractName || ""} { }`;
        });

        const functionStatementsTokens = functionDefinitions.map((node) => {
          const name = node.isConstructor ? "constructor" : node.name;
          const visibility =
            node.visibility == "default"
              ? node.isConstructor
                ? ""
                : "internal"
              : node.visibility;
          const parameters = node.parameters.parameters;
          const parametersString = parameters
            ?.map((parameter) => `${extractTypeName(parameter.typeName)} ${parameter.name}`)
            .join(", ");
          const returnParameters = node.returnParameters;
          const returnParametersString = returnParameters
            ?.map((parameter) => `${extractTypeName(parameter.typeName)} ${parameter.name}`)
            .join(", ");
          const statements = node.body.statements;
          const statementsString = extractFunctionStatements(statements).join(" ");
          return ` sourceUnit contractDefinition contractPart functionDefinition block statement simpleStatement ${
            statementsString || ""
          } function ${name || ""} (${parametersString || ""}) ${
            visibility || ""
          } returns (${returnParametersString || ""}) contract ${
            contractName || ""
          } { }`;
        });

        const contractDefinitionTokens = [
          `${pragmaTokens} contract ${
            contractName || ""
          } { ${stateVariableDeclarationTokens.join(
            " "
          )}  ${functionDefinitionTokens.join(" ")} }}}`,
        ];

        for (let _contractDefinitionToken of contractDefinitionTokens) {
          contractDefinitionTokensList.push(_contractDefinitionToken);
        }
        for (let _functionLevelToken of functionLevelTokens) {
            functionLevelTokenslist.push(_functionLevelToken);
        }
        for (let _functionStatementsToken of functionStatementsTokens) {
            functionStatementsTokensList.push(_functionStatementsToken);
        }
  }

  const astTokens = {
    ContractLevelTokenization: contractDefinitionTokensList,
    FunctionLevelTokenization: functionLevelTokenslist,
    StatementLevelTokenization: functionStatementsTokensList,
  };

  return astTokens;
}

module.exports = {
  parseContract,
};
