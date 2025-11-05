'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

function TabsList({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
  & { ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.List> | null> }) {
  return <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center justify-center rounded-full p-0 text-muted-foreground',
      className,
    )}
    {...props}
  />;
}
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  ref,
  className,
  ...props
}:
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
  & { ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Trigger> | null> }) {
  return <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:hover:bg-sky-500/10',
      className,
    )}
    {...props}
  />;
}
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
  & { ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Content> | null> }) {
  return <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />;
}
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
