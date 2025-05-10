import { ASSET_KEYS } from "../scenes/common";

type DialogueLine = {
  character: string;
  emotion?: string;
  text: string;
  choices?: string[];
  image?: keyof typeof ASSET_KEYS; // Reference to your asset keys
  music?: keyof typeof ASSET_KEYS; // Reference to your asset keys
  timing?: number; // Duration in milliseconds
  animation?: string;
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

    // Pattern: [Character][@Emotion] [Dialogue Text] [!image=] [!music=] [!timing=]
    const match = line.match(
      /^(?:"(?<quotedChar>[^"]+)"|(?<unquotedChar>[^@\s]+))@?(?<emotion>\w+)?\s+(?<text>.+?)(?:\s*\[(?<choices>.*)\])?(?:\s*!image=(?<image>\w+))?(?:\s*!music=(?<music>\w+))?(?:\s*!animation=(?<animation>\w+))?(?:\s*!timing=(?<timing>\d+))?$/,
    );

    if (!match?.groups) {
      console.warn(`Invalid dialogue format at line ${lineNumber}: "${line}"`);
      return null;
    }

    const { quotedChar, unquotedChar, emotion, text, choices, image, music, animation, timing } = match.groups;
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
    if (image) dialogueLine.image = this.validateAssetKey(image);
    if (music) dialogueLine.music = this.validateAssetKey(music);
    if (animation) dialogueLine.animation = animation;
    if (timing) {
      const timingValue = parseInt(timing, 10);
      dialogueLine.timing = timingValue > 0 ? timingValue : 3000;
    }

    return dialogueLine;
  }
  private validateAssetKey(key: string): keyof typeof ASSET_KEYS {
    const upperKey = key.toUpperCase();
    if (!(upperKey in ASSET_KEYS)) {
      console.warn(`Invalid asset key: ${key}`);
      return 'DAFFY' as keyof typeof ASSET_KEYS; // Fallback key
    }
    return upperKey as keyof typeof ASSET_KEYS;
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
