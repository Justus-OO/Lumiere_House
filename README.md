Lumiere House
The Premiere Destination for Cinematic Events.

Lumiere House is an independent, studio-adjacent platform dedicated to the art of the launch. In an era of endless digital noise, we curate moments of cinematic reverence. This repository contains the source code for the Lumiere House digital ecosystem, featuring a high-performance Next.js frontend and a robust Laravel API.

🏛 The Architecture
This project is structured as a Monorepo, ensuring a tight coupling between our curated content and the delivery engine.

/api: A production-grade Laravel 11+ REST API.

/client: A high-performance Next.js 15+ frontend with App Router, Tailwind CSS, and Framer Motion.

🚀 Deployment Overview
✨ Key Features
Cinematic Boot Sequence: A bespoke, session-aware loading experience designed for maximal impact.

Edge-to-Edge Grid: An ultra-wide responsive design (max-w-[1920px]) built for modern display standards.

Editorial Typography: Curated serif-led design for a museum-grade reading experience.

Server-Side Optimizations: SEO-first architecture utilizing Dynamic ISR (Incremental Static Regeneration) and Schema.org LD+JSON.

Bulletproof API: Enterprise-ready fetch utilities with request timeouts and graceful failure handling.

🛠 Setup & Installation
Prerequisites
PHP 8.3+ & Composer

Node.js 18+ & NPM

PostgreSQL 15+

Backend (/api)
Bash
cd api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
Frontend (/client)
Bash
cd client
cp .env.example .env
npm install
npm run dev
🎨 The Aesthetic Philosophy
Lumiere House is not built for the scroller. It is built for the viewer. Every interaction, from the "Film Shutter" page transitions to the subtle analog noise overlays, is calibrated to ensure that the medium is as essential as the message.

🔗 License
Lumiere House Archives © 2026. All Rights Reserved.