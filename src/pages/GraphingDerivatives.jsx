import React, { useEffect, useRef } from 'react';
import styles from './GraphingDerivatives.module.css';
import Desmos from 'desmos';

function GraphingDerivatives() {
  const functionDeclRef = useRef(null);
  const inputRef = useRef(null);
  const graphBtnRef = useRef(null);
  const boardRef = useRef(null);
  const original = useRef(null);
  const derivative = useRef(null);
  const calculatorRef = useRef(null);
  const mathFieldRef = useRef(null);

  useEffect(() => {
    document.title = 'Graphing Derivatives';

    calculatorRef.current = Desmos.GraphingCalculator(boardRef.current, {
      keypad: false,
      expressions: false,
      settingsMenu: false,
      zoomButtons: true,
      border: false,
      plotImplicits: true,
      zoomFit: true,
    });

    const MQ = MathQuill.getInterface(2);

    MQ.StaticMath(functionDeclRef.current).latex('f(x)=');
    MQ.StaticMath(original.current).latex('f(x)\\space\\Longrightarrow\\space');
    MQ.StaticMath(derivative.current).latex('f\'(x)\\space\\Longrightarrow\\space');

    mathFieldRef.current = MQ.MathField(inputRef.current, {
      spaceBehavesLikeTab: true,
      autoCommands: 'pi sqrt',
      handlers: {
        enter: () => handleGraphing(),
      },
    });

    const parseMathInput = () => {
      return mathFieldRef.current?.latex() || '';
    };

    const handleGraphing = () => {
      const originalFunction = parseMathInput();
      const firstDerivative = '\\frac{d}{dx}('.concat(originalFunction).concat(')');

      try {
        calculatorRef.current?.setExpressions([
          { id: 'firstDerivative', latex: firstDerivative, color: '#ff3333' },
          { id: 'originalFunction', latex: originalFunction, color: '#33ecff' },
        ]);
      } catch (error) {
        console.error("Error creating graph:", error);
      }
    };

    // sets example function
    mathFieldRef.current.latex("\\sin^2(x)+cos(x)");
    handleGraphing();

    graphBtnRef.current?.addEventListener('click', handleGraphing);

    const graphBtnC = graphBtnRef.current
    
    // cleanup
    return () => {
      calculatorRef.current?.destroy();
      graphBtnC.removeEventListener('click', handleGraphing);
    }
  }, []);

  return (
    <>
    <section className={styles.title}>
      <div className={styles.titleMsg}>
        <h2>Derivative Grapher</h2>
      </div>
      <div className={styles.input}>
        <div ref={functionDeclRef} className={styles.functionDeclRef}>
          <p><b>f(x)=</b></p>
        </div>
        <span ref={inputRef} className={styles.inputRef}></span>
        <button className={styles.btn} ref={graphBtnRef}>
          Graph!
        </button>
      </div>
    </section>
    <section className={styles.grapher}>
      <div ref={boardRef} className={styles.board}></div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span ref={original} className={styles.original}>f(x)-&gt;</span>
          <span className={styles.colorBox} style={{ backgroundColor: "#33ecff" }} />
        </div>
        <div className={styles.legendItem}>
          <span ref={derivative} className={styles.derivative}>f'(x)-&gt;</span>
          <span className={styles.colorBox} style={{ backgroundColor: "#ff3333" }} />
        </div>
      </div>
    </section>
    </>
  );
}

export default GraphingDerivatives