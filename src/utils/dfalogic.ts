export interface DFARules {
  reqLetter: boolean;
  reqNumber: boolean;
  reqSymbol: boolean;
  minLength: number;
}

export interface DFAState {
  hasL: boolean;
  hasN: boolean;
  hasS: boolean;
  length: number;
}

export interface DFAResult {
  isAccepted: boolean;
  letterOk: boolean;
  numberOk: boolean;
  symbolOk: boolean;
  lengthOk: boolean;
  finalStateInfo: DFAState;
}

export class PasswordDFA {
  private readonly rules: DFARules;
  private readonly initialState: DFAState = { hasL: false, hasN: false, hasS: false, length: 0 };

  constructor(rules: DFARules) {
    this.rules = rules;
  }

  private getCharType(char: string): 'L' | 'N' | 'S' | 'O' {
    if (/[a-zA-Z]/.test(char)) return 'L';
    if (/[0-9]/.test(char)) return 'N';
    if (/[^a-zA-Z0-9\s]/.test(char)) return 'S';
    return 'O';
  }

  private transition(currentState: DFAState, char: string): DFAState {
    const type = this.getCharType(char);
    return {
      hasL: currentState.hasL || type === 'L',
      hasN: currentState.hasN || type === 'N',
      hasS: currentState.hasS || type === 'S',
      length: currentState.length + 1,
    };
  }

  public run(inputString: string): DFAResult {
    let currentState = this.initialState;
    for (const char of inputString) {
      currentState = this.transition(currentState, char);
    }
    return this.evaluateState(currentState);
  }

  private evaluateState(finalState: DFAState): DFAResult {
    const letterOk = !this.rules.reqLetter || finalState.hasL;
    const numberOk = !this.rules.reqNumber || finalState.hasN;
    const symbolOk = !this.rules.reqSymbol || finalState.hasS;
    const lengthOk = finalState.length >= this.rules.minLength;

    return {
      isAccepted: letterOk && numberOk && symbolOk && lengthOk,
      letterOk,
      numberOk,
      symbolOk,
      lengthOk,
      finalStateInfo: finalState,
    };
  }
}