// A whole bunch of Unicode non-printing garbage.
export const symbols = String.fromCodePoint(
  0x0000, // NULL
  0x0001, // START OF HEADING
  0x0002, // START OF TEXT
  0x0003, // END OF TEXT
  0x0004, // END OF TRANSMISSION
  0x0005, // END OF QUERY
  0x0006, // ACKNOWLEDGE,
  0x0007, // BEL
  0x0010, // DATA LINK ESCAPE
  0x0011, // DEVICE CONTROL 1
  0x0012, // DEVICE CONTROL 2
  0x0013, // DEVICE CONTROL 3
  0x0014, // DEVICE CONTROL 4
  0x0015, // NEGATIVE ACKNOWLDEGEMENT
  0x0016, // SYNCHRONIZE
  0x0017, // END OF TRANSMISSION BLOCK
  0x0018, // CANCEL
  0x0019, // END OF MEDIUM
  0x001a, // SUBSTITUTE
  0x001b, // ESCAPE
  0x001c, // FILE SEPARATOR
  0x001d, // GROUP SEPARATOR
  0x001e, // RECORD SEPARATOR
  0x001f, // UNIT SEPARATOR
  0x180e, // MONGOLIAN VOWEL SEPARATOR
  0x200b, // ZERO WIDTH SPACE
  0xfeff // ZERO WIDTH NO BREAK SPACE
);

// Obfuscate a string to fool scrapers looking at the page's static HTML.
export function mangle(input: string): string {
  let rand = Array.from(input)
    .map(e => e.codePointAt(0))
    .reduce((a, b) => (a << 2) + b, 0); // seed value for hash/rng/whatever thing

  const advance = () => {
    rand = Math.abs((7 * rand + 13) & 0xffffffff);
    return rand;
  };

  for (let i = 0; i < 9000; i++) {
    advance();
  }

  let output = "";

  for (const ch of input) {
    // Append a bunch of garbage to the string
    const garbageChars = advance() % 50;
    for (let i = 0; i < garbageChars; i++) {
      const ind = advance() % symbols.length;
      const trash = symbols[ind];
      output += trash;
    }

    // Append the real character
    output += ch;
  }

  return output;
}

// Removes the mangled characters from a string.
export function unmangle(input: string): string {
  return Array.from(input)
    .filter(e => symbols.indexOf(e) == -1)
    .reduce((a, b) => a + b, "");
}

export function mangleObj(input: {
  [key: string]: string;
}): { [key: string]: string } {
  return Object.entries(input)
    .map(([key, val]) => [key, mangle(val)])
    .reduce((obj, add) => {
      obj[add[0]] = add[1];
      return obj;
    }, {});
}

// @ts-ignore
if (typeof window !== "undefined") {
  // @ts-ignore
  window.makeBlob = obj => {
    const mangled = mangleObj(obj);
    const str = JSON.stringify(mangled);
    const uri = encodeURIComponent(str);

    return `module.exports = JSON.parse(decodeURIComponent("${uri}"));`;
  };
}
