import PriorityQueue from './index';

describe('PriorityQueue', () => {
    let pq: PriorityQueue<string>;

    beforeEach(() => {
        pq = new PriorityQueue<string>();
    });

    // The queue should have the following elements after the inserts:
    // - 'B' with priority 5 (highest priority)
    // - 'A' with priority 3
    // - 'C' with priority 1 (lowest priority)
    test('should insert elements correctly and maintain the heap property', () => {
        pq.insert('A', 3);
        pq.insert('B', 5);
        pq.insert('C', 1);

        expect(pq.removeMax()).toBe('B');
        expect(pq.removeMax()).toBe('A');
        expect(pq.removeMax()).toBe('C');
    });

    test('should remove the maximum element correctly', () => {
        pq.insert('A', 3);
        pq.insert('B', 5);
        pq.insert('C', 1);

        expect(pq.removeMax()).toBe('B');
        expect(pq.removeMax()).toBe('A');
        expect(pq.removeMax()).toBe('C');
        expect(pq.removeMax()).toBeNull(); // No elements left
    });

    test('should update the priority correctly and maintain the heap property', () => {
        pq.insert('A', 3);
        pq.insert('B', 5);
        pq.insert('C', 1);

        pq.updatePriority('A', 6); // Increase priority of 'A'

        // After updating priority, 'A' should now be the max
        expect(pq.removeMax()).toBe('A');
        expect(pq.removeMax()).toBe('B');
        expect(pq.removeMax()).toBe('C');
    });

    test('should handle the case where no elements are in the queue', () => {
        expect(pq.removeMax()).toBeNull(); // Should return null
    });

    test('should handle updates on non-existent elements gracefully', () => {
        pq.insert('A', 3);
        pq.updatePriority('B', 10); // Update priority of a non-existent element

        expect(pq.removeMax()).toBe('A'); // Only 'A' should be in the queue
    });
});
