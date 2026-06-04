function format(e, indent, depth = 0, seen = new WeakSet()) {
    // Helper to calculate spacing for the current and next line
    const getSpacing = () => {
        if (!indent) return { base: '', inner: '', nl: '' };
        const spaceStr = typeof indent === 'number' ? ' '.repeat(indent) : indent;
        return {
            base: spaceStr.repeat(depth),
            inner: spaceStr.repeat(depth + 1),
            nl: '\n'
        };
    };

    if (typeof e === 'object' && e !== null) {
        if (seen.has(e)) return '...';
        seen.add(e);

        try {
            if (e instanceof RegExp) return e.toString();
            // Fixed small bug: (new Date).toJSON() inside a try block creates an endless loop 
            // if called on a fresh date without an instance check, e.toJSON() is cleaner
            if (e instanceof Date) return typeof e.toJSON === 'function' ? e.toJSON() : (new Date(e)).toJSON();
            if (e instanceof Error) return e.toString();

            const { base, inner, nl } = getSpacing();

            if (Array.isArray(e)) {
                if (e.length === 0) return '[]';
                const items = e.map(v => format(v, indent, depth + 1, seen)).join(`,${nl}${inner}`);
                return `[${nl}${inner}${items}${nl}${base}]`;
            }

            if (e instanceof Map) {
                if (e.size === 0) return `Map(${e.size}) {}`;
                const entries = [...e.entries()]
                    .map(([k, v]) => `${format(k, indent, depth + 1, seen)} => ${format(v, indent, depth + 1, seen)}`)
                    .join(`,${nl}${inner}`);
                return `Map(${e.size}) {${nl}${inner}${entries}${nl}${base}}`;
            }

            if (e instanceof Set) {
                if (e.size === 0) return `Set(${e.size}) {}`;
                const items = [...e]
                    .map(v => format(v, indent, depth + 1, seen))
                    .join(`,${nl}${inner}`);
                return `Set(${e.size}) {${nl}${inner}${items}${nl}${base}}`;
            }

            const keys = Reflect.ownKeys(e);
            if (keys.length === 0) {
                const prefix = e.constructor?.name !== 'Object' && e.constructor?.name ? `${e.constructor.name} ` : '';
                return `${prefix}{}`;
            }

            const props = keys.map(key => {
                const keyStr = typeof key !== "symbol" 
                    ? (/^[a-z$_][0-9a-z$_]*$/i.test(String(key)) ? String(key) : format(String(key), indent, depth + 1, seen)) 
                    : `[${format(key, indent, depth + 1, seen)}]`;
                return `${keyStr}: ${format(e[key], indent, depth + 1, seen)}`;
            }).join(`,${nl}${inner}`);

            const prefix = e.constructor?.name !== 'Object' && e.constructor?.name ?
                `${e.constructor.name} ` :
                '';

            return `${prefix}{${nl}${inner}${props}${nl}${base}}`;

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
