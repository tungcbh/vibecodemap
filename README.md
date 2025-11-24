# VibeCodeMap

A modern map application built with **React (Vite)**, **TypeScript**, and **OpenLayers**, designed with **Clean Architecture** principles.

## Tech Stack
-   **Core:** React 18, TypeScript, Vite
-   **Map Engine:** OpenLayers (ol)
-   **Styling:** CSS Modules / Vanilla CSS

## Key Features
-   **Clean Architecture:** Strict separation of UI, Logic (Hooks), and Domain (Utils).
-   **Base Layer Switching:** Seamlessly switch between OSM, Stadia Dark, and Google Sateline.
-   **Scalable Codebase:** Loose coupling ensures easy addition of new map providers.
-   **Type Safety:** Fully typed with TypeScript.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Copy `.env.example` to `.env` and add your API keys:
    ```env
    VITE_GOOGLE_API_KEY=your_key
    VITE_STADIA_API_KEY=your_key
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Project Structure
-   `src/components`: UI Components (View).
-   `src/hooks`: Business Logic & State (ViewModel).
-   `src/utils`: Domain Logic & Helper Functions.
-   `src/types`: TypeScript Interfaces.
-   `src/config`: App Constants.
