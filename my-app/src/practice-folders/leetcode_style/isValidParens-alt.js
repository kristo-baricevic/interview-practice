/**
 * Returns true when the input string has balanced brackets, false otherwise.
 * Should support {}, [], (), and <>.
 * Example of balanced strings:
 * - "{}", "[]", "()", "<>", "{[()]}", "{<>[]()}"
 * Example of unbalanced strings:
 * - "{", "}", "[{{}]", "{[}]", "{[}]"
 *
 * @returns {boolean} - True if the input string has balanced brackets, false otherwise.
 */
export const parseBrackets = (input) => {
  let stack = [];
  const dict = {
    ")": "(",
    "}": "{",
    "]": "[",
    ">": "<",
  };

  for (let i = 0; i < input.length; i++) {
    if (
      input[i] === "(" ||
      input[i] === "{" ||
      input[i] === "[" ||
      input[i] === "<"
    ) {
      stack.push(input[i]);
    } else {
      if (stack.length === 0) return false;
      if (stack.pop() !== dict[input[i]]) return false;
    }
  }
  return stack.length === 0;
};

// how would you handle adding letters into the brackets? ie [[ddsj]]
