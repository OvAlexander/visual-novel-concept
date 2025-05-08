type DialogueLine = {
  character: string;
  emotion?: string;
  text: string;
  choices?: string[];
  lineNumber: number;
};

export class TextParser {
  parse(input: string): DialogueLine[] {
    return input
      .split('\n')
      .map((line, index) => this.parseLine(line.trim(), index + 1))
      .filter((result): result is DialogueLine => result !== null);
  }

  private parseLine(line: string, lineNumber: number): DialogueLine | null {
    if (!line || line.startsWith('#')) return null;

    // Pattern: [Character][@Emotion] [Dialogue Text]
    const match = line.match(
      /^(?:"(?<quotedChar>[^"]+)"|(?<unquotedChar>[^@\s]+))@?(?<emotion>\w+)?\s+(?<text>.+?)(?:\s*\[(?<choices>.*)\])?$/,
    );

    if (!match?.groups) {
      console.warn(`Invalid dialogue format at line ${lineNumber}: "${line}"`);
      return null;
    }

    const { quotedChar, unquotedChar, emotion, text, choices } = match.groups;
    const character = this.cleanCharacter(quotedChar || unquotedChar);

    const dialogueLine: DialogueLine = {
      character,
      text: this.cleanText(text),
      lineNumber,
    };

    if (emotion) dialogueLine.emotion = emotion;
    if (choices) {
      dialogueLine.choices = choices
        .split('|')
        .map((choice) => choice.trim())
        .filter((choice) => choice.length > 0);
    }

    return dialogueLine;
  }

  private cleanCharacter(char: string): string {
    return char.replace(/^"(.*)"$/, '$1');
  }

  private cleanText(text: string): string {
    return text.replace(/^"(.*)"$/, '$1');
  }
}

// const input = `
// Daffy@happy   "Hello there! Let's get coding!"
// Bugs@annoyed What's up doc? This is taking forever...
// `;
