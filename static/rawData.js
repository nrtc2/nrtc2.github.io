function rawData(e, indent, seen = new WeakSet()) {
    if (typeof e === 'object' && e !== null) {
        if (seen.has(e)) return '...';
        seen.add(e);

        try {
            if (e instanceof RegExp) return e.toString();
            if (e instanceof Date) return (new Date).toJSON();
            if (e instanceof Error) return e.toString();

            if (Array.isArray(e)) {
                return `[${e.map(v => rawData(v, indent, seen)).join(', ')}]`;
            }

            if (e instanceof Map) {
                return `Map(${e.size}) {${[...e.entries()]
                    .map(([k, v]) => `${rawData(k, indent, seen)} => ${rawData(v, indent, seen)}`)
                    .join(', ')}}`;
            }

            if (e instanceof Set) {
                return `Set(${e.size}) {${[...e]
                    .map(v => rawData(v, indent, seen))
                    .join(', ')}}`;
            }

            const keys = Reflect.ownKeys(e);
            const props = keys.map(key =>
                `${typeof key !== "symbol" ? /^[a-z$_][0-9a-z$_]*$/i.test(String(key)) ? String(key) : `${rawData(String(key))}` : `[${rawData(key)}]`}: ${rawData(e[key], indent, seen)}`
            );

            const prefix = e.constructor?.name !== 'Object' ?
                `${e.constructor.name} ` :
                '';

            return `${prefix}{${props.join(', ')}}`;

        } finally {
            seen.delete(e);
        }
    }

    if (typeof e === 'bigint') return `${e}n`;

    if (typeof e === 'string') {
        return `'${e
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x1f\x7f-\x9f\ud800-\udfff]/g, ch => {
                const c = ch.codePointAt(0);
                return `\\${c < 256 ? 'x' : 'u'}${c
                    .toString(16)
                    .padStart(c < 256 ? 2 : 4, '0')}`;
            })}'`;
    }

    if (typeof e === 'symbol') {
        return `Symbol(${e.description})`;
    }

    if (typeof e === 'number') {
        return (1 / e === -Infinity && e === 0) ? '-0' : String(e);
    }

    return String(e);
}

// better than JSON™

function rawData(e, seen = new WeakSet()) {
    if (typeof e === 'object' && e !== null) {
        if (seen.has(e)) return '...';
        seen.add(e);

        try {
            if (e instanceof RegExp) return e.toString();
            if (e instanceof Date) return `new Date(${e.getTime()})`;
            if (e instanceof Error) return `new Error(${rawData(e.message)})`;

            if (Array.isArray(e)) {
                return `[${e.map(v => rawData(v, seen)).join(', ')}]`;
            }

            if (e instanceof Map) {
                return `new Map([${[...e.entries()]
                    .map(([k, v]) => `[${rawData(k, seen)}, ${rawData(v, seen)}]`)
                    .join(', ')}])`;
            }

            if (e instanceof Set) {
                return `new Set([${[...e]
                    .map(v => rawData(v, seen))
                    .join(', ')}])`;
            }

            const keys = Reflect.ownKeys(e);
            const props = keys.map(key =>
                `${typeof key !== "symbol" ? /^[a-z$_][0-9a-z$_]*$/i.test(String(key)) ? String(key) : `${rawData(String(key))}` : `[${rawData(key)}]`}: ${rawData(e[key], seen)}`
            );

            const name = e.constructor?.name

            return e.constructor?.name !== 'Object' ? `(function () {
    let ${name === "obj" ? "object" : "obj"} = Object.create(${name}.prototype);
${keys.map(t=>`    ${name === "obj" ? "object" : "obj"}[${rawData(t)}] = ${rawData(e[t], seen)};`).join(`
`)}
    return ${name === "obj" ? "object" : "obj"};
})()` : `{${props.join(', ')}}`;

        } finally {
            seen.delete(e);
        }
    }

    if (typeof e === 'bigint') return `${e}n`;

    if (typeof e === 'string') {
        return `'${e
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x1f\x7f-\x9f\ud800-\udfff]/g, ch => {
                const c = ch.codePointAt(0);
                return `\\${c < 256 ? 'x' : 'u'}${c
                    .toString(16)
                    .padStart(c < 256 ? 2 : 4, '0')}`;
            })}'`;
    }

    if (typeof e === 'symbol') {
        return `Symbol(${rawData(e.description)})`;
    }

    if (typeof e === 'number') {
        return (1 / e === -Infinity && e === 0) ? '-0' : String(e);
    }

    return String(e);
}
