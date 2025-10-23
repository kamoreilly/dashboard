---
name: performance-optimization
description: Comprehensive performance analysis and optimization for TanStack Start SSR, tRPC APIs, database queries, and frontend bundle optimization
version: "1.0.0"
category: performance
author: js-auditor-team
---

# Performance Optimization Skill

Advanced performance analysis and optimization tool for the full-stack JavaScript application, covering SSR, API, database, and frontend performance.

## Features

### ⚡ **TanStack Start SSR Performance**
- Server-side rendering optimization analysis
- Route-based code splitting recommendations
- Hydration performance optimization
- Caching strategy implementation
- Meta tag and SEO performance analysis

### 🚀 **tRPC API Performance**
- Query optimization and N+1 prevention
- Response compression and batching
- React Query caching strategy optimization
- Middleware performance analysis
- Payload size optimization

### 🗄️ **Database Performance**
- Query execution analysis and optimization
- Index strategy recommendations
- Connection pooling optimization
- SQLite/Turso specific performance tuning
- Database schema performance review

### 🌐 **Frontend Performance**
- Bundle size analysis and optimization
- Component rendering performance
- Client-side navigation optimization
- Image and asset loading optimization
- Core Web Vitals improvement

## Usage

### Full Performance Audit
```
Perform a comprehensive performance analysis of the entire application stack
```

### SSR Performance Analysis
```
Analyze and optimize the TanStack Start SSR performance and caching strategies
```

### Database Query Optimization
```
Review and optimize database queries, indexes, and connection management
```

### Frontend Bundle Optimization
```
Analyze bundle sizes and optimize the frontend application loading performance
```

## Performance Analysis Framework

### 1. Server-Side Rendering (SSR)
```typescript
// Route-based optimization opportunities
export const Route = createFileRoute('/dashboard')({
  loader: async () => {
    // ⚡ Optimize data fetching
    // ⚡ Implement proper caching
    // ⚡ Minimize server computation time
  },
  // ⚡ Add proper static data optimization
  staticData: async () => ({ /* static content */ })
});
```

**Optimization Targets:**
- Time to First Byte (TTFB)
- Server computation time
- Data fetching efficiency
- Cache hit rates

### 2. API Layer Performance
```typescript
// tRPC procedure optimization
export const getUsers = protectedProcedure
  .input(z.object({ limit: z.number().max(100) }))
  .query(async ({ input, ctx }) => {
    // ⚡ Implement proper pagination
    // ⚡ Add React Query caching hints
    // ⚡ Optimize database queries
  });
```

**Optimization Targets:**
- Response time optimization
- Payload size reduction
- Query efficiency
- Caching effectiveness

### 3. Database Performance
```sql
-- Index optimization examples
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_session_user_id ON session(user_id);
CREATE INDEX idx_audit_created_at ON audit_log(created_at DESC);

-- Query optimization
EXPLAIN QUERY PLAN SELECT * FROM user WHERE email = ?;
```

**Optimization Targets:**
- Query execution time
- Index effectiveness
- Connection pooling
- Memory usage optimization

### 4. Frontend Performance
```typescript
// Bundle optimization
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Component optimization
export const OptimizedComponent = memo(({ data }) => {
  // ⚡ Implement proper memoization
  // ⚡ Optimize re-renders
  // ⚡ Use code splitting
});
```

**Optimization Targets:**
- Bundle size reduction
- Code splitting effectiveness
- Component render optimization
- Asset loading optimization

## Performance Metrics

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Application Metrics
- **TTFB** (Time to First Byte): < 600ms
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s
- **Bundle Size**: Main bundle < 250KB gzipped

## Example Output

```
⚡ PERFORMANCE ANALYSIS REPORT
==============================

🌐 FRONTEND PERFORMANCE:
------------------------
📊 Bundle Size Analysis:
- Main Bundle: 180KB gzipped (✅ Good)
- Vendor Bundle: 220KB gzipped (⚠️ Could be optimized)
- Total Initial Load: 400KB (🟡 Acceptable)

🚀 Core Web Vitals:
- LCP: 2.1s (🟡 Needs improvement)
- FID: 45ms (✅ Good)
- CLS: 0.05 (✅ Good)

📱 SSR Performance:
- TTFB: 350ms (✅ Excellent)
- Hydration Time: 180ms (✅ Good)
- Route Navigation: 120ms (✅ Good)

🗄️ DATABASE PERFORMANCE:
-----------------------
⚡ Query Analysis:
- Average Query Time: 15ms (✅ Excellent)
- Slow Queries: 2 found (⚠️ Needs optimization)
- Index Usage: 87% (✅ Good)

🔍 Optimization Opportunities:
[1] Add index to user.email (packages/db/src/schema/auth.ts:5)
[2] Implement React Query caching for getUserProfile (packages/api/src/routers/user.ts:12)
[3] Split vendor bundle using route-based code splitting (apps/web/src/routes/)

📋 RECOMMENDATIONS:
-------------------
1. Implement virtual scrolling for large data tables
2. Add service worker for API response caching
3. Optimize images with WebP format and lazy loading
4. Implement proper HTTP/2 push for critical resources

🎯 PRIORITY FIXES:
-----------------
🔴 High Priority:
- Slow query in audit_logs table (avg: 850ms)
- Large vendor bundle size (220KB gzipped)

🟡 Medium Priority:
- Missing React Query caching for user data
- LCP metric above target (2.1s)

✅ LOW PRIORITY:
- Bundle size could be further optimized
- Image optimization opportunities
```

## Optimization Techniques

### TanStack Start Optimization
- Route-based code splitting
- Static data optimization with `static()`
- Proper caching headers
- Preloading critical routes
- Optimized meta tags for SEO

### tRPC Performance
- Query batching and deduplication
- React Query optimization
- Response compression
- Input validation optimization
- Middleware performance tuning

### Database Optimization
- Query execution analysis
- Index strategy implementation
- Connection pool optimization
- Query result caching
- Schema normalization review

### Frontend Optimization
- Bundle analysis and splitting
- Component memoization
- Asset optimization
- Lazy loading implementation
- Service worker caching

This skill ensures optimal performance across the entire application stack, providing specific recommendations for improving user experience and system efficiency.