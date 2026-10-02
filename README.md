# 🎓 Teacher Appreciation & Surprise Tribute Website

An ultra-elegant, formal, and premium **Surprise & Appreciation Web Application** built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Dedicated to **Mrs Rooprekha Bhardwaj** from **Bhumi and Taniya**.

---

## ✨ Features & Architecture

### 1. 🔐 Landing / Unlock Page (Horizontally Split Layout)
- **Left Side:** Luxury glassmorphism card featuring a clean, gold-bordered frame of the teacher's portrait, an *"A Token of Appreciation"* badge, and heartfelt introductory dedication text.
- **Right Side (The Digital Keypad):**
  - Interactive PIN keypad (0–9, Clear, Delete) and support for physical keyboard typing.
  - Visual 4-digit PIN indicator dots that illuminate with a golden aura.
  - **Passcode Logic:** Default set to `'1508'` or `'2026'`.
  - **Wrong Code Response:** Gentle red shake animation, red glow, vibration, and error feedback.
  - **Correct Code Response:** Emerald glow, synthesized celebratory chord via Web Audio API, canvas confetti celebration burst, and an elegant fade-out transition into the surprise content!
  - Includes a convenient *"Need Passcode Hint?"* expander with 1-click auto-fill for testing.

### 2. 🏛️ Surprise / Main Content Page
- **Floating Frosted Navbar:** Includes brand mark, smooth section anchor jumps, sound toggle, and a **"Lock Page"** button to easily re-test the lock screen.
- **Hero Section:** Full-width presentation with golden ambient particles, large high-resolution teacher portrait with floating badge, formal salutation, dedication quote card, and key milestone metrics.
- **Memories Grid:** Masonry / staggered layout showcasing authentic photos with hover scale-up, golden shimmer reflections, category filters, and an interactive **High-Res Photo Lightbox Modal** with full captions and contributor tags.
- **Student Letters & Tributes:** Frosted glass cards containing heartfelt thank-you notes from mentees. Includes an interactive modal to submit new tributes in real time.

### 3. ☁️ Share a Memory (Photo Upload Section)
- **UI Design:** Dedicated bottom section featuring a dashed champagne gold border that glows upon hover and file drag-over.
- **Elements:** Large `UploadCloud` icon, clean description, and a champagne gold *"Select File"* button.
- **Simulation Functionality:**
  - Drag-and-drop or file browser picker.
  - Instant 1-click sample presets for rapid demonstration without requiring local files.
  - Smooth animated progress bar simulation (0% to 100%).
  - Celebratory green checkmark, confetti pop, ascending sound chime, and a *"Thank you! Memory added successfully"* toast notification.
  - **Live Gallery Integration:** Uploaded memories instantly appear in the gallery!

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

All teacher details, photos, quotes, and secret passcode can be modified in [`config/surprise.js`](file:///c:/Users/dell/OneDrive/Desktop/Teacher%20GIFT/config/surprise.js) and [`data/teacherData.js`](file:///c:/Users/dell/OneDrive/Desktop/Teacher%20GIFT/data/teacherData.js):

```javascript
export const surpriseConfig = {
  teacherName: "Mrs Rooprekha Bhardwaj",
  studentName: "Bhumi and Taniya",
  passcode: "2026",
  ...
};
```
