import List from '../src/List';

describe('List<T>', () => {
    let list: List<number>;

    beforeEach(() => {
        list = new List([1, 2, 3]);
    });

    // Properties
    test('Count returns correct length', () => {
        expect(list.Count).toBe(3);
    });

    test('IsEmpty returns false for non-empty list', () => {
        expect(list.IsEmpty).toBe(false);
    });

    // Modification
    test('Add appends an item', () => {
        list.Add(4);
        expect(list.ToArray()).toEqual([1, 2, 3, 4]);
    });

    test('AddRange appends multiple items', () => {
        list.AddRange([4, 5]);
        expect(list.ToArray()).toEqual([1, 2, 3, 4, 5]);
    });

    test('Insert adds item at index', () => {
        list.Insert(1, 99);
        expect(list.ToArray()).toEqual([1, 99, 2, 3]);
    });

    test('Remove deletes matching item', () => {
        expect(list.Remove(2)).toBe(true);
        expect(list.ToArray()).toEqual([1, 3]);
    });

    test('RemoveAll deletes items matching callback', () => {
        const removed = list.RemoveAll(x => x % 2 === 1);
        expect(removed).toBe(2);
        expect(list.ToArray()).toEqual([2]);
    });

    test('RemoveAt deletes item at index', () => {
        list.RemoveAt(1);
        expect(list.ToArray()).toEqual([1, 3]);
    });

    test('Clear empties the list', () => {
        list.Clear();
        expect(list.Count).toBe(0);
        expect(list.IsEmpty).toBe(true);
    });

    test('Reverse flips the list', () => {
        list.Reverse();
        expect(list.ToArray()).toEqual([3, 2, 1]);
    });

    // Query
    test('Contains returns true for existing item', () => {
        expect(list.Contains(2)).toBe(true);
    });

    test('IndexOf returns correct index', () => {
        expect(list.IndexOf(3)).toBe(2);
    });

    test('Find returns first matching item', () => {
        expect(list.Find(x => x > 1)).toBe(2);
    });

    test('Any returns true if any match', () => {
        expect(list.Any(x => x === 2)).toBe(true);
    });

    test('All returns true if all match', () => {
        expect(list.All(x => x < 10)).toBe(true);
    });

    test('First returns first item', () => {
        expect(list.First()).toBe(1);
    });

    test('FirstOrDefault returns default if not found', () => {
        expect(list.FirstOrDefault(x => x > 10, 999)).toBe(999);
    });

    test('Last returns last item', () => {
        expect(list.Last()).toBe(3);
    });

    test('LastOrDefault returns default if not found', () => {
        expect(list.LastOrDefault(x => x > 10, 999)).toBe(999);
    });

    // Access
    test('Get returns item at index', () => {
        expect(list.Get(1)).toBe(2);
    });

    test('Set updates item at index', () => {
        list.Set(1, 42);
        expect(list.Get(1)).toBe(42);
    });

    // Transformations
    test('Where filters items', () => {
        const filtered = list.Where(x => x > 1);
        expect(filtered.ToArray()).toEqual([2, 3]);
    });

    test('Select maps items', () => {
        const mapped = list.Select(x => x * 2);
        expect(mapped.ToArray()).toEqual([2, 4, 6]);
    });

    test('Distinct removes duplicates', () => {
        const dupList = new List([1, 2, 2, 3, 3, 3]);
        expect(dupList.Distinct().ToArray()).toEqual([1, 2, 3]);
    });

    test('Sort orders items', () => {
        const unsorted = new List([3, 1, 2]);
        unsorted.Sort();
        expect(unsorted.ToArray()).toEqual([1, 2, 3]);
    });

    test('ForEach executes callback', () => {
        const result: number[] = [];
        list.ForEach((x, i) => result.push(x + i));
        expect(result).toEqual([1, 3, 5]);
    });

    test('Clone creates a deep copy', () => {
        const clone = list.Clone();
        clone.Add(99);
        expect(list.ToArray()).toEqual([1, 2, 3]);
        expect(clone.ToArray()).toEqual([1, 2, 3, 99]);
    });

    test('ToArray returns a copy', () => {
        const arr = list.ToArray();
        arr.push(999);
        expect(list.Count).toBe(3);
    });

    // Iteration
    test('List is iterable', () => {
        const result: number[] = [];
        for (const item of list) {
            result.push(item);
        }
        expect(result).toEqual([1, 2, 3]);
    });

    test('AddRange handles undefined gracefully', () => {
        const list = new List<number>();
        expect(() => list.AddRange(undefined as any)).not.toThrow();
        expect(list.Count).toBe(0);
    });

    test('Insert throws on out-of-range index', () => {
        expect(() => list.Insert(999, 42)).toThrow(RangeError);
    });

    test('Remove returns false if item not found', () => {
        expect(list.Remove(999)).toBe(false);
    });

    test('Last with callback returns undefined on empty list', () => {
        const empty = new List<number>();
        expect(empty.Last(x => x > 0)).toBeUndefined();
    });

    test('Set throws on invalid index', () => {
        expect(() => list.Set(999, 42)).toThrow(RangeError);
    });

    test('Select accepts custom comparer', () => {
        const list = new List<number>([1, 2]);
        const mapped = list.Select(x => x.toString(), (a, b) => a === b);
        expect(mapped.Contains("1")).toBe(true);
    });

    test('Distinct works with custom comparer on objects', () => {
        const list = new List([{ id: 1 }, { id: 1 }, { id: 2 }], (a, b) => a.id === b.id);
        const distinct = list.Distinct();
        expect(distinct.Count).toBe(2);
    });

    test('Sort throws on unsupported type', () => {
        const list = new List([{ id: 1 }, { id: 2 }]);
        expect(() => list.Sort()).toThrow();
    });

    test('Sort works with strings', () => {
        const list = new List(['b', 'a', 'c']);
        list.Sort();
        expect(list.ToArray()).toEqual(['a', 'b', 'c']);
    });

    test('Sort works with numbers', () => {
        const list = new List([3, 1, 2]);
        list.Sort();
        expect(list.ToArray()).toEqual([1, 2, 3]);
    });

    test('AddRange handles undefined and null gracefully', () => {
        const list = new List<number>();
        expect(() => list.AddRange(undefined as any)).not.toThrow();
        expect(() => list.AddRange(null as any)).not.toThrow();
        expect(list.Count).toBe(0);
    });

    test('Insert at end of list works', () => {
        const list = new List<number>([1, 2]);
        list.Insert(2, 3);
        expect(list.ToArray()).toEqual([1, 2, 3]);
    });

    test('Last with callback returns undefined if no match', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.Last(x => x > 100)).toBeUndefined();
    });

    test('Set throws on index equal to length', () => {
        const list = new List<number>([1, 2, 3]);
        expect(() => list.Set(3, 99)).toThrow(RangeError);
    });

    test('Distinct uses comparer for non-primitive types', () => {
        const list = new List([{ id: 1 }, { id: 1 }, { id: 2 }], (a, b) => a.id === b.id);
        const distinct = list.Distinct();
        expect(distinct.ToArray()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('Sort fallback works for strings', () => {
        const list = new List(['banana', 'apple', 'cherry']);
        list.Sort();
        expect(list.ToArray()).toEqual(['apple', 'banana', 'cherry']);
    });

    test('RemoveAt throws on invalid index', () => {
        const list = new List<number>([1, 2, 3]);
        expect(() => list.RemoveAt(-1)).toThrow(RangeError);
        expect(() => list.RemoveAt(3)).toThrow(RangeError);
    });

    test('FindIndex returns -1 when no item matches', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.FindIndex(x => x > 100)).toBe(-1);
    });

    test('Last with callback returns last matching item', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.Last(x => x === 3)).toBe(3);
    });

    test('Get throws on invalid index', () => {
        const list = new List<number>([1, 2, 3]);
        expect(() => list.Get(-1)).toThrow(RangeError);
        expect(() => list.Get(3)).toThrow(RangeError);
    });

    test('Sort uses custom comparer', () => {
        const list = new List<number>([3, 1, 2]);
        list.Sort((a, b) => b - a); // descending
        expect(list.ToArray()).toEqual([3, 2, 1]);
    });

    test('Any returns true when list is not empty and no callback is provided', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.Any()).toBe(true);
    });

    test('Any returns false when list is empty and no callback is provided', () => {
        const list = new List<number>();
        expect(list.Any()).toBe(false);
    });

    test('FirstOrDefault returns default value when no match is found', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.FirstOrDefault(x => x > 100, 999)).toBe(999);
    });

    test('LastOrDefault returns default value when no match is found', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.LastOrDefault(x => x > 100, 999)).toBe(999);
    });

    test('First returns first item when no callback is provided', () => {
        const list = new List<number>([10, 20, 30]);
        expect(list.First()).toBe(10);
    });

    test('First returns undefined when list is empty and no callback is provided', () => {
        const list = new List<number>();
        expect(list.First()).toBeUndefined();
    });

    test('FirstOrDefault returns first item when no callback is provided', () => {
        const list = new List<number>([5, 6, 7]);
        expect(list.FirstOrDefault(undefined, 999)).toBe(5);
    });

    test('FirstOrDefault returns default when list is empty and no callback is provided', () => {
        const list = new List<number>();
        expect(list.FirstOrDefault(undefined, 999)).toBe(999);
    });

    test('LastOrDefault returns last item when no callback is provided', () => {
        const list = new List<number>([1, 2, 3]);
        expect(list.LastOrDefault(undefined, 999)).toBe(3);
    });

    test('LastOrDefault returns default when list is empty and no callback is provided', () => {
        const list = new List<number>();
        expect(list.LastOrDefault(undefined, 999)).toBe(999);
    });

    test('First returns first item when no callback is provided', () => {
        const list = new List<number>([42, 99, 123]);
        expect(list.First()).toBe(42);
    });

    test('First returns undefined when list is empty and no callback is provided', () => {
        const list = new List<number>();
        expect(list.First()).toBeUndefined();
    });

    test('First handles both callback and no-callback branches', () => {
        const list = new List<number>([10, 20, 30]);

        // With callback
        const found = list.First(x => x === 20);
        expect(found).toBe(20);

        // Without callback
        const first = list.First();
        expect(first).toBe(10);
    });

    test('Iterate yields items in order', () => {
        const result: number[] = [];
        for (const item of list.Iterate()) {
            result.push(item);
        }
        expect(result).toEqual([1, 2, 3]);
    });

    test('IterateReverse yields items in reverse order', () => {
        const result: number[] = [];
        for (const item of list.IterateReverse()) {
            result.push(item);
        }
        expect(result).toEqual([3, 2, 1]);
    });

    test('IterateReverse on empty list yields nothing', () => {
        const empty = new List<number>();
        const result = Array.from(empty.IterateReverse());
        expect(result).toEqual([]);
    });
});