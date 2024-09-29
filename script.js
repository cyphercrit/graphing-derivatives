const graphBtn = document.getElementById("graphBtn");

// initialize the graphing board
const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [-7.5, 5, 7.5, -5],
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
    return latex;
}

// handles graphing, ran whenever listeners are triggered
function handleGraphing() {
    let latex = parseMathInput();
    console.log("Graphing function:", latex);
    try {
        board.removeObject(board.objects.functionGraph); // removes any previous graph
        
        let f = board.jc.snippet(latex, true, 'x', true);
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