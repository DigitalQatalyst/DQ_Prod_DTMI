export const frameworkData = {
  title: "React",
  subtitle: "A JavaScript library for building user interfaces",
  description:
    "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
  targetAudience: [
    "Frontend developers",
    "Full-stack engineers",
    "UI/UX designers transitioning to development",
  ],
  useCases: [
    "Single-page applications (SPAs)",
    "Progressive web applications (PWAs)",
    "Complex dashboards and data visualizations",
    "E-commerce storefronts",
  ],
  coreComponents: [
    {
      name: "Components",
      description:
        "Reusable, self-contained pieces of UI that manage their own state and rendering logic.",
      icon: "Layers",
    },
    {
      name: "JSX",
      description:
        "A syntax extension that lets you write HTML-like markup inside JavaScript for describing UI structure.",
      icon: "Code",
    },
    {
      name: "Virtual DOM",
      description:
        "A lightweight in-memory representation of real DOM that enables efficient updates and rendering.",
      icon: "Zap",
    },
    {
      name: "Hooks",
      description:
        "Functions like useState and useEffect that let you use state and lifecycle features in function components.",
      icon: "GitBranch",
    },
    {
      name: "Props",
      description:
        "Read-only data passed from parent to child components, enabling composition and reusability.",
      icon: "ArrowDownRight",
    },
    {
      name: "Context API",
      description:
        "A mechanism to share values across component tree without explicitly passing props at every level.",
      icon: "Network",
    },
  ],
  howItWorks: {
    steps: [
      {
        title: "Define Components",
        description:
          "Break your UI into reusable components, each responsible for rendering a specific part of interface.",
      },
      {
        title: "Manage State",
        description:
          "Use hooks like useState and useReducer to manage local component state and trigger re-renders.",
      },
      {
        title: "Render & Reconcile",
        description:
          "React creates a Virtual DOM, diffs it against previous version, and efficiently updates only what changed.",
      },
      {
        title: "Handle Side Effects",
        description:
          "Use useEffect to synchronize with external systems like APIs, subscriptions, and browser APIs.",
      },
    ],
    bestPractices: [
      "Keep components small and focused on a single responsibility",
      "Lift state up to nearest common ancestor when sharing data",
      "Use React.memo and useMemo to prevent unnecessary re-renders",
      "Prefer composition over inheritance for code reuse",
    ],
  },
  principles: [
    {
      name: "Declarative",
      description:
        "Describe what UI should look like for any given state, and React handles DOM updates.",
    },
    {
      name: "Component-Based",
      description:
        "Build encapsulated components that manage their own state, then compose them to build complex UIs.",
    },
    {
      name: "Learn Once, Write Anywhere",
      description:
        "React can render on the server with Node, power mobile apps with React Native, and more.",
    },
    {
      name: "Unidirectional Data Flow",
      description:
        "Data flows down from parent to child via props, making app predictable and easier to debug.",
    },
  ],
  codeExample: {
    title: "A Simple Counter Component",
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    language: "tsx",
  },
  realWorldExamples: [
    {
      company: "Facebook",
      description:
        "React was built by Facebook and powers its news feed, comments, and many other interactive features across the platform.",
    },
    {
      company: "Netflix",
      description:
        "Netflix uses React for its low-latency, high-performance streaming interface, enabling seamless browsing across devices.",
    },
    {
      company: "Airbnb",
      description:
        "Airbnb rebuilt its frontend with React, improving developer productivity and enabling a richer, more interactive booking experience.",
    },
  ],
  advantages: [
    "Large ecosystem and community support",
    "Reusable components reduce development time",
    "Virtual DOM ensures high performance",
    "Strong tooling and developer experience",
    "Backed by Meta with long-term support",
  ],
  challenges: [
    "Steep learning curve for beginners with JSX and state management",
    "Requires additional libraries for routing, state management, etc.",
    "Frequent updates can lead to migration overhead",
    "SEO can be challenging without server-side rendering",
  ],
  comparison: [
    {
      framework: "Angular",
      pros: "Full-featured framework with built-in solutions",
      cons: "Heavier, steeper learning curve, more opinionated",
      bestFor: "Enterprise-scale applications",
    },
    {
      framework: "Vue.js",
      pros: "Gentle learning curve, great documentation",
      cons: "Smaller ecosystem, fewer enterprise adoptions",
      bestFor: "Small to medium projects, rapid prototyping",
    },
    {
      framework: "Svelte",
      pros: "No virtual DOM, smaller bundle sizes, simpler syntax",
      cons: "Smaller community, fewer libraries and resources",
      bestFor: "Performance-critical apps with small teams",
    },
  ],
  resources: [
    {
      title: "Official React Documentation",
      url: "https://react.dev",
      type: "Documentation",
    },
    {
      title: "React Tutorial for Beginners",
      url: "https://react.dev/learn",
      type: "Tutorial",
    },
    {
      title: "React GitHub Repository",
      url: "https://github.com/facebook/react",
      type: "Repository",
    },
    {
      title: "Reactiflux Discord Community",
      url: "https://www.reactiflux.com",
      type: "Community",
    },
  ],
};
