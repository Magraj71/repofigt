# 🎓 Teacher Appreciation & Surprise Tribute Website

An ultra-elegant, formal, and premium **Surprise & Appreciation Web Application** built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Designed with a high-end luxury theme featuring **Midnight Blue (`#070B14`, `#0F172A`)**, **Champagne Gold (`#D4AF37`, `#F5E6C8`)**, glassmorphism cards, and respectful academic typography (`Playfair Display` serif & `Inter` sans-serif).

---

## ✨ Features & Architecture

### 1. 🔐 Landing / Unlock Page (Horizontally Split Layout)
- **Left Side:** Luxury glassmorphism card featuring a clean, gold-bordered frame of the teacher's portrait, an *"A Token of Appreciation"* badge, and heartfelt introductory dedication text.
- **Right Side (The Digital Keypad):**
  - Interactive PIN keypad (0–9, Clear, Delete) and support for physical keyboard typing.
  - Visual 4-digit PIN indicator dots that illuminate with a golden aura.
  - **Passcode Logic:** Default set to `'1508'` (Teacher's DOB: August 15).
  - **Wrong Code Response:** Gentle red shake animation (`x: [-12, 12, -8, 8, 0]`), red glow, vibration, and error feedback.
  - **Correct Code Response:** Emerald glow, synthesized celebratory chord via Web Audio API, canvas confetti celebration burst, and an elegant fade-out transition into the surprise content!
  - Includes a convenient *"Need Passcode Hint?"* expander with 1-click auto-fill for testing.

### 2. 🏛️ Surprise / Main Content Page
- **Floating Frosted Navbar:** Includes brand mark, smooth section anchor jumps, sound toggle, and a **"Lock Page"** button to easily re-test the lock screen.
- **Hero Section:** Full-width presentation with golden ambient particles, large high-resolution teacher portrait with floating badge, formal salutation, dedication quote card, and key milestone metrics (25+ Years, 3,500+ Students Mentored, etc.).
- **Memories Grid (Section 2):** Masonry / staggered layout showcasing authentic photos with hover scale-up, golden shimmer reflections, category filters, and an interactive **High-Res Photo Lightbox Modal** with full captions and contributor tags.
- **Student Letters & Tributes (Section 3):** Frosted glass cards containing formal thank-you notes from mentees, alumni, and research scholars. Includes an interactive **"Leave a Personal Note"** modal to submit new tributes in real time.

### 3. ☁️ Share a Memory (Photo Upload Section)
- **UI Design:** Dedicated bottom section featuring a dashed champagne gold border that glows upon hover and file drag-over.
- **Elements:** Large `UploadCloud` icon, clean description, and a champagne gold *"Select File"* button.
- **Simulation Functionality:**
  - Drag-and-drop or file browser picker.
  - Instant 1-click sample presets for rapid demonstration without requiring local files.
  - Smooth animated progress bar simulation (0% to 100%).
  - Celebratory green checkmark, confetti pop, ascending sound chime, and a *"Thank you! Memory added successfully"* toast notification.
  - **Live Gallery Integration:** Uploaded memories instantly appear at the top of the **Memories Grid**!

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (ES6+ / JSX)
- **Styling:** Tailwind CSS with custom luxury color palette & glassmorphism
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti & Web Audio API sound synthesizer

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

---

## ⚙️ Customization

All teacher details, photos, quotes, and the secret passcode can be modified in [`data/teacherData.js`](file:///c:/Users/dell/OneDrive/Desktop/Teacher%20GIFT/data/teacherData.js):

```javascript
export const TEACHER_CONFIG = {
  // Change secret passcode here (e.g., '1508' for 15th August)
  passcode: '1508',
  passcodeHint: 'Teacher\'s Birthday: August 15 (Enter 1508)',

  name: 'Professor Jonathan Vance',
  salutation: 'Prof. Vance',
  title: 'Distinguished Professor & Academic Mentor',
  department: 'Department of Computer Science & Engineering',
  institution: 'Faculty of Sciences & Technology',
  yearsOfService: '25+ Years of Inspiring Minds',
  
  // Custom photos
  heroImage: 'https://...',
  ...
};
```
