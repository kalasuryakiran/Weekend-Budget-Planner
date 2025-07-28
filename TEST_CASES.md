# Weekend Budget Planner - Comprehensive Test Cases

## Overview
This document provides detailed test cases for the Weekend Budget Planner React application. The application generates AI-powered budget suggestions for movies, transport, and dining using Google Gemini API.

## Application Features
- User inputs: Total Budget (default 1000 INR) and Number of People (default 1)
- Generate Plan button with Google Gemini API integration
- Loading, error, and success state management
- Budget summary with dynamic calculations
- Categorized plan display (Movies, Transport, Food)
- Fixed movie ticket price (350 INR each)
- Client-side calculations only
- No database persistence

---

## I. Initial Render & Basic UI

### TC-UI-001: Initial Page Load
**Description:** Verify all core UI elements are present on initial load
**Steps:**
1. Open the Weekend Budget Planner application
2. Observe the page layout and elements

**Expected Results:**
- Header displays "Weekend Budget Planner" title
- Subtitle is visible and descriptive
- Total Budget input field is present with default value 1000
- Number of People input field is present with default value 1
- "Generate Plan" button is visible and enabled
- Budget summary section shows placeholders or empty state
- No plan sections (Movies, Transport, Food) are visible initially
- Empty state message is displayed

### TC-UI-002: Default Input Values
**Description:** Verify default values are correctly set
**Steps:**
1. Load the application
2. Check input field values

**Expected Results:**
- Total Budget field shows "1000"
- Number of People field shows "1"
- Both fields are editable and focused properly

### TC-UI-003: Responsive Design
**Description:** Verify UI adapts to different screen sizes
**Steps:**
1. Load application on desktop view
2. Resize browser to tablet size
3. Resize to mobile size

**Expected Results:**
- Layout adjusts appropriately for each screen size
- All elements remain accessible and readable
- Input fields and buttons maintain proper sizing
- Cards stack appropriately on smaller screens

---

## II. User Input Handling

### TC-INPUT-001: Valid Budget Input
**Description:** Test valid numeric budget inputs
**Steps:**
1. Clear the Total Budget field
2. Enter valid values: 500, 1500, 2000, 10000
3. Verify input acceptance

**Expected Results:**
- All valid numeric values are accepted
- Field displays entered value correctly
- No error messages appear

### TC-INPUT-002: Invalid Budget Input - Non-Numeric
**Description:** Test non-numeric budget inputs
**Steps:**
1. Clear the Total Budget field
2. Enter non-numeric values: "abc", "12a3", "!@#"
3. Observe behavior

**Expected Results:**
- Non-numeric characters should be rejected or filtered
- Field maintains previous valid value or shows appropriate handling
- No application crashes occur

### TC-INPUT-003: Budget Input - Boundary Values
**Description:** Test extreme budget values
**Steps:**
1. Test minimum value: 0
2. Test negative value: -100
3. Test very large value: 999999999
4. Test decimal values: 1000.50

**Expected Results:**
- Zero value is handled appropriately
- Negative values are either rejected or handled gracefully
- Large values don't break the application
- Decimal handling is consistent with application design

### TC-INPUT-004: Valid People Count Input
**Description:** Test valid people count inputs
**Steps:**
1. Clear the Number of People field
2. Enter valid values: 1, 2, 5, 10
3. Verify input acceptance

**Expected Results:**
- All valid positive integers are accepted
- Field displays entered value correctly
- Budget calculations should consider people count

### TC-INPUT-005: Invalid People Count - Zero/Negative
**Description:** Test invalid people count inputs
**Steps:**
1. Enter zero: 0
2. Enter negative value: -1
3. Observe behavior

**Expected Results:**
- Zero or negative values should be rejected or default to 1
- Appropriate validation messages may appear
- Application remains functional

### TC-INPUT-006: Invalid People Count - Non-Numeric
**Description:** Test non-numeric people count inputs
**Steps:**
1. Enter non-numeric values: "abc", "2.5", "1a"
2. Observe behavior

**Expected Results:**
- Non-numeric inputs are rejected
- Field maintains valid previous value
- No application errors occur

---

## III. "Generate Plan" Button & Loading State

### TC-BUTTON-001: Initial Button State
**Description:** Verify button initial state and behavior
**Steps:**
1. Load the application
2. Observe the Generate Plan button

**Expected Results:**
- Button is visible and enabled
- Button text reads "Generate Plan"
- Button has proper styling and hover effects

### TC-BUTTON-002: Loading State Activation
**Description:** Verify loading state when button is clicked
**Steps:**
1. Enter valid budget (1000) and people count (2)
2. Click "Generate Plan" button
3. Observe immediate UI changes

**Expected Results:**
- Button immediately becomes disabled
- Button text changes to "Generating Plan..." with loading spinner
- Loading spinner is visible and animating
- Button cannot be clicked again while loading

### TC-BUTTON-003: Loading State - Successful API Call
**Description:** Verify loading state resolves after successful API call
**Steps:**
1. Click "Generate Plan" with valid inputs
2. Wait for successful API response
3. Observe UI state changes

**Expected Results:**
- Loading spinner disappears
- Button re-enables
- Button text returns to "Generate Plan"
- Generated plan is displayed
- No error messages appear

### TC-BUTTON-004: Loading State - Failed API Call
**Description:** Verify loading state resolves after failed API call
**Steps:**
1. Simulate API failure (disconnect network or invalid API key)
2. Click "Generate Plan"
3. Wait for response

**Expected Results:**
- Loading spinner disappears
- Button re-enables
- Button text returns to "Generate Plan"
- Error message is displayed
- No plan is generated

---

## IV. Google Gemini API Integration & LLM Response Processing

### TC-API-001: Successful API Call - Valid JSON Response
**Description:** Test successful API integration with valid response
**Steps:**
1. Ensure valid API key is configured
2. Enter budget: 1000, people: 2
3. Click "Generate Plan"
4. Wait for response

**Expected Results:**
- API call completes successfully
- Valid JSON response is processed
- generatedPlan state is updated
- Plan sections (Movies, Transport, Food) become visible
- Budget summary shows calculated values
- No error messages appear

### TC-API-002: Movie Price Enforcement
**Description:** Verify movie price is fixed at 350 INR regardless of LLM response
**Steps:**
1. Generate a plan successfully
2. Check the displayed movie price
3. Verify calculation consistency

**Expected Results:**
- Movie ticket price is always displayed as 350 INR
- Total movie cost = 350 × numberOfPeople
- Budget calculations use the corrected price
- Movie price enforcement happens client-side

### TC-API-003: API Key Missing
**Description:** Test behavior when API key is not configured
**Steps:**
1. Remove or invalidate the GEMINI_API_KEY
2. Click "Generate Plan"
3. Observe response

**Expected Results:**
- Error message indicates API key configuration issue
- No API call is attempted
- Button returns to enabled state
- User receives clear guidance on resolution

### TC-API-004: Network Error During API Call
**Description:** Test behavior during network connectivity issues
**Steps:**
1. Disconnect network connection
2. Click "Generate Plan"
3. Observe behavior

**Expected Results:**
- Network error is caught and handled
- User-friendly error message is displayed
- Application remains stable
- Button returns to normal state

### TC-API-005: HTTP Error Response
**Description:** Test API HTTP error responses
**Steps:**
1. Configure invalid API key to trigger 400/401 response
2. Click "Generate Plan"
3. Observe error handling

**Expected Results:**
- HTTP error is properly caught
- Appropriate error message is displayed
- Application doesn't crash
- User can retry after correction

### TC-API-006: Malformed JSON Response
**Description:** Test handling of invalid JSON from API
**Steps:**
1. Simulate API returning malformed JSON
2. Click "Generate Plan"
3. Observe error handling

**Expected Results:**
- JSON parsing error is caught
- Error message indicates response parsing issue
- Application remains stable
- User can retry

### TC-API-007: Empty API Response
**Description:** Test handling when API returns empty or incomplete response
**Steps:**
1. Simulate API returning empty candidates array
2. Click "Generate Plan"
3. Observe handling

**Expected Results:**
- Empty response is detected
- Appropriate error message is shown
- No partial plan is displayed
- User can retry

### TC-API-008: Budget Exceeded Scenario
**Description:** Test when LLM response exceeds the specified budget
**Steps:**
1. Set a low budget (e.g., 500 INR)
2. Generate plan that might exceed budget
3. Observe calculations and display

**Expected Results:**
- Total estimated cost is calculated correctly
- Remaining budget shows negative value
- Negative remaining budget is styled in red
- "Over budget!" warning is displayed
- All calculations remain accurate

---

## V. Budget Summary & Dynamic Calculations

### TC-CALC-001: Budget Summary Updates
**Description:** Verify budget summary updates correctly after plan generation
**Steps:**
1. Set budget: 1500, people: 2
2. Generate plan
3. Verify all budget summary fields

**Expected Results:**
- Initial Budget shows entered value (1500)
- Total Estimated Cost shows sum of all plan items
- Remaining Budget = Initial Budget - Total Estimated Cost
- All values are displayed with proper currency formatting (₹)

### TC-CALC-002: Movie Cost Calculation
**Description:** Verify movie cost calculation with people count
**Steps:**
1. Set people count to 3
2. Generate plan
3. Check movie cost calculation

**Expected Results:**
- Movie cost = 350 × 3 = 1050 INR
- Movie section shows "Total: ₹1050"
- Cost is included in total estimated cost

### TC-CALC-003: Positive Remaining Budget Display
**Description:** Test display when remaining budget is positive
**Steps:**
1. Set high budget (3000 INR), people: 1
2. Generate plan
3. Observe remaining budget display

**Expected Results:**
- Remaining budget value is positive
- Value is displayed in green color
- No warning messages appear

### TC-CALC-004: Negative Remaining Budget Display
**Description:** Test display when remaining budget is negative
**Steps:**
1. Set low budget (300 INR), people: 2
2. Generate plan
3. Observe remaining budget display

**Expected Results:**
- Remaining budget value is negative
- Value is displayed in red color
- "Over budget!" warning is shown

### TC-CALC-005: Zero Remaining Budget
**Description:** Test display when remaining budget is exactly zero
**Steps:**
1. Generate plan that results in zero remaining budget
2. Observe display

**Expected Results:**
- Remaining budget shows ₹0
- Color styling is appropriate (likely green)
- No over-budget warning appears

### TC-CALC-006: Real-time Calculation Updates
**Description:** Verify calculations update when people count changes after plan generation
**Steps:**
1. Generate plan with 1 person
2. Change people count to 2
3. Observe if calculations update

**Expected Results:**
- Movie costs should update to reflect new people count
- Total estimated cost recalculates
- Remaining budget updates accordingly
- All changes are immediate (no re-generation required)

---

## VI. Generated Plan Display

### TC-DISPLAY-001: Plan Sections Visibility
**Description:** Verify plan sections appear only after successful generation
**Steps:**
1. Load application (no plan generated)
2. Generate successful plan
3. Observe section visibility

**Expected Results:**
- Initially: Movies, Transport, Food sections are not visible
- After generation: All three sections become visible
- Empty state message disappears
- Budget summary becomes populated

### TC-DISPLAY-002: Movies Section Content
**Description:** Verify movies section displays all required information
**Steps:**
1. Generate plan
2. Examine movies section content

**Expected Results:**
- Movie title is displayed
- Showtime is shown
- Price per person (₹350) is displayed
- Total cost for all people is calculated and shown
- Film icon is visible
- Section has proper styling and layout

### TC-DISPLAY-003: Transport Section Content
**Description:** Verify transport section displays correctly
**Steps:**
1. Generate plan
2. Examine transport section content

**Expected Results:**
- Transport method(s) are listed
- Estimated cost for each method is shown
- Currency formatting is consistent (₹)
- Car icon is visible
- Multiple transport options are displayed if provided

### TC-DISPLAY-004: Food Section Content
**Description:** Verify food section displays correctly
**Steps:**
1. Generate plan
2. Examine food section content

**Expected Results:**
- Restaurant type is displayed
- Estimated food cost is shown
- Currency formatting is consistent
- Utensils icon is visible
- Cost is properly integrated into total calculations

### TC-DISPLAY-005: Empty State Message
**Description:** Verify empty state when no plan is generated
**Steps:**
1. Load application without generating plan
2. Observe empty state

**Expected Results:**
- Appropriate empty state message is displayed
- Message encourages user to generate plan
- Clipboard icon or similar illustration is shown
- Message is clear and helpful

### TC-DISPLAY-006: Error State Display
**Description:** Verify error messages are properly displayed
**Steps:**
1. Trigger API error
2. Observe error display

**Expected Results:**
- Error message is clearly visible
- Error has appropriate styling (red background/border)
- Alert icon is displayed
- Error message is helpful and actionable
- Error doesn't interfere with other UI elements

---

## VII. Edge Cases & Stress Tests

### TC-EDGE-001: Rapid Button Clicks
**Description:** Test behavior with rapid successive button clicks
**Steps:**
1. Click "Generate Plan" button rapidly multiple times
2. Observe behavior

**Expected Results:**
- Only one API call is made
- Button remains disabled during processing
- No duplicate plans are generated
- Application remains stable

### TC-EDGE-002: Input Changes During API Call
**Description:** Test changing inputs while API call is in progress
**Steps:**
1. Click "Generate Plan"
2. Immediately change budget or people count
3. Wait for API response

**Expected Results:**
- Input changes are accepted
- Generated plan uses original values from when button was clicked
- No inconsistencies in calculations
- User can generate new plan with updated values

### TC-EDGE-003: Very Large Budget Values
**Description:** Test with extremely large budget values
**Steps:**
1. Enter budget: 999999999
2. Generate plan
3. Observe calculations and display

**Expected Results:**
- Large numbers are handled properly
- No overflow errors occur
- Currency formatting handles large values
- Calculations remain accurate

### TC-EDGE-004: Browser Refresh During Operation
**Description:** Test application state after browser refresh
**Steps:**
1. Enter custom values and generate plan
2. Refresh browser
3. Observe state

**Expected Results:**
- Application returns to initial state
- Default values are restored
- No generated plan persists (as expected)
- Application functions normally

---

## VIII. Accessibility & Usability

### TC-A11Y-001: Keyboard Navigation
**Description:** Test keyboard accessibility
**Steps:**
1. Navigate through application using only keyboard
2. Test Tab, Enter, and arrow keys

**Expected Results:**
- All interactive elements are reachable via keyboard
- Tab order is logical
- Enter key activates Generate Plan button
- Focus indicators are visible

### TC-A11Y-002: Screen Reader Compatibility
**Description:** Test with screen reader technology
**Steps:**
1. Use screen reader to navigate application
2. Verify content is properly announced

**Expected Results:**
- All text content is accessible
- Form labels are properly associated
- Button states are announced
- Error messages are announced

### TC-A11Y-003: Color Contrast
**Description:** Verify color contrast meets accessibility standards
**Steps:**
1. Check contrast ratios for all text
2. Verify color-coded elements (green/red budget)

**Expected Results:**
- All text meets WCAG contrast requirements
- Color is not the only way to convey information
- Budget status is clear even without color

---

## Test Execution Guidelines

### Prerequisites
- Valid GEMINI_API_KEY configured in environment
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Network connectivity for API calls
- Development or production environment running

### Test Data
- **Default Budget:** 1000 INR
- **Default People:** 1
- **Test Budgets:** 500, 1000, 1500, 3000 INR
- **Test People Counts:** 1, 2, 3, 5

### Success Criteria
- All positive scenarios pass completely
- Error conditions are handled gracefully
- UI remains responsive and accessible
- No console errors in browser developer tools
- Performance remains acceptable under normal load

### Automation Considerations
For automated testing implementation:
- Mock API responses for consistent test results
- Use React Testing Library for component testing
- Implement Jest for unit tests
- Consider Cypress or Playwright for E2E testing
- Mock network conditions for error scenarios