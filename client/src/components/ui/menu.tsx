'use client'

import * as React from 'react'
import { Menu as HeadlessMenu } from '@headlessui/react'
import { cn } from '@/lib/utils'

const Menu = HeadlessMenu

const MenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <HeadlessMenu.Button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      className
    )}
    {...props}
  />
))
MenuButton.displayName = 'MenuButton'

const MenuItems = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <HeadlessMenu.Items
    ref={ref}
    className={cn(
      'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
      className
    )}
    {...props}
  />
))
MenuItems.displayName = 'MenuItems'

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <HeadlessMenu.Item>
    {({ active }) => (
      <div
        ref={ref}
        className={cn(
          'block px-4 py-2 text-sm cursor-pointer',
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )}
  </HeadlessMenu.Item>
))
MenuItem.displayName = 'MenuItem'

export { Menu, MenuButton, MenuItems, MenuItem } 