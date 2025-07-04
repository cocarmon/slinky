# 🧩 Maze Solver Performance Comparator

A web-based tool that lets users generate mazes, solve them using different algorithms, and compare performance between JavaScript and WebAssembly (C++) implementations. The purpose of this application is to give me a better grasp C++ in the browser.

---

## 🚀 Live Demo

🔗 NA

---

## 🎯 Goal

- Let users generate a maze of customizable dimensions  
- Solve it using select algorithms  
- Choose between two solving engines:
  - **JavaScript (TypeScript)**
  - **C++ compiled to WebAssembly (WASM)**
- Visualize the solving process
- Benchmark and compare performance of each engine

---

## 1. 🗺️ Maze Generation

### Algorithm
- [**Recursive Backtracker**](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker) (depth-first search)

-- 

### Representation
- A 2D grid of cells
- The generated maze is shared between both engines for fair benchmarking

---

## 2. 🤖 Pathfinding Algorithms

Choose from the following:

- [**A\***](https://en.wikipedia.org/wiki/A*_search_algorithm)  
- [**Dijkstra's Algorithm**](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)  
- [**Breadth-First Search (BFS)**](https://en.wikipedia.org/wiki/Breadth-first_search)

---

## 3. 🧠 Solving Engines

### JavaScript Engine
- Native JS/TS implementation of each algorithm
- Returns visited steps and solve duration

### C++ (WASM) Engine
- Implement same algorithms in C++
- Compile to WebAssembly using **Emscripten**

--

### WASM Integration
- Memory-mapped communication between JS and WASM
- Synchronize maze and results for fair benchmarking

