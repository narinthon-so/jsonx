import Prism from 'prismjs';
import 'prismjs/components/prism-json';

export const highlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.json, 'json');
};
