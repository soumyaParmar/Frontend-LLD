# Frontend Low-Level Design (LLD) & Vanilla JavaScript Practice

Welcome to my Frontend LLD repository. This space is dedicated to practicing advanced browser-native JavaScript development, low-level component architecture, performance optimization algorithms, and web accessibility (a11y) standards from first principles.

---

## 🛠️ Project Catalog & Design Focus

### 1. Search Autocomplete (Typeahead) Widget
A highly performant, accessible, and resilient autocomplete widget built in pure Vanilla JS and ES Modules.

*   **Design & Architecture:** Reusable OOP component class separating input event delegation, state storage, and rendering.
*   **Algorithms & Data Structures:**
    *   **Trie (Prefix Tree):** Efficient client-side prefix matching running in $O(L)$ where $L$ is the prefix length (replacing linear array scans).
    *   **LRU Cache:** An in-memory Least Recently Used cache that holds search queries to avoid redundant API or Trie calls.
    *   **Enhanced Debouncer:** Custom debounce wrapper featuring `.cancel()` execution resets.
*   **Async Resilience:** Integrated `AbortController` into network fetches. Initiating a new search request automatically aborts the preceding pending request, resolving async race conditions.
*   **Accessibility (WAI-ARIA):** Fully compliant keyboard navigation (Arrows, Enter, Escape) utilizing `role="combobox"`, `role="listbox"`, and `role="option"`. Dynamically updates `aria-expanded` and `aria-activedescendant`.

---

### 2. Pinterest Masonry Grid & Infinite Scroll *(Under Work)*
A fluid, multi-column image grid that mimics Pinterest's dynamic layout and fetches images on-demand.

*   **Design & Architecture:** Layout calculations using absolute coordinate mapping, resolving column height imbalances dynamically.
*   **Concepts & Optimization:**
    *   **Masonry Layout Algorithm:** Javascript coordinates calculation (`top` and `left` offsets) to position items snuggly in the shortest column.
    *   **Intersection Observer API:** Efficient viewport bottom-detection (sentinel) triggering infinite page loading without expensive scroll listener thrashing.
    *   **Aspect Ratio Preservation:** Reserving layout dimensions for images prior to network resolution, preventing Cumulative Layout Shift (CLS) and screen jumps.
    *   **Responsive Resizing:** Recalculating column allocations on window resize events with debounced execution triggers.

---

## 🚀 How to Run the Projects

Each project has a local dev server configuration.

1.  Navigate to a project directory:
    ```bash
    cd Autocomplete  # or cd PinTerest
    ```
2.  Install development dependencies:
    ```bash
    npm install
    ```
3.  Launch the server:
    ```bash
    npm start
    ```
4.  Open the local address printed (typically `http://127.0.0.1:8080`) in your browser.
