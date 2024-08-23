"use strict";
// utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the factorial of a non-negative integer.
 * @param n - A non-negative integer.
 * @returns The factorial of the number.
 */
function factorial(n) {
    if (n < 0) {
        throw new Error('Number must be non-negative');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
exports.factorial = factorial;
