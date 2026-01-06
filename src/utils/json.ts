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
