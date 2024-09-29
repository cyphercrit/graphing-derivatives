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

    // convert to expression
    let expression = latex
        .replace(/([0-9])([a-zA-Z])/g, '$1*$2')                     // Adds * between number and variable (e.g., 2x -> 2*x)
        .replace(/([0-9])\\left/g, '$1(')                            // Convert 2\left to 2( 
        .replace(/\\left/g, '')                                      // Remove \left
        .replace(/\\right/g, '')                                     // Remove \right
        .replace(/([0-9])\\([a-zA-Z]+)/g, '$1*Math.$2')            // Converts (int)\sin to int * Math.sin
        .replace(/\\sin/g, 'Math.sin')                               // Converts \sin to Math.sin
        .replace(/\\cos/g, 'Math.cos')                               // Converts \cos to Math.cos
        .replace(/\\tan/g, 'Math.tan')                               // Converts \tan to Math.tan
        .replace(/([0-9])\(/g, '$1*(');                              // Adds * between number and parentheses (e.g., 2( -> 2*( )
    

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