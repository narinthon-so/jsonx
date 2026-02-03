export const formatJson = (input: string): string => {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
};

export const minifyJson = (input: string): string => {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
};

export const loadSample = (): string => {
  return JSON.stringify({
    "project": "JSON Validator",
    "version": 1.0,
    "features": [
      "Validation",
      "Formatting",
      "Minification",
      "PWA Support"
    ],
    "author": {
      "name": "Antigravity",
      "role": "agent"
    },
    "isValid": true
  }, null, 2);
};

export const jsonToString = (input: string): string => {
  // First ensure it's valid JSON
  const parsed = JSON.parse(input);
  // Then stringify it to minified JSON first (optional, but usually desired for "stringified" payload)
  const minified = JSON.stringify(parsed);
  // Then stringify again to escape it into a string
  return JSON.stringify(minified);
};

export const stringToJson = (input: string): string => {
  // Parse the outer string to get the inner content
  const parsed = JSON.parse(input);
  // If the result is a string, it might need another parse if it was double encoded, 
  // but usually "From String" just means "Unescape this string".
  // However, we want to return a formatted JSON object for the editor.
  if (typeof parsed === 'string') {
    const innerObj = JSON.parse(parsed);
    return JSON.stringify(innerObj, null, 2);
  }
  return JSON.stringify(parsed, null, 2);
};
