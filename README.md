# Timeline Visualization Component

A modern, interactive timeline component built with React that displays project items in a compact, space-efficient layout with advanced features like zooming and inline editing.

![Timeline Demo](https://img.shields.io/badge/React-18.0.0-blue?logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-blue?logo=tailwindcss) ![Lucide Icons](https://img.shields.io/badge/Lucide-React-green?logo=lucide)

## 🚀 Features

### Core Timeline Functionality
- **Smart Lane Assignment**: Items are automatically arranged in horizontal lanes using an efficient algorithm that minimizes vertical space
- **Compact Layout**: Items that don't overlap in time share the same lane for optimal space utilization
- **Date Range Support**: Handles YYYY-MM-DD formatted dates with automatic padding for better visualization
- **Responsive Grid System**: Uses CSS Grid for precise alignment and responsive behavior

### Advanced Interactions
- **🔍 Multi-Level Zoom**: 
  - Zoom range from 25% to 400% (12.5px to 200px per day)
  - Mouse wheel zoom with Ctrl/Cmd + scroll
  - Visual zoom controls with percentage display
  - Smart minimum width calculations

- **✏️ Inline Editing**:
  - Click-to-edit item names with hover reveal
  - Keyboard shortcuts (Enter to save, Escape to cancel)
  - Auto-focus and text selection
  - Visual feedback with edit mode indicators

### User Experience
- **Professional Design**: Clean, modern interface inspired by project management tools
- **Smooth Animations**: Hover effects, transitions, and visual feedback
- **Horizontal Scrolling**: Seamless navigation through long timelines
- **Mobile-First Approach**: Responsive design that works on all screen sizes
- **Accessibility**: Proper ARIA labels, keyboard navigation, and screen reader support

## 🏗️ Architecture

### Component Structure
```
src/
├── components/Timeline/
│   ├── Timeline.js          # Main container component
│   ├── TimelineHeader.js    # Year range display
│   ├── TimelineScale.js     # Date markers and grid
│   ├── TimelineLane.js      # Individual lane renderer
│   ├── TimelineItem.js      # Interactive timeline items
│   ├── ZoomControls.js      # Zoom interface controls
│   └── index.js            # Barrel exports
├── hooks/
│   ├── useTimelineData.js   # Core timeline logic and state
│   └── index.js            # Hook exports
├── assignLanes.js          # Lane assignment algorithm
├── timelineItems.js        # Sample data
└── index.js               # Application entry point
```

### Design Patterns
- **Custom Hooks**: Logic separation with `useTimelineData` for reusable timeline calculations
- **Compound Components**: Modular timeline components that work together seamlessly
- **Controlled Components**: Parent manages state, children handle presentation
- **Render Props Pattern**: Flexible data flow between components

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS 4**: Utility-first styling for rapid development
- **Lucide React**: Beautiful, consistent icon system
- **CSS Grid**: Precise layout control for timeline positioning
- **Parcel**: Zero-configuration build tool
- **PostCSS**: CSS processing with Tailwind integration

## 📦 Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**: The application will automatically open at `http://localhost:1234`

## 🎯 Usage

### Basic Implementation
```jsx
import Timeline from './components/Timeline';
import timelineItems from './timelineItems';

function App() {
  return (
    <div>
      <Timeline items={timelineItems} />
    </div>
  );
}
```

### Data Format
```javascript
const timelineItems = [
  {
    id: 1,
    start: "2021-01-14",    // YYYY-MM-DD format
    end: "2021-01-22",      // End date >= start date
    name: "Project Task"    // Editable display name
  }
];
```


## 📄 License

MIT License - feel free to use this component in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

---

Built with ❤️ using React, Tailwind CSS, and modern web technologies.
