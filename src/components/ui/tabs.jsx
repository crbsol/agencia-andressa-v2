'use client';
import { useState } from 'react';

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  const childrenArray = Array.isArray(children) ? children : [children];

  return childrenArray.map(child =>
    typeof child.type === 'function' && child.type.name === 'TabsList'
      ? <div key="tabs-list">{child.props.children.map(btn => (
          <button
            key={btn.props.value}
            className="mr-2 p-2 border-b-2"
            onClick={() => setValue(btn.props.value)}
          >
            {btn.props.children}
          </button>
        ))}</div>
      : child.type.name === 'TabsContent' && child.props.value === value
        ? <div key={child.props.value}>{child.props.children}</div>
        : null
  );
}

export function TabsList({ children }) {
  return <>{children}</>;
}

export function TabsTrigger({ children }) {
  return <>{children}</>;
}

export function TabsContent({ children }) {
  return <>{children}</>;
}
