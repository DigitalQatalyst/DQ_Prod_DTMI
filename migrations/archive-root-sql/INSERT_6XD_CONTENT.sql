-- Insert 6XD content items for the marketplace
-- This includes the existing whitepaper and 5 placeholder articles

-- 1. Digital Transformation 2.0 Whitepaper (Existing)
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Digital Transformation 2.0: The 6XD Framework',
  'A comprehensive guide to the six dimensions of digital transformation that drive organizational success in the digital economy.',
  'Whitepaper',
  '6xd',
  '6XD',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'digital-transformation-2-0-6xd-framework',
  'Discover how the 6XD framework provides a structured approach to digital transformation across six critical dimensions: Digital Economy 4.0, Digital Cognitive Organization, Digital Business Platform, Digital Transformation 2.0, Digital Worker & Workspace, and Digital Accelerators.',
  ARRAY['6XD', 'Digital Transformation', 'Framework', 'Strategy', 'Whitepaper']
);

-- 2. Digital Economy 4.0 - Placeholder Article
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Unlocking Value in the Digital Economy 4.0',
  'Explore how organizations can leverage data-driven decisions to unlock new revenue streams and drive profitability in the digital economy.',
  'Article',
  '6xd',
  'Digital Economy 4.0',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'unlocking-value-digital-economy-40',
  'Transform your business model with strategies that capitalize on digital economy opportunities, from platform business models to data monetization.',
  ARRAY['6XD', 'Digital Economy', 'Revenue Streams', 'Business Model', 'Data-Driven']
);

-- 3. Digital Cognitive Organization - Placeholder Article
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Building the Cognitive Organization: AI and Automation at Scale',
  'Learn how AI and automation drive smarter decision-making and enhance operational agility in real-time across your organization.',
  'Article',
  '6xd',
  'Digital Cognitive Organisation',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'building-cognitive-organization-ai-automation',
  'Discover practical approaches to implementing AI-driven decision-making, intelligent automation, and cognitive capabilities that transform organizational performance.',
  ARRAY['6XD', 'AI', 'Automation', 'Cognitive', 'Decision-Making']
);

-- 4. Digital Business Platform - Placeholder Article
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Designing Your Digital Business Platform: A Strategic Blueprint',
  'Streamline workflows with a unified platform that integrates all key business functions and optimizes performance across the enterprise.',
  'Article',
  '6xd',
  'Digital Business Platform',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'designing-digital-business-platform-blueprint',
  'A comprehensive guide to architecting and implementing a digital business platform that serves as the foundation for scalable digital transformation.',
  ARRAY['6XD', 'Platform', 'Architecture', 'Integration', 'Enterprise']
);

-- 5. Digital Worker & Workspace - Placeholder Article
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Empowering the Digital Workforce: Tools and Strategies for Success',
  'Empower your team with intelligent tools for productivity, collaboration, and engagement in the modern digital workspace.',
  'Article',
  '6xd',
  'Digital Worker & Workspace',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'empowering-digital-workforce-tools-strategies',
  'Explore how to create an enabling digital workspace that enhances employee experience, productivity, and collaboration through smart tools and practices.',
  ARRAY['6XD', 'Digital Workspace', 'Productivity', 'Collaboration', 'Employee Experience']
);

-- 6. Digital Accelerators - Placeholder Article
INSERT INTO public.media_items (
  title,
  description,
  content_type,
  sub_marketplace,
  dimension,
  author_id,
  published_at,
  status,
  slug,
  excerpt,
  tags
) VALUES (
  'Accelerating Transformation: Ready-to-Use Digital Solutions',
  'Accelerate your transformation journey with ready-to-use, scalable solutions that drive rapid implementation and measurable growth.',
  'Article',
  '6xd',
  'Digital Accelerators',
  (SELECT id FROM public.authors WHERE name = 'DigitalQatalyst Team' LIMIT 1),
  NOW(),
  'published',
  'accelerating-transformation-digital-solutions',
  'Discover pre-built accelerators, templates, and frameworks that fast-track your digital transformation initiatives and reduce time-to-value.',
  ARRAY['6XD', 'Accelerators', 'Implementation', 'Templates', 'Fast-Track']
);

-- Verify the inserts
SELECT 
  title,
  content_type,
  sub_marketplace,
  dimension,
  status
FROM public.media_items
WHERE sub_marketplace = '6xd'
ORDER BY 
  CASE content_type
    WHEN 'Whitepaper' THEN 1
    ELSE 2
  END,
  published_at DESC;
