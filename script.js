const graphBtn = document.getElementById("graphBtn");

// initialize the graphing board
let elt = document.getElementById('board');
let board = Desmos.GraphingCalculator(elt, {
    keypad: false,
    expressions: false,
    settingsMenu: false,
    zoomButtons: true,
    border: false,
    plotImplicits: true,
    zoomFit: true,
});

// initialize mathquill and http elements
let MQ = MathQuill.getInterface(2);
let fx = document.getElementById('function-decl');
let originalid = document.getElementById('original');
let derivativeid = document.getElementById('derivative');
let fxField = MQ.StaticMath(fx);
fxField.latex('f(x)=');
let originalLegend = MQ.StaticMath(originalid);
originalLegend.latex('f(x)\\space\\Longrightarrow\\space');
let derivativeLegend = MQ.StaticMath(derivativeid);
derivativeLegend.latex('f\'(x)\\space\\Longrightarrow\\space');

let mathFieldSpan = document.getElementById('mathquill-input');
let mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true,
    autoCommands: 'pi sqrt',
});
mathField.latex("\\sin^2(x)+cos(x)");
handleGraphing();

// parses input into latex code
function parseMathInput() {
    let originalFunction = mathField.latex();
    // console.log("Parsed expression:", originalFunction);
    return originalFunction;
}

// handles graphing, ran whenever listeners are triggered
function handleGraphing() {
    let originalFunction = parseMathInput();
    let firstDerivative = '\\frac{d}{dx}('.concat(originalFunction).concat(')');
    // console.log(firstDerivative);
    // console.log("Graphing function:", originalFunction);
    try {
        board.setExpressions([]); // removes any previous graphs
        
        board.setExpression({id: 'firstDerivative', latex: firstDerivative, color: '#ff3333'});
        board.setExpression({id: 'originalFunction', latex: originalFunction, color: '#33ecff'});

        // console.log("Graph created successfuly");
    } catch (error) {
        console.error("Error creating graph:", error);
    }
}

graphBtn.addEventListener('click', handleGraphing); // listens for click of Graph! button
    
    document.addEventListener('keydown', (event) => { // listens for enter click
        if (event.key == 'Enter') {
            handleGraphing();
        }
    });