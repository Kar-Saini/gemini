# Gemini Chat App

### Links

- Github : https://github.com/Kar-Saini/gemini
- Live : https://gemini-9uqnjlgmk-kar-sainis-projects.vercel.app/

A modern chat application built with **Next.js**, **Redux Toolkit**, **TailwindCSS**, and **Framer Motion**.

It includes:

- Sidebar with chat history
- Global state management using Redux
- Persistent chat IDs
- Gemini-like dummy AI response window
- Chat deletion
- Debounced serach for Country Codes
- Delayed responses and OTP checks using `setTimeout()`

---

## Features

### Sidebar with Chat List

- Displays all chats with `name` and `timestamp`.
- Click a chat to open it in the chatbox.

### Chat Window

- Located at `app/page.tsx`.
- Shows conversation history (`userPrompt` + Gemini responses).
- Reacts to the selected chat from Redux.

### Global State (Redux)

- Stores all chats in memory.
- Tracks the active `selectedChatId`.
- Example state shape:
  ```ts
  {
    chats: [
      {
        id: "1",
        name: "First Chat",
        timeStamp: "2025-08-18",
        promptAndResponses: [...]
      },
      ...
    ],
    selectedChatId: "1"
  }
  ```
- Actions `addChat, deleteChat, selectChatId`

### Helper Functions

- Located at `app/_utils/helper.ts`.

#### 1. `getCountryDetailsBySlug(slug: string)`

- Fetches country details from the [REST Countries API](https://restcountries.com/).
- Returns an array of objects with `name` and `idd` (country calling code).
- Used with a debounced search to prevent excessive API calls.

#### 2. `debouncedSearch`

- A debounced wrapper around `getCountryDetailsBySlug`.
- Ensures the API is only called after a short delay (300ms by default).

#### 3. `generateRandomNumberOfWords()`

- Creates a random list of "dummy words".
- Each word is randomly generated with up to 15 letters.
- Useful for testing or simulating AI-like responses.

#### 4. `generateId()`

- Generates a 6-character random ID string.
- Used for chat IDs and ensuring uniqueness.
