'use client';
import { useState, cloneElement } from 'react';

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <>
      {childrenArray.map((child, index) => {
        if (child.type === TabsList) {
          return (
            <div key={index} className="flex gap-2 mb-4">
              {child.props.children.map((btn, i) =>
                cloneElement(btn, {
                  isActive: btn.props.value === value,
                  onClick: () => setValue(btn.props.value),
                  key: i
                })
              )}
            </div>
          );
        }

        if (child.type === TabsContent && child.props.value === value) {
          return <div key={index}>{child.props.children}</div>;
        }

        return null;
      })}
    </>
  );
}

export function TabsList({ children }) {
  return <>{Array.isArray(children) ? children : [children]}</>;
}

export function TabsTrigger({ value, children, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 border-b-2 ${
        isActive ? 'border-black font-semibold' : 'border-transparent text-gray-500'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <>{children}</>;
}
