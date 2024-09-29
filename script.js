// Initialize MathQuill
let MQ = MathQuill.getInterface(2);
let mathFieldSpan = document.getElementById('mathquill-input');
let fx = document.getElementById('function-decl');
let fxField = MQ.StaticMath(fx);
fxField.latex('f(x)=');
let mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true,
    // handlers: {
    //     edit: function() {
    //         // This function will be called every time the input changes
    //     }
    // }
});

// Initialize the board
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