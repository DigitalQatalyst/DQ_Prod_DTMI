import { Tabs } from "@mantine/core";
import { BookOpen, Newspaper, FileSearch, Book, Briefcase, User, Mic, TrendingUp } from "lucide-react";
import { ContentType } from "../../types/create.types";

const TABS = [
  { id: "blog" as ContentType, label: "Blog Post", icon: BookOpen },
  { id: "article" as ContentType, label: "Article", icon: Newspaper },
  { id: "research" as ContentType, label: "Research Report", icon: FileSearch },
  { id: "whitepaper" as ContentType, label: "Whitepaper", icon: Book },
  { id: "case-study" as ContentType, label: "Case Study", icon: Briefcase },
  { id: "expert-interview" as ContentType, label: "Expert Interview", icon: User },
  { id: "podcast" as ContentType, label: "Podcast", icon: Mic },
  { id: "prediction-analysis" as ContentType, label: "Prediction Analysis", icon: TrendingUp },
];

interface Props {
  activeTab: ContentType;
  onChange: (tab: ContentType) => void;
}

export function ContentTypeTabs({ activeTab, onChange }: Props) {
  return (
    <Tabs
      value={activeTab}
      onChange={(v) => v && onChange(v as ContentType)}
      variant="pills"
    >
      <Tabs.List style={{ borderBottom: "none" }}>
        {TABS.map((tab) => (
          <Tabs.Tab
            key={tab.id}
            value={tab.id}
            leftSection={<tab.icon size={14} />}
            style={activeTab === tab.id ? { backgroundColor: "#030F35", color: "#ffffff" } : undefined}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

export { TABS };
