# ⚔️ Aetheria Forge — Fantasy Character Generator

> **A modern AI-powered fantasy character generator built with React, TypeScript, Tailwind CSS, Express, and Google Gemini API.**

Aetheria Forge is an interactive fantasy character generator that allows users to create unique RPG-style characters with randomized identities, classes, races, attributes, abilities, equipment, alignments, and backstories.

The application combines **procedural character generation** with **Generative AI** to create immersive character portraits and personalized origin stories.

---

## ✨ Features

### 🎲 Random Character Generation

Generate unique fantasy characters with randomized:

* Character name
* Character title
* Race
* Class
* Alignment
* Level
* Character statistics
* Abilities
* Equipment
* Backstory
* Character quote

The generator supports multiple fantasy classes, including:

* Warrior
* Mage
* Rogue
* Paladin
* Ranger
* Cleric
* Necromancer
* Bard
* Druid
* Monk
* Sorcerer
* Warlock

Supported races include:

* Human
* Elf
* Dwarf
* Halfling
* Dragonborn
* Tiefling
* Gnome
* Half-Orc

---

### 🤖 AI-Generated Character Portraits

Aetheria Forge integrates the **Google Gemini API** to dynamically generate character portraits based on the character's:

* Name
* Race
* Class
* Title
* Backstory
* Visual style

The generated portrait is designed as a stylized fantasy video game character illustration.

---

### 📖 AI-Generated Backstories

Characters can also receive dynamically generated origin stories using Google Gemini.

The AI uses character information such as:

* Name
* Race
* Class
* Title
* Alignment
* Equipment

to create a short atmospheric fantasy backstory.

---

### 📊 RPG Character Statistics

Each generated character receives a set of RPG attributes:

* Strength
* Dexterity
* Constitution
* Intelligence
* Wisdom
* Charisma
* HP
* Mana

The primary attribute of each class receives a higher randomized value to make the character's statistics more representative of its class.

For example:

```text
Warrior → Strength
Rogue   → Dexterity
Mage    → Intelligence
Cleric  → Wisdom
```

---

### 🧙 Class-Based Abilities

Each character class has its own ability set consisting of:

* Passive abilities
* Active abilities
* Ultimate abilities

Abilities can also include resource costs such as Mana, Stamina, or Energy.

---

### 🎒 Dynamic Equipment

Equipment is selected from a class-specific equipment pool.

Each generated character receives a randomized selection of equipment that matches their class.

Example:

```text
Mage
├── Crystal Staff
├── Silk Spell Robe
└── Amulet of Arcana
```

---

### 🎨 Fantasy-Themed UI

The application uses a dark fantasy visual style inspired by RPG character creation interfaces.

The UI includes:

* Medieval-inspired typography
* Fantasy color palettes
* Character class themes
* Gradient effects
* Glowing accents
* Custom card textures
* Responsive layouts
* Animated interactions

---

## 🛠️ Tech Stack

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| React             | Frontend UI                            |
| TypeScript        | Type-safe application development      |
| Tailwind CSS      | Styling and responsive UI              |
| Vite              | Frontend development and build tooling |
| Express.js        | Backend API server                     |
| Google Gemini API | AI-generated portraits and backstories |
| Lucide React      | UI icons                               |
| Motion            | UI animations                          |
| Node.js           | Runtime environment                    |
| dotenv            | Environment variable management        |

---

## 🏗️ Project Architecture

```text
Aetheria Forge
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── Vite
│
├── Backend
│   ├── Express.js
│   └── Gemini API integration
│
└── Character Engine
    ├── Random character generation
    ├── Class configuration
    ├── Race selection
    ├── Stat generation
    ├── Ability selection
    ├── Equipment selection
    └── Backstory generation
```

---

## 📁 Project Structure

```text
fantasy-character-generator/
│
├── src/
│   ├── components/
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterHistory.tsx
│   │   ├── ClassIcon.tsx
│   │   └── DeckList.tsx
│   │
│   ├── data/
│   │   └── characterData.ts
│   │
│   ├── utils/
│   │   └── characterGenerator.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── assets/
│
├── server.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── README.md
```

---

## 🔄 How Character Generation Works

The character generation system follows a procedural approach.

### 1. Generate Identity

The system randomly selects:

```text
First Name
Last Name
Title
Race
Alignment
Class
Level
```

### 2. Determine Class Attributes

Each class has a primary attribute.

For example:

```text
Warrior → Strength
Mage → Intelligence
Rogue → Dexterity
Ranger → Dexterity
Paladin → Strength
```

The primary attribute receives a higher randomized value.

### 3. Calculate Character Resources

HP and Mana are calculated based on the generated statistics.

```text
HP
= Base HP
+ Constitution × 5
+ Random Bonus
```

```text
Mana
= Base Mana
+ (Intelligence + Wisdom + Charisma) × 3
+ Random Bonus
```

### 4. Select Abilities

Abilities are retrieved from the character's class configuration.

Each class has:

* Passive ability
* Active ability
* Ultimate ability

### 5. Select Equipment

The system randomly selects equipment from the class-specific equipment pool.

### 6. Generate Story

A predefined backstory template is used for the initial character generation.

The user can then request an AI-generated origin story through the Gemini API.

### 7. Generate Portrait

The character's information is sent to the backend, which creates a prompt for Gemini's image generation model.

The generated image is then returned to the frontend and displayed as the character portrait.

---

## 🤖 Gemini API Integration

The backend exposes two main API endpoints.

### Generate Character Portrait

```http
POST /api/generate-portrait
```

Example request:

```json
{
  "name": "Aldric Stormborn",
  "characterClass": "Warrior",
  "race": "Human",
  "title": "The Iron Vanguard",
  "backstory": "A former knight who...",
  "style": "cartoon video game"
}
```

The endpoint returns a generated image as a data URL.

---

### Generate Character Backstory

```http
POST /api/generate-backstory
```

Example request:

```json
{
  "name": "Aldric Stormborn",
  "characterClass": "Warrior",
  "race": "Human",
  "title": "The Iron Vanguard",
  "alignment": "Lawful Good",
  "equipment": [
    "Greatsword of Valor",
    "Plate Mail Armor"
  ]
}
```

The Gemini API generates a short fantasy origin story based on the supplied character information.

---

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* A Google Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fantasy-character-generator.git
```

Navigate into the project:

```bash
cd fantasy-character-generator
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never commit your actual API key to GitHub.

Make sure `.env` is included in `.gitignore`.

---

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the application for production |
| `npm run start`   | Start the production server          |
| `npm run preview` | Preview the Vite production build    |
| `npm run lint`    | Run TypeScript type checking         |
| `npm run clean`   | Remove generated build files         |

---

## 🔐 Environment Variables

| Variable         | Required | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| `GEMINI_API_KEY` | Yes      | Google Gemini API key used for AI features |

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 🎯 Project Goals

This project was developed to explore the combination of **modern frontend development, procedural content generation, and Generative AI**.

The main goals are:

1. Build an interactive React application.
2. Practice TypeScript-based application architecture.
3. Implement procedural RPG character generation.
4. Integrate a frontend application with an Express backend.
5. Implement Generative AI features using the Gemini API.
6. Create an immersive and responsive user interface.
7. Develop a project suitable for a modern developer portfolio.

---

## 🧠 What I Learned

Through this project, I practiced and explored:

* React component architecture
* TypeScript interfaces and type safety
* Randomized data generation
* State management in React
* REST API integration
* Express.js backend development
* Environment variable management
* Google Gemini API integration
* AI image generation
* AI text generation
* Tailwind CSS
* Responsive UI design
* Modular project organization
* Frontend-backend communication

---

## 🚀 Future Improvements

Potential improvements for future versions include:

* [ ] Character search and filtering
* [ ] Save characters to a database
* [ ] User authentication
* [ ] Export characters as PDF
* [ ] Shareable character URLs
* [ ] More races and character classes
* [ ] Custom character creation
* [ ] Equipment rarity system
* [ ] Character progression and leveling
* [ ] Inventory management
* [ ] Character comparison
* [ ] Persistent character history
* [ ] Improved AI-generated artwork
* [ ] Deployment to a cloud platform

---

## 📸 Screenshots

<img width="1906" height="909" alt="image" src="https://github.com/user-attachments/assets/d20a1531-630d-4e2b-ae3b-cd6f6f74b486" />


## 🌐 Live Demo

> Add your deployed application URL here.

```text
https://fantasy-character-generator-five.vercel.app/
```

---

## 👨‍💻 Author

**Afif Rizki Putra**

Undergraduate Informatics Engineering Student
Universitas Lampung

Interested in:

* Software Development
* Artificial Intelligence
* Cyber Security
* Web Development
* Emerging Technologies

---

## 📄 License

This project is created for educational and portfolio purposes.

You are free to explore the source code and adapt the ideas for your own learning projects.

---

<div align="center">

### ⚔️ Forge Your Legend

**Aetheria Forge — Where every hero has a story.**

</div>
