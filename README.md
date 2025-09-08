A lightweight, strongly-typed collection class for TypeScript that extends native array functionality with a rich set of utility methods. Inspired by .NET’s `List<T>` and LINQ, this package offers expressive APIs for querying, transforming, and managing data — all with full type safety and zero runtime dependencies.

---

## ✨ Features

- 🔍 **Querying**: `Where`, `Select`, `Find`, `Any`, `All`, `Contains`, `IndexOf`
- 🔄 **Modification**: `Add`, `AddRange`, `Insert`, `Remove`, `RemoveAll`, `RemoveAt`, `Clear`, `Reverse`
- 🧠 **Custom Equality**: Pass a comparer function for deep equality or custom logic
- 🔁 **Iteration**: Fully iterable with `for...of` and generator support
- 🧪 **Functional Utilities**: `First`, `Last`, `FirstOrDefault`, `LastOrDefault`, `ForEach`, `Clone`, `ToArray`
- 🧼 **Transformations**: `Distinct`, `Sort`, `Select`, `Where`
- ✅ **100% Test Coverage**: Built with Jest and tested across all branches, edge cases, and behaviors

---

## 📦 Installation

```bash
npm install @ludeschersoftware/list
```

Or with Yarn:

```bash
yarn add @ludeschersoftware/list
```

---

## 🛠️ Usage

```ts
import List from '@ludeschersoftware/list';

const numbers = new List<number>([1, 2, 3, 4]);

numbers.Add(5).Remove(2);

const evens = numbers.Where(n => n % 2 === 0);

console.log(evens.ToArray()); // [4]
```

---

## 🧩 Comparer Support

You can pass a custom comparer to handle deep equality:

```ts
const people = new List([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id);
console.log(people.Contains({ id: 1 })); // true
```

---

## 🧪 Testing

This project uses [Jest](https://jestjs.io) for unit testing. To run tests:

```bash
yarn test
```

To check coverage:

```bash
yarn test:coverage
```

> ✅ 100% coverage across statements, branches, functions, and lines.

---

## 📚 API Overview

| Method              | Description                                      |
|---------------------|--------------------------------------------------|
| `Add(item)`         | Adds an item to the list                         |
| `AddRange(items)`   | Adds multiple items                              |
| `Insert(index, item)` | Inserts item at index                          |
| `Remove(item)`      | Removes first matching item                      |
| `RemoveAll(callback)` | Removes all items matching predicate           |
| `RemoveAt(index)`   | Removes item at index                            |
| `Clear()`           | Empties the list                                 |
| `Reverse()`         | Reverses the list                                |
| `Contains(item)`    | Checks if item exists                            |
| `IndexOf(item)`     | Returns index of item                            |
| `Find(callback)`    | Finds first matching item                        |
| `Any(callback?)`    | Checks if any item matches (or if list is non-empty) |
| `All(callback)`     | Checks if all items match                        |
| `First(callback?)`  | Returns first item (or first matching)           |
| `Last(callback?)`   | Returns last item (or last matching)             |
| `FirstOrDefault(callback?, default)` | Returns first or default        |
| `LastOrDefault(callback?, default)`  | Returns last or default         |
| `Get(index)`        | Gets item at index                               |
| `Set(index, value)` | Sets item at index                               |
| `Where(callback)`   | Filters items                                    |
| `Select(selector)`  | Maps items to new type                           |
| `Distinct()`        | Removes duplicates                               |
| `Sort(comparer?)`   | Sorts items                                      |
| `ForEach(callback)` | Executes callback for each item                  |
| `ToArray()`         | Returns a shallow copy of the list               |
| `Clone()`           | Returns a deep copy of the list                  |

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Add tests under `tests/`
4. Submit a PR

---

## License

MIT © Johannes Ludescher

---

## 🏁 Final Word

List is more than just a utility — it’s a declaration of clean code, strong typing, and obsessive testing. Whether you’re building a backend service or a frontend app, this collection class will keep your data logic elegant and predictable.

Enjoy it. Extend it. Break it. And if you do — write a test for it 😉