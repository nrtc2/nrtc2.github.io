function format(e, indent, depth = 0, seen = new WeakSet()) {
    if (!(seen instanceof WeakSet) && !(seen instanceof Set)) throw TypeError("'seen' argument is not a WeakSet or a Set")
    const getSpacing = () => {
        if (!indent) return {
            base: '',
            inner: '',
            nl: ''
        };
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
            if (e instanceof Date) return !Number.isNaN(e.valueOf()) ? typeof e.toJSON === 'function' ? e.toJSON() : (new Date(e)).toJSON() : "Invalid Date";
            if (e instanceof Error) return `${e.name}: ${e.message}`;


            if (e instanceof WeakSet) return 'WeakSet { <items unknown> }';
            if (e instanceof WeakMap) return 'WeakMap { <items unknown> }';

            const {
                base,
                inner,
                nl
            } = getSpacing();

            // 1. Arrays
            if (Array.isArray(e)) {
                if (e.length === 0) return '[]';
                const items = e.map(v => format(v, indent, depth + 1, seen)).join(`,${nl}${inner}`);
                return `[${nl}${inner}${items}${nl}${base}]`;
            }

            // 2. Maps
            if (e instanceof Map) {
                if (e.size === 0) return `Map(${e.size}) {}`;
                const entries = [...e.entries()]
                    .map(([k, v]) => {
                        // Pass primitive keys safely without double-formatting strings
                        const keyStr = typeof k === 'string' ? `'${k}'` : format(k, indent, depth + 1, seen);
                        return `${keyStr} => ${format(v, indent, depth + 1, seen)}`;
                    })
                    .join(`,${nl}${inner}`);
                return `Map(${e.size}) {${nl}${inner}${entries}${nl}${base}}`;
            }

            // 3. Sets
            if (e instanceof Set) {
                if (e.size === 0) return `Set(${e.size}) {}`;
                const items = [...e]
                    .map(v => format(v, indent, depth + 1, seen))
                    .join(`,${nl}${inner}`);
                return `Set(${e.size}) {${nl}${inner}${items}${nl}${base}}`;
            }

            // 4. Plain & Custom Objects
            const keys = Reflect.ownKeys(e);
            const constructorName = e.constructor?.name;
            const prefix = constructorName && constructorName !== 'Object' ? `${constructorName} ` : '';

            if (keys.length === 0) {
                return `${prefix}{}`;
            }

            const props = keys.map(key => {
                const desc = Reflect.getOwnPropertyDescriptor(e, key);

                // Format Key
                let keyStr;
                if (typeof key === 'symbol') {
                    keyStr = `[Symbol(${key.description ?? ''})]`;
                } else {
                    keyStr = /^[a-z$_][0-9a-z$_]*$/i.test(key) ? key : `'${key.replace(/'/g, "\\'")}'`;
                }

                // Getters / Setters
                if (desc && (desc.get || desc.set)) {
                    const parts = [];
                    if (desc.get) parts.push('Getter');
                    if (desc.set) parts.push('Setter');
                    return `${key}:${nl ? ' ' : ''}[${parts.join('/')}]`;
                }

                // Normal property value
                const valStr = format(e[key], indent, depth + 1, seen);
                return `${keyStr}:${nl ? ' ' : ''}${valStr}`;
            }).join(`,${nl}${inner}`);

            return `${prefix}{${nl}${inner}${props}${nl}${base}}`;

        } finally {
            seen.delete(e);
        }
    }

    // --- Primitives Primitive Handling ---
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

    if (typeof e === 'symbol') return `Symbol(${e.description ?? ''})`;
    if (typeof e === 'number') return (1 / e === -Infinity && e === 0) ? '-0' : String(e);
    if (typeof e === 'function') {
        if (depth !== 0) return 'ƒ'
        const a = e.toString().length > 256 ? `${e.toString().substring(0, 256)}…` : e.toString().substring(0, 256);
        return a.toString().startsWith("async") ? a.toString().replace(/^async(\s+)function/, "async$1ƒ") : a.toString().replace(/^function/, "ƒ");
    }

    return String(e);
}
