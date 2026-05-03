# Things To Do - StudentHub Project

## 📋 Table of Contents
- [Backend - Missing/Incomplete](#backend---missingincomplete)
- [Frontend - Missing/Incomplete](#frontend---missingincomplete)
- [Quick Summary Table](#quick-summary-table)
- [Recommended Priority Order](#recommended-priority-order)

---

## 🔧 Backend - Missing/Incomplete

### High Priority

- [ ] **Delete Reviews** - Create endpoint for users to delete their own reviews
  - Route: `DELETE /reviews/:id`
  - Should only allow owner or admin to delete
  - Controller: Add `deleteReview` function to `reviewsController.js`

- [ ] **Search/Filter Events** - Create endpoint to filter events by criteria
  - Route: `GET /items?category=&date=&location=`
  - Controller: Add filters to `getAllItems` function
  - Support filtering by: date, location, category, approval status
  - Should paginate results

- [ ] **Pagination** - Add pagination to events list
  - Add `limit` and `offset` query parameters
  - Return metadata: `{ total, limit, offset, data }`
  - Update `getAllItems` and `getAllItemsForAdmin`

- [ ] **Better Error Handling** - Current `errorHandler.js` returns generic 500 errors
  - Create specific error types (ValidationError, NotFoundError, UnauthorizedError)
  - Return meaningful error messages
  - Include error codes for frontend to handle

### Medium Priority

- [ ] **Input Validation** - Validate all request bodies
  - Use library like `joi` or `zod`
  - Validate: `item_name`, `item_desc`, `email`, `password`, etc.
  - Return 400 with validation errors

- [ ] **Rate Limiting** - Prevent spam/abuse
  - Limit signup/login attempts
  - Limit event creation per user
  - Add `express-rate-limit` middleware

- [ ] **Admin Routes Namespace** - Organize admin endpoints under `/api/admin/*`
  - Move `/items/admin/all` to `/admin/items`
  - Move `/items/:id/approval` to `/admin/items/:id/approval`
  - Update routes file

- [ ] **User Profile Endpoints** - Allow users to view/update their profile
  - `GET /users/me` - Get current user profile
  - `PATCH /users/me` - Update profile (name, bio, avatar)
  - `GET /users/:id` - Get public user profile
  - Create user profile controller

### Low Priority

- [ ] **Email Verification** - Complete email confirmation for signups
  - Send verification email on signup
  - Create verification token table
  - Verify token on account activation

- [ ] **Tests** - Add unit and integration tests
  - Test auth endpoints
  - Test item CRUD operations
  - Test reviews functionality
  - Use Jest or Mocha

- [ ] **Logging** - Add proper logging system
  - Log API requests, errors, important events
  - Use Winston or Bunyan

- [ ] **API Documentation** - Document all endpoints
  - Create Swagger/OpenAPI spec
  - Or maintain detailed README

---

## 🎨 Frontend - Missing/Incomplete

### High Priority

- [ ] **Review Components** - Create reusable review UI components
  - `components/reviews/ReviewCard.jsx` - Display single review
  - `components/reviews/ReviewList.jsx` - Display list of reviews
  - `components/reviews/ReviewForm.jsx` - Form to add new review
  - Show rating/stars (add star rating component)
  - Show user avatar, name, date

- [ ] **Event Card Component** - Reusable event display card
  - `components/events/EventCard.jsx` - Used in event list/grid
  - Include: image, title, location, time, user info
  - Add hover effects
  - Include AI summary badge (if implemented)

- [ ] **Event List/Grid Component** - Container for displaying events
  - `components/events/EventsList.jsx`
  - Display as grid or list
  - Handle empty state
  - Loading skeleton

- [ ] **Connect Search/Filter to Backend** - Make search functional
  - Build query params from filter selections
  - Call backend `/items?category=&date=&location=`
  - Update navbar search to filter results

### Medium Priority

- [ ] **Event Filter Sidebar** - Add filters for events page
  - Filter by date range
  - Filter by location (building)
  - Filter by category (if added to backend)
  - Show filter counts
  - Component: `components/events/EventFilters.jsx`

- [ ] **Deals Page Improvements** - Move from hardcoded to dynamic
  - Create Deals controller/routes in backend
  - Create `components/deals/DealCard.jsx`
  - Create `components/deals/DealsList.jsx`
  - Fetch from API instead of hardcoded

- [ ] **Resources Page Improvements** - Move from hardcoded to dynamic
  - Create Resources controller/routes in backend
  - Create `components/resources/ResourceCard.jsx`
  - Create `components/resources/ResourcesList.jsx`
  - Fetch from API instead of hardcoded

- [ ] **Error Boundaries** - Handle errors gracefully
  - Create `components/ui/ErrorBoundary.jsx`
  - Wrap page sections with error boundary
  - Display user-friendly error messages
  - Add fallback UI

- [ ] **Toast/Notification System** - Display notifications
  - Install library: `sonner` or `react-hot-toast`
  - Create notification context or use library
  - Show success/error/info messages
  - Auto-dismiss after 3-5 seconds

- [ ] **Skeleton Loaders** - Better loading states
  - Create `components/ui/SkeletonLoader.jsx`
  - Create skeleton versions:
    - `EventCardSkeleton`
    - `ReviewCardSkeleton`
    - `ReviewListSkeleton`

### Low Priority

- [ ] **Event Detail Page Enhancements**
  - Add related events section
  - Add share event functionality (social media)
  - Add to calendar feature
  - Show reviews count/average rating

- [ ] **Responsive Design** - Ensure mobile-friendly
  - Test on mobile devices
  - Adjust layouts for small screens
  - Mobile navigation menu
  - Touch-friendly buttons

- [ ] **Dark Mode** - Implement ThemeContext fully
  - ThemeContext exists but may be incomplete
  - Create theme toggle button
  - Persist theme preference in localStorage
  - Style all components for dark mode

- [ ] **User Profile Page** - Display and edit user profile
  - `/profile` or `/users/me` page
  - Show user info, created events, reviews
  - Edit profile form
  - Change password option

- [ ] **Admin Dashboard Enhancements**
  - Add statistics/dashboard cards
    - Total events created
    - Pending approvals count
    - Total users
  - Event analytics
  - User management

---

## 📊 Quick Summary Table

| Feature | Backend | Frontend | Status |
|---------|---------|----------|--------|
| **Authentication** | ✓ | ✓ | Complete |
| **Events (CRUD)** | ✓ | ✓ | Complete |
| **Reviews (CR)** | ✓ | Partial | Partial |
| **Delete Reviews** | ✗ | - | Missing |
| **Event Approval** | ✓ | ✓ | Complete |
| **Image Upload** | ✓ | ✓ | Complete |
| **Admin Dashboard** | ✓ | ✓ | Complete |
| **Search/Filter Events** | ✗ | ✗ | Missing |
| **Pagination** | ✗ | - | Missing |
| **Error Handling** | Partial | Partial | Incomplete |
| **Input Validation** | ✗ | - | Missing |
| **Rate Limiting** | ✗ | - | Missing |
| **Deals (from DB)** | ✗ | Hardcoded | Needs DB |
| **Resources (from DB)** | ✗ | Hardcoded | Needs DB |
| **User Profiles** | ✗ | - | Missing |
| **Review Components** | - | ✗ | Missing |
| **Event Card Component** | - | ✗ | Missing |
| **Notifications/Toasts** | - | ✗ | Missing |
| **Error Boundaries** | - | ✗ | Missing |
| **Dark Mode** | Partial | Partial | Incomplete |
| **Tests** | ✗ | ✗ | Missing |

---

## 🎯 Recommended Priority Order

### Phase 1: Improve Core Features (Week 1-2)

**Backend:**
1. [ ] Delete review endpoint
2. [ ] Better error handling
3. [ ] Input validation

**Frontend:**
1. [ ] Review components (card, form, list)
2. [ ] Event card component
3. [ ] Error boundaries

### Phase 2: Add Search & Filtering (Week 3)

**Backend:**
1. [ ] Search/filter events API
2. [ ] Pagination

**Frontend:**
1. [ ] Connect search/filter to backend
2. [ ] Event filter sidebar
3. [ ] Skeleton loaders

### Phase 3: Dynamic Content (Week 4)

**Backend:**
1. [ ] Deals endpoints
2. [ ] Resources endpoints

**Frontend:**
1. [ ] Deals page improvements
2. [ ] Resources page improvements
3. [ ] Toast notification system

### Phase 4: Polish & Admin Features (Week 5)

**Backend:**
1. [ ] Rate limiting
2. [ ] User profile endpoints
3. [ ] Admin routes namespace

**Frontend:**
1. [ ] Admin dashboard enhancements
2. [ ] User profile page
3. [ ] Responsive design refinement

### Phase 5: Nice-to-Have (Future)

- Email verification
- Dark mode completion
- Advanced admin analytics
- Unit tests
- API documentation

---

## 📝 Notes

- Start with Phase 1 items as they improve existing features
- Each phase builds on the previous one
- Frontend features can be built in parallel while backend is being developed
- Consider using component libraries (shadcn/ui, Material-UI) for consistency
- Add TypeScript for better type safety (optional but recommended)

