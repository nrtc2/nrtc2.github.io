function split2(str) {
    if (typeof str !== 'string') throw TypeError('Value must be a string');

    const arr = [];
    let cur = '';
    let qte = false;
    let hasToken = false; // Tracks if we started a token (even an empty one)

    for (let c = 0; c < str.length; c++) {
        const ch = str[c];

        // Handle spaces outside of quotes
        if (ch === ' ' && !qte) {
            if (hasToken || cur.length > 0) {
                arr.push(cur);
                cur = '';
                hasToken = false;
            }
            continue;
        }

        // Handle quotes
        if (ch === '"') {
            qte = !qte;
            hasToken = true; // A quote block guarantees a token exists, even if ""
            continue;
        }

        // Handle escape characters
        if (ch === '\\') {
            if (c + 1 >= str.length) throw Error("Invalid escape at end of string");

            const next = str[++c];
            hasToken = true;

            switch (next) {
                case 'n':  cur += '\n'; break;
                case 't':  cur += '\t'; break;
                case 'r':  cur += '\r'; break;
                case 'b':  cur += '\b'; break;
                case 'v':  cur += '\v'; break;
                case 'f':  cur += '\f'; break;
                case '\\': cur += '\\'; break;
                case '"':  cur += '"';  break;
                case ' ':  cur += ' ';  break;
                default:   throw Error('Unknown escape');
            }
            continue;
        }

        // Regular characters
        cur += ch;
        hasToken = true;
    }

    if (qte) throw Error('unterminated string');
    
    // Push the remaining token if it exists
    if (hasToken || cur.length > 0) {
        arr.push(cur);
    }

    return arr;
}
