# RestoApp — Restaurant Ordering System

> CSCI426: Advanced Web Programming — Project Phase 1 (Fall 2026)
> Fadi Chami · 52331006

**Repository:** https://github.com/52331006-art/Project

**Live site:** NOT LIVE YET

## About the project

RestoApp is a website for a Lebanese restaurant that gives customers a fast way to order. They can browse the menu by category, add dishes to their cart with a double-click and check out. The restaurant gets an admin page for keeping the menu up to date: adding new dishes, changing prices and descriptions, and removing dishes.

This is Phase 1 of the project, so it is front end only, built with React. Menu changes and the cart are saved in the browser. In Phase 2 an API server will replace browser storage. All menu data already goes through one service file (`menuService`), so the switch won't require changes to the pages.

## Features

- **Menu:** browse every dish as a card with its photo, price and description, and filter by category (Starters, Mains, Desserts, Drinks).
- **Add to cart:** double-click any dish card to add it to the cart. The card shows how many are in the cart, and the navbar shows the total.
- **Cart:** change quantities, remove dishes, and see the subtotal, delivery fee (free on orders over $50) and total. Checkout is simulated for now.
- **Admin page (`/admin`):** add, edit and delete dishes with a validated form, search the list, and reset back to the default menu.
- **Saved in the browser:** menu changes and the cart are stored in localStorage, so they survive a page refresh. Phase 1 has no backend; all data goes through `menuService`, so it can switch to an API later without changing the pages.
- **Contact:** contact details, a map, and a message form with validation (sending is simulated).
- **Responsive design:** works on phones, tablets and desktops, with pop-up notifications for actions like adding to the cart or saving a dish.

## Pages

| Route      | Page           |
| ---------- | -------------- |
| `/`        | Home           |
| `/about`   | About          |
| `/menu`    | Menu (dynamic) |
| `/contact` | Contact        |
| `/cart`    | Cart           |
| `/admin`   | Admin          |

## Technologies used

- [React 19](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for page navigation
- [Bootstrap 5](https://getbootstrap.com/) for layout and responsive design
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [React Hot Toast](https://react-hot-toast.com/) for pop-up notifications
- React Context for sharing the menu and cart between pages
- Git and GitHub for version control

## Getting started

You need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/52331006-art/Project.git
cd Project/restoapp
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

To build the production version:

```bash
npm run build
```

## Project structure

```
restoapp/
├── public/images/     # dish photos (see credits below)
└── src/
    ├── components/    # Navbar, Footer, DishCard, DishForm, Modal, MenuStatus
    ├── context/       # MenuProvider and CartProvider (shared state)
    ├── data/          # menu items, restaurant info, reviews, team
    ├── pages/         # Home, About, Menu, Contact, Cart, Admin
    ├── services/      # menuService
    └── utils/         # helper functions
```

## Screenshots

How to add the screenshots (remove these steps once the images are in place):

1. Open the live site, or run it locally with `npm run dev`.
2. **Desktop:** open each page in Chrome at full window width, press `F12` to open DevTools, then `Ctrl+Shift+P`, type **Capture full size screenshot** and press Enter.
3. **Mobile:** in DevTools press `Ctrl+Shift+M` to turn on the device toolbar, pick a phone such as **iPhone 12 Pro**, reload the page, then capture a full size screenshot the same way.
4. Create a `screenshots/` folder next to this README and save each image with the file name used in the table below (for example `home-desktop.png` and `home-mobile.png`).
5. Before taking the Cart screenshots, double-click a few dishes on the Menu page so the cart isn't empty.

| Page    | Desktop                                     | Mobile                                            |
| ------- | ------------------------------------------- | ------------------------------------------------- |
| Home    | ![Home](screenshots/home-desktop.png)       | ![Home mobile](screenshots/home-mobile.png)       |
| Menu    | ![Menu](screenshots/menu-desktop.png)       | ![Menu mobile](screenshots/menu-mobile.png)       |
| Cart    | ![Cart](screenshots/cart-desktop.png)       | ![Cart mobile](screenshots/cart-mobile.png)       |
| About   | ![About](screenshots/about-desktop.png)     | ![About mobile](screenshots/about-mobile.png)     |
| Contact | ![Contact](screenshots/contact-desktop.png) | ![Contact mobile](screenshots/contact-mobile.png) |

## Credits

- Dish photos are from [Unsplash](https://unsplash.com/), used under the [Unsplash License](https://unsplash.com/license). The full list of photos and links is in [`restoapp/public/images/CREDITS.md`](restoapp/public/images/CREDITS.md).
- Restaurant contact details are placeholders.
- AI tools: I used Claude (Claude Code, Opus 5.5) as a coding assistant. It helped with the project setup (removing the Vite starter and adding Bootstrap), the CSS styling, the placeholder content on the Home, About, Contact and Cart pages, the Admin page's add/edit/delete features (`menuService`, `MenuProvider`, `DishForm`, `Modal`), the double-click add-to-cart with a shared cart, and parts of this README.
