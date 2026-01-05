# React Performance Optimization - Routing Guide

## Available Routes

### 🏠 Home Page
**Route:** `/`  
**Component:** `Home.jsx`

Landing page with navigation cards to all performance optimization experiments.

---

### ⚡ Reduce Rendering & Re-rendering
**Route:** `/rendering`  
**Component:** `RenderingPage.jsx`

**What it demonstrates:**
- Comparison between optimized and non-optimized components
- Usage of `React.memo`, `useCallback`, and `useMemo`
- How to prevent unnecessary re-renders
- Console logging to track render cycles

**Key Learning:**
- Open browser console to see render logs
- Click buttons in both components
- Observe the difference in re-render behavior

---

### 📦 Code Splitting & Lazy Loading
**Route:** `/code-splitting`  
**Component:** `CodeSplittingPage.jsx`

**What it demonstrates:**
- Dynamic imports with `React.lazy()`
- `Suspense` for loading states
- On-demand component loading
- Bundle size optimization

**Key Learning:**
- Open Network tab in DevTools
- Click buttons to load components dynamically
- Notice separate chunk files being loaded
- Initial bundle is smaller

**Lazy-loaded components:**
- `HeavyComponent1.jsx` - 1000 data items
- `HeavyComponent2.jsx` - Product catalog simulation
- `HeavyComponent3.jsx` - Data visualization simulation

---

### 📊 Large Lists/Tables Optimization
**Route:** `/large-lists`  
**Component:** `LargeListsPage.jsx`

**What it demonstrates:**
- Virtual scrolling implementation
- Windowing technique
- Performance with large datasets (up to 100,000 items)
- Comparison between virtualized and non-virtualized lists

**Key Learning:**
- Toggle between virtualized and regular rendering
- Change list size to see performance impact
- Use React DevTools Profiler to measure render times
- Only visible items are rendered in virtualized mode

---

## Project Structure

```
src/
├── App.jsx                          # Main app with routing setup
├── main.jsx                         # Entry point
├── pages/
│   ├── Home.jsx                     # Landing page
│   ├── Home.css                     # Home page styles
│   ├── RenderingPage.jsx            # Rendering optimization demo
│   ├── CodeSplittingPage.jsx        # Code splitting demo
│   ├── LargeListsPage.jsx           # Large lists demo
│   └── PageLayout.css               # Shared page styles
└── components/
    ├── children.jsx                 # Non-optimized component
    ├── useMemoImplement.jsx         # Optimized component
    ├── HeavyComponent1.jsx          # Lazy-loaded component 1
    ├── HeavyComponent2.jsx          # Lazy-loaded component 2
    └── HeavyComponent3.jsx          # Lazy-loaded component 3
```

---

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

---

## Navigation

Each experiment page has a "← Back to Home" link in the top-left corner to return to the main navigation.

---

## Performance Testing Tips

1. **Rendering Page:**
   - Open Console (F12)
   - Watch for "rendered" logs
   - Compare render frequency between components

2. **Code Splitting Page:**
   - Open Network tab (F12)
   - Clear cache and reload
   - Click buttons and watch for chunk files loading

3. **Large Lists Page:**
   - Open React DevTools Profiler
   - Record a profiling session
   - Toggle virtualization and compare render times
   - Try different list sizes

---

## Technologies Used

- React 19.2.0
- React Router DOM 7.x
- Vite 7.x
- Native React hooks (memo, useCallback, useMemo, lazy, Suspense)

