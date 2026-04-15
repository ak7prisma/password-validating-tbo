type CharacterClass = 'L' | 'N' | 'S' | 'OTHER';

export interface DFAPolicy {
  requireAlpha: boolean;
  requireNumeric: boolean;
  requireSymbol: boolean;
  minLength: number;
}

export interface DFATraceStep {
  char: string;
  charClass: CharacterClass;
  fromState: string;
  toState: string;
}

export interface DFAResult {
  isAccepted: boolean;
  hasAlpha: boolean;
  hasNumeric: boolean;
  hasSymbol: boolean;
  isLengthValid: boolean;
  inputLength: number;
  trace: DFATraceStep[];
  finalState: string;
}

export class PasswordDFA {
  private readonly policy: DFAPolicy;
  
  constructor(policy: DFAPolicy) {
    this.policy = policy;
  }

  private getCharClass(char: string): CharacterClass {
    if (/[a-zA-Z]/.test(char)) return 'L';
    if (/\d/.test(char)) return 'N';
    if (/[^a-zA-Z0-9\s]/.test(char)) return 'S';
    return 'OTHER';
  }

  private transition(currentState: string, char: string): string {
    const parts = currentState.split('_');
    let hasL = Number.parseInt(parts[1], 10);
    let hasN = Number.parseInt(parts[2], 10);
    let hasS = Number.parseInt(parts[3], 10);
    let len = Number.parseInt(parts[4], 10);

    const charClass = this.getCharClass(char);

    if (charClass === 'L') hasL = 1;
    if (charClass === 'N') hasN = 1;
    if (charClass === 'S') hasS = 1;
    
    if (len < this.policy.minLength) {
      len += 1;
    } else if (this.policy.minLength === 0) {
      len = 0;
    }

    return `q_${hasL}_${hasN}_${hasS}_${len}`;
  }

  public evaluate(input: string): DFAResult {
    const q0 = 'q_0_0_0_0';
    let currentState = q0;
    const trace: DFATraceStep[] = [];

    for (const element of input) {
        const char = element;
        const nextState = this.transition(currentState, char);
        trace.push({
            char,
            charClass: this.getCharClass(char),
            fromState: currentState,
            toState: nextState
        });
        currentState = nextState;
    }

    const finalLength = input.length;
    
    const parts = currentState.split('_');
    const finalHasL = parts[1] === '1';
    const finalHasN = parts[2] === '1';
    const finalHasS = parts[3] === '1';

    const hasAlphaValid = !this.policy.requireAlpha || finalHasL;
    const hasNumericValid = !this.policy.requireNumeric || finalHasN;
    const hasSymbolValid = !this.policy.requireSymbol || finalHasS;
    const isLengthValid = finalLength >= this.policy.minLength;
    
    const isAccepted = hasAlphaValid && hasNumericValid && hasSymbolValid && isLengthValid;

    return {
      isAccepted,
      hasAlpha: finalHasL,
      hasNumeric: finalHasN,
      hasSymbol: finalHasS,
      isLengthValid,
      inputLength: finalLength,
      trace,
      finalState: currentState
    };
  }
}
