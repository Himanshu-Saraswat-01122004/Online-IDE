import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const HoverEffect = ({
  
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

// change to navigate
const handlePath = (link) => {
  window.location.href = link;
};

return (
  <div className={cn("grid grid-cols-1 py-2", className)}>
    {items.map((item, idx) => (
      <div
        key={item?.link}
        className="relative group block p-2 h-full w-full"
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => handlePath(item?.link)}
        style={{ cursor: 'pointer' }}
      >
        <AnimatePresence>
          {hoveredIndex === idx && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-200 block rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <Card>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </Card>
      </div>
    ))}
  </div>
);
};

export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-zinc-900 font-bold tracking-wide", className)}>
      {children}
    </h4>)
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn(" text-zinc-600 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};
