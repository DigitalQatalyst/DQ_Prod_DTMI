# DigitalQatalyst Website - Complete Features & Pages Overview

## 🏠 PUBLIC PAGES

### Main Navigation Pages
1. **Home Page** (`/`)
   - Hero section with AI chatbot
   - Featured programs spotlight (DTMI)
   - Transformation stats with video
   - Proof & trust section with testimonials
   - Digital maturity assessment
   - Marketplaces overview
   - Knowledge hub preview
   - Call to action form

2. **Services Page** (`/services`)
   - Services overview
   - Service categories
   - Service cards with details
   - CTA sections

3. **Service Detail Pages** (`/services/:slug`)
   - Individual service information
   - Methodology details
   - Pricing and packages
   - Related services

4. **Products Landing Page** (`/products`)
   - Products overview
   - 6XD Framework explanation
   - Product categories
   - Benefits showcase
   - Client testimonials carousel
   - Demo request form

5. **Product Marketplace** (`/products/marketplace`)
   - Browse all products
   - Filter and search
   - Product cards

6. **Product Detail Pages** (`/products/:productId`)
   - Detailed product information
   - Features and specifications
   - Pricing
   - Demo request

7. **About Us Page** (`/about-us`)
   - Company information
   - Mission and vision
   - Team members
   - Company history

8. **Client Testimonials** (`/client-testimonials`)
   - Customer success stories
   - Video testimonials
   - Case studies

### DTMI (Digital Transformation Management Insights)
9. **DTMI Landing Page** (`/dtmi`)
   - Insights hub
   - Featured articles
   - Predictions
   - Case studies
   - Podcasts

10. **DTMI Contributors** (`/dtmi/contributors`)
    - Author profiles
    - Contributor marketplace
    - Expert bios

11. **DTMI Articles** (`/dtmi/article/:slug`)
    - Full article view
    - Related content
    - Author information

### Content & Media
12. **Blog List Page** (`/blog`)
    - All blog posts
    - Categories and filters
    - Search functionality

13. **Blog Detail Page** (`/blog/:slug`)
    - Full blog post
    - Author bio
    - Related posts
    - Comments section

14. **Author Bio Pages** (`/authors/:slug`)
    - Author profile
    - Published content
    - Social links
    - Bio and expertise

15. **Expert Interviews** (`/expert-interviews/:slug`)
    - Interview content
    - Q&A format
    - Expert insights

16. **Podcast Pages** (`/podcast/:id`)
    - Podcast episodes
    - Audio player
    - Show notes
    - Episode list

17. **Research Reports** (`/research-report`)
    - Research hub
    - Report listings

18. **Research Report Detail** (`/research-report/:slug` or `/report/:slug`)
    - Full research paper
    - Abstract
    - Methodology
    - Results and conclusions

19. **Whitepaper Pages** (`/whitepaper/:id`)
    - Whitepaper content
    - Download options

20. **Digital Economy 4.0 Whitepaper** (`/whitepaper/digital-economy-4-0`)
    - Special scroll-based whitepaper

### Marketplaces
21. **Marketplace Router** (`/marketplace/*`)
    - Services marketplace
    - Courses marketplace
    - Financial services
    - Non-financial services
    - DTMI resources
    - Knowledge hub

22. **Marketplace Detail Pages** (`/courses/:itemId`)
    - Course/service details
    - Booking options
    - Reviews

### Sector Pages
23. **Sector Landing Pages** (`/sectors/:sectorId`)
    - Experience 4.0
    - Agility 4.0
    - Farming 4.0
    - Plant 4.0
    - Infrastructure 4.0
    - Government 4.0
    - Hospitality 4.0
    - Retail 4.0
    - Service 4.0
    - Logistics 4.0
    - Wellness 4.0

### Careers & Jobs
24. **Careers Page** (`/careers`)
    - Company culture
    - Benefits
    - Open positions

25. **Job Listings** (`/jobs`)
    - All open positions
    - Filter by department
    - Search jobs

26. **Job Detail** (`/jobs/:jobId`)
    - Job description
    - Requirements
    - Apply button

27. **Job Application Form** (`/jobs/:jobId/apply`) 🔒
    - Application submission
    - Resume upload
    - Cover letter

### Special Features
28. **Women Entrepreneurs Hub** (`/women-entrepreneurs`)
    - Ecosystem map
    - Resources
    - Support programs

29. **Growth Areas** (`/growth-areas`)
    - Growth opportunities
    - Market analysis

30. **Growth Areas Marketplace** (`/growth-areas-marketplace`)
    - Browse growth opportunities

31. **Business Directory** (`/business-directory-marketplace`)
    - Company listings
    - Search and filter

### Forms & Requests
32. **Consultation Page** (`/consultation`)
    - Book consultation
    - Contact form
    - Service inquiry

33. **Request Demo** (`/request-demo`)
    - Product demo request
    - Schedule demo

### Legal & Info
34. **Terms of Service** (`/terms-of-service`)
35. **Privacy Policy** (`/privacy-policy`)
36. **Coming Soon** (`/coming-soon` or `/coming-soon/:feature`)
37. **404 Not Found** (`/404`)

---

## 🔐 PROTECTED PAGES (Require Login)

### User Dashboard
38. **Dashboard Home** (`/dashboard`) 🔒
    - Overview
    - Quick stats
    - Recent activity

39. **Activity Centre** (`/dashboard/activity`) 🔒
    - User activity log
    - Notifications

40. **My Content** (`/dashboard/my-content`) 🔒
    - User-created content
    - Drafts
    - Published items

41. **Saved Items** (`/dashboard/saved-items`) 🔒
    - Bookmarked content
    - Saved courses
    - Favorites

42. **Email Subscriptions** (`/dashboard/subscriptions`) 🔒
    - Newsletter preferences
    - Email settings

43. **Profile** (`/dashboard/profile`) 🔒
    - User information
    - Edit profile
    - Avatar

44. **Settings** (`/dashboard/settings`) 🔒
    - Account settings
    - Preferences
    - Privacy

### Authentication
45. **Login Page** (`/login`)
    - Microsoft SSO
    - Email login

46. **My DQ Page** (`/my-dq`)
    - Personal dashboard
    - Quick access

---

## 🔒 PROTECTED FORMS (Require Login)

47. **Needs Assessment Form** (`/forms/needs-assessment`) 🔒
48. **Request for Membership** (`/forms/request-for-membership`) 🔒
49. **Request for Funding** (`/forms/request-for-funding`) 🔒
50. **Book Consultation** (`/forms/book-consultation`) 🔒
51. **Cancel Loan** (`/forms/cancel-loan`) 🔒
52. **Collateral User Guide** (`/forms/collateral-user-guide`) 🔒
53. **Disburse Approved Loan** (`/forms/disburse-approved-loan`) 🔒
54. **Facilitate Communication** (`/forms/facilitate-communication`) 🔒
55. **Reallocation of Loan** (`/forms/reallocation-of-loan-disbursement`) 🔒
56. **Amend Loan Details** (`/forms/request-to-amend-existing-loan-details`) 🔒
57. **Training in Entrepreneurship** (`/forms/training-in-entrepreneurship`) 🔒
58. **Issue Support Letter** (`/forms/issue-support-letter`) 🔒
59. **Service Request Form** (`/forms/service-request`) 🔒
60. **Product Demo Request** (`/forms/product-demo/:productCode`) 🔒
61. **Tour Request Form** (`/forms/tour-request`) 🔒

---

## 👨‍💼 ADMIN PAGES (Role-Based Access)

### Admin Dashboard
62. **Admin Dashboard** (`/admin-ui/dashboard`) 👨‍💼
    - Roles: Admin, Creator
    - Analytics overview
    - Quick actions

### Content Management
63. **Media List** (`/admin-ui/media`) 👨‍💼
    - Roles: Admin, Creator
    - All content items
    - Manage blogs, articles, podcasts

64. **Create New Content** (`/admin-ui/media/new`) 👨‍💼
    - Roles: Admin, Creator
    - Blog creation
    - Article creation
    - Podcast creation
    - Research paper creation
    - Expert interview creation

65. **Edit Content** (`/admin-ui/media/:id`) 👨‍💼
    - Roles: Admin, Creator
    - Edit existing content
    - Publish/unpublish

### Author Management
66. **Author Management** (`/admin-ui/authors`) 👨‍💼
    - Roles: Admin, Creator
    - View all authors
    - Manage author profiles

67. **Create Author** (`/admin-ui/authors/new`) 👨‍💼
    - Roles: Admin only
    - Add new authors
    - Set permissions

### Category & Content
68. **Category Management** (`/admin-ui/categories`) 👨‍💼
    - Roles: Admin only
    - Manage content categories
    - Create/edit/delete categories

69. **Content Submissions** (`/admin-ui/submissions`) 👨‍💼
    - Roles: Admin, Creator
    - Review submissions
    - Approve/reject content

### HR & Recruitment
70. **Job Applications** (`/admin-ui/job-applications`) 👨‍💼
    - Roles: Admin only
    - View applications
    - Manage candidates

71. **Job Postings Management** (`/admin-ui/job-postings`) 👨‍💼
    - Roles: Admin only
    - Manage job listings
    - Edit postings

72. **Create Job Posting** (`/admin-ui/job-postings/new`) 👨‍💼
    - Roles: Admin only
    - Create new job listing

73. **Interview Scheduler** (`/admin-ui/interviews`) 👨‍💼
    - Roles: Admin only
    - Schedule interviews
    - Manage calendar

### Analytics & Monitoring
74. **Analytics Dashboard** (`/admin-ui/analytics`) 👨‍💼
    - Roles: Admin only
    - Website analytics
    - User metrics
    - Content performance

75. **Notification Center** (`/admin-ui/notifications`) 👨‍💼
    - Roles: Admin, Creator
    - System notifications
    - Alerts

### User Management
76. **User Management** (`/admin-ui/users`) 👨‍💼
    - Roles: Admin only
    - Manage users
    - Assign roles
    - Permissions

77. **Admin Settings** (`/admin-ui/settings`) 👨‍💼
    - Roles: Admin only
    - System configuration
    - Site settings

---

## 🎨 KEY FEATURES

### Global Features
- **Header Navigation** - Sticky header with dropdown menus
- **Footer** - Links, social media, newsletter signup
- **Search Functionality** - Global search across content
- **Dark Mode** - Theme toggle (in development)
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Google Analytics** - Tracking and analytics
- **Microsoft SSO** - Single sign-on authentication
- **Supabase Integration** - Backend database
- **Airtable Integration** - Form submissions and CRM

### Interactive Components
- **AI Chatbot** (ModernDQChatbot) - Homepage assistant
- **Digital Maturity Assessment** - Interactive quiz
- **Video Players** - Custom video components
- **Carousels** - Testimonials, products, content
- **Filters & Search** - Advanced filtering on marketplaces
- **Bookmarking** - Save favorite content
- **Comparison Tool** - Compare courses/products
- **Rich Text Editor** - TipTap editor for content creation
- **File Upload** - Image and document uploads
- **Form Validation** - Client and server-side validation

### Content Types Supported
1. Blog Posts
2. Articles
3. Research Papers
4. Whitepapers
5. Podcasts
6. Expert Interviews
7. Case Studies
8. Predictions
9. Infographics
10. Videos

### Marketplace Categories
1. Services Marketplace
2. Products Marketplace
3. Courses & Training
4. Financial Services
5. Non-Financial Services
6. DTMI Resources
7. Knowledge Hub

---

## 📊 STATISTICS

- **Total Public Pages**: ~46
- **Protected User Pages**: ~15
- **Admin Pages**: ~16
- **Protected Forms**: ~15
- **Total Routes**: ~92+
- **Content Types**: 10
- **Marketplace Categories**: 7
- **Sector Pages**: 11

---

## 🔑 ACCESS LEVELS

1. **Public** - No authentication required
2. **Authenticated** 🔒 - Requires login
3. **Admin** 👨‍💼 - Admin role required
4. **Creator** 👨‍💼 - Creator or Admin role
5. **Admin Only** 👨‍💼 - Strictly admin access

---

## 🚀 RECENT UPDATES

- ✅ Pink colors replaced with brand orange
- ✅ Sign In button restored in header
- ✅ 6XD Book button removed from products page
- ✅ Merged develop branch features
- ✅ Added LoginPage component
- ✅ Added AccessDenied component
- ✅ Added AuthorizedRoute component
- ✅ Enhanced role-based access control

---

*Last Updated: Current Session*
*Branch: feature/qa-bug-fix*
