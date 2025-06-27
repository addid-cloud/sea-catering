# Sea Catering Subscription App

A modern web application for managing catering subscriptions, allowing users to customize meal plans, select delivery days, and personalize menus.

## Features

- Multi-step subscription form
- Customizable meal selection (main, side, drink)
- Day and time selection for meal delivery
- Allergy notes
- Confirmation modal before submission
- Responsive and modern UI with Tailwind CSS

## Tech Stack

- **React** (Vite or Create React App)
- **Tailwind CSS**
- **Context API & Hooks**
- **ESLint & Prettier** (recommended)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sea-catering.git
cd sea-catering
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# atau
yarn dev
```

---

## Build for Production

```bash
npm run build
# atau
yarn build
```

The production-ready files will be in the `dist` folder.

---

## Linting & Formatting

```bash
npm run lint
npm run format
```

---

## Project Structure

```
src/
  App/
  components/
    SubscriptionForm.jsx
    ConfirmModal.jsx
    ...
  ...
public/
prisma/
  ...
```

---

## Customization

- **Edit meal plans, menu, and logic** in `src/components/SubscriptionForm.jsx`.
- **Styling** is handled by Tailwind CSS. You can customize the theme in `tailwind.config.js`.

---

## Troubleshooting

- If you see errors about missing dependencies, run `npm install` again.
- For Tailwind CSS issues, ensure your IDE has the Tailwind CSS IntelliSense extension.

---


**Happy catering! 🍱**
