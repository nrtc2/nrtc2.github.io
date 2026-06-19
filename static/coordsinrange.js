function coordsInArea(point, corner1, corner2) {
    if (![point, corner1, corner2].every(Array.isArray)) {
        throw new TypeError("All arguments must be arrays.");
    }

    if (![point, corner1, corner2].every(arr => arr.length === 2)) {
        throw new Error("All arrays must have exactly two elements.");
    }

    const minX = Math.min(corner1[0], corner2[0]);
    const maxX = Math.max(corner1[0], corner2[0]);
    const minY = Math.min(corner1[1], corner2[1]);
    const maxY = Math.max(corner1[1], corner2[1]);

    return (
        point[0] >= minX &&
        point[0] <= maxX &&
        point[1] >= minY &&
        point[1] <= maxY
    );
}
