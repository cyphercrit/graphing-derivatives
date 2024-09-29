const graphBtn = document.getElementById("graphBtn");

// initialize the graphing board
const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [-6, 4, 6, -4],
    axis: true,
    grid: {
        majorStep: 1,
    },
    showCopyright: false,
    showNavigation: true,
    autoPosition: true
});

// initialize mathquill
let MQ = MathQuill.getInterface(2);
let mathFieldSpan = document.getElementById('mathquill-input');
let fx = document.getElementById('function-decl');
let fxField = MQ.StaticMath(fx);
fxField.latex('f(x)=');
let mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true
});

// parses input into latex code
function parseMathInput() {
    let latex = mathField.latex();
    console.log("Parsed LaTeX:", latex);

    let expression = latex
        .replace(/\\right+|\\left+/g, '') // handles \left and \right \\sin\s*\((.?[0-9].?\*x)
        .replace(/(.?[0-9].?)(x)/g, '$1*$2') // handles num * x
        .replace(/\\sin\s*(\.?[0-9]*?\.?[0-9]*?\*?x)/g, 'math.sin($1)') // handles sin without parentheses
        .replace(/\\sin+\s*\((.*?)\)/g, 'math.sin($1)') // handles sin with parentheses
        .replace(/\\cdot/g, '*') // handles latex multiplication symbol

    console.log("Parsed expression:", expression)
    return expression;
}

// handles graphing, ran whenever listeners are triggered
function handleGraphing() {
    let expression = parseMathInput();
    console.log("Graphing function:", expression);
    try {
        board.removeObject(board.objects['functionGraph']); // removes any previous graph ** needs work
        
        let f = new Function('x', 'return ' + expression);
        board.create('functiongraph', [f], {name: 'functionGraph'}); // graphs function

        console.log("Graph created successfuly");
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