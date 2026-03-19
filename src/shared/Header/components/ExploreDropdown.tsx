import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDownIcon, NewspaperIcon, UsersIcon } from "lucide-react";
import type { LucideProps } from "lucide-react";

interface Marketplace {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  href: string;
}

const marketplaces: Marketplace[] = [
  {
    id: "dtmi-resources",
    name: "DTMI Resource Marketplace",
    description: "Access research-driven insights, articles, case studies, and digital transformation content",
    icon: NewspaperIcon,
    href: "/marketplace/dtmi",
  },
  {
    id: "dtmi-contributors",
    name: "DTMI Contributors Marketplace",
    description: "Connect with digital transformation experts, thought leaders, and industry contributors",
    icon: UsersIcon,
    href: "/dtmi/contributors",
  },
];

interface ExploreDropdownProps {
  isCompact?: boolean;
}

export function ExploreDropdown({ isCompact = false }: ExploreDropdownProps) {
  const navigate = useNavigate();
  const [opened, { close, toggle }] = useDisclosure(false);

  // Close on scroll so the popover doesn't flicker while repositioning
  useEffect(() => {
    if (!opened) return;
    const handleScroll = () => close();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [opened, close]);

  return (
    <Popover
      opened={opened}
      onChange={close}
      width={320}
      position="bottom-start"
      shadow="md"
      radius="md"
      withinPortal={false}
      transitionProps={{ transition: "pop-top-left", duration: 150 }}
    >
      <Popover.Target>
        <button
          onClick={toggle}
          className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1 text-sm font-semibold"
          aria-label="Explore marketplaces"
          aria-expanded={opened}
        >
          Explore
          <ChevronDownIcon
            size={15}
            className={`transition-transform duration-200 ${opened ? "rotate-180" : ""}`}
          />
        </button>
      </Popover.Target>

      <Popover.Dropdown p={0} style={{ border: "1px solid #e5e7eb" }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">Explore Marketplaces</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Discover DigitalQatalyst&apos;s services, products, and transformation resources
          </p>
        </div>

        {/* Items */}
        <div>
          {marketplaces.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { close(); navigate(item.href); }}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
