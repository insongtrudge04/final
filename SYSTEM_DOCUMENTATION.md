# 🏛️ Rizal Shrine Dapitan | System Documentation

## 📅 Project Version 1.0 (March 2026)

This document provides a detailed overview of the technical architecture, design system, and content strategy implemented for the **Rizal Shrine Dapitan** Digital Heritage Platform.

---

## 💻 Technical Architecture

### 1. Structure (HTML5)
*   **Semantic Layout**: Each page (`about.html`, `attractions.html`, etc.) uses standard HTML5 header-main-footer structures for search engine visibility.
*   **Grid System**: A custom CSS Grid and Flexbox implementation allows for responsive multi-column layouts across all screen sizes.

### 2. Styling (CSS3)
*   **Variable-Based System**: Defined in `:root`, providing a single source for colors, radii, and transitions.
*   **Glassmorphism Engine**: Utilizes `backdrop-filter: blur()` combined with semi-transparent HSL color models.
*   **Animation Library**: 
    *   **Scroll Reveals**: Directional (`reveal-left`, `reveal-right`, `reveal-up`) and scaling entries.
    *   **Staggered Entrance**: Timing-offset logic (`:nth-child`) for grid elements.
    *   **Hero Zoom**: Slow-motion background zoom to add depth on landing.

### 3. Logic (JavaScript)
*   **Intersection Observer**: High-performance detection of elements within the viewport to trigger animations.
*   **Lightbox Module**: Custom modal logic for gallery images, including `Escape` key support and background-click out.
*   **Quiz Engine**: State-managed JavaScript logic to handle question progression, scoring, and feedback messages.

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Primary Color** | `#1B3322` |
| **Accent Color** | `#4CAF50` (Vibrant Green) |
| **Typography** | **Headings**: Outfit (700 bold) <br> **Body**: Inter (400-600) |
| **Borders** | `1px solid rgba(255, 255, 255, 0.3)` |
| **Backgrounds** | Glassmorphism with `blur(28px)` |

---

## 🗺️ Specialized Modules

### 1. Illustrated Grounds Map
A custom visual asset mapping the **16-hectare sanctuary** (Talisay, Dapitan).
*   **Keywords**: Mi Retiro Rock, Casa Cuadrada, Casa Redonda, Amphitheater.
*   **Design**: Borderless, crosshair-interactive visual guide for visitors.

### 2. Trivia Knowledge Base
An interactive quiz module designed for educational engagement.
*   **Objective**: Testing visitor knowledge on Rizal's exile.
*   **Mechanic**: 5-question multiple-choice quiz with a progress bar and result card.

---

## 📁 File Manifest

*   **`index.html`**: Landing Experience
*   **`about.html`**: Heritage Narrative
*   **`attractions.html`**: Visual Guide & Grounds Map
*   **`gallery.html`**: High-End Lightbox Gallery
*   **`trivia.html`**: Knowledge Quiz
*   **`contact.html`**: City Plaza Map & Concierge
*   **`css/style.css`**: Design Core
*   **`js/script.js`**: Behavioral Core
*   **`README.md`**: Project Quickstart

---

## 🔗 Repository Management

The current project is synchronized with Version 3 of the heritage repository:
👉 [shrineWeb7101_v3](https://github.com/insongtrudge04/shrineWeb7101_v3.git)

---

## 📜 Maintenance Guide
1.  **Adding Attractions**: New attractions should follow the `.card` structure within a `.grid` or `.stagger` container.
2.  **Gallery Management**: New images require an `<img src="...">` and an `<div class="overlay"><h4>...</h4></div>` to function with the lightbox.
3.  **Quiz Updates**: Modify the `quizData` array in `trivia.html` to add or change questions.
