# TabPet

A fluffy companion to join you on your web-surfing adventures. Currently only supported on Chrome.

![gif](https://github.com/user-attachments/assets/dc8f3c04-ad7f-4b59-a235-41eb969c484e)

## Overview

TabPet is a cool lil Chrome Extension that adds a pet to your browser, complete with a game-engine inspired architecture and cute Easter eggs.

## Features

- Custom-built OOP game engine designed specifically for Chrome extension environment
- Real-time pet simulation system with state management
- Interactive virtual pet with dynamic behavior patterns
- Seamless integration with Chrome's new tab page
- Persistent pet state across browser sessions

## Technical Innovation

Some fun things I had to do while making the extension:

- Implemented a robust game engine architecture within Chrome extension constraints
- Designed an object-oriented class hierarchy for pet behaviors and interactions
- Created a persistent state management system that works across browser sessions
- Developed a modular component system for extensible pet features
- Reverse-engineered Google's account creation form UX to create a professional onboarding experience
- Replicated complex form animations and styling through DOM inspection and analysis

## Tech Stack

- **Architecture**: Custom OOP game engine design
- **Frontend**: HTML5, CSS3, JavaScript/TypeScript
- **Browser Extension**: Chrome Extension API
- **State Management**: Custom state machine implementation
- **Storage**: Chrome Storage API
- **Development Tools**: Chrome Developer Tools

## Setup

1. Download as .zip and extract files.
2. Go to chrome://extensions/.
3. Toggle on Developer Mode (top right corner).

![image](https://github.com/user-attachments/assets/faf5fd2b-6030-4337-abb0-97782a3b6609)

5. Click Load unpacked (top left corner).

![image](https://github.com/user-attachments/assets/2d175882-13f6-450b-adef-fa1bd251fa74)

7. Select the extracted folder for TabPet.
8. Open a new tab and set up your pet info.
9. Huzzah! From now on, your TabPet will appear on new tabs.

## Development

This project takes a creative spin on Chrome extension development, challenging traditional extension architecture by implementing a full game engine. The extension demonstrates proficiency in:

- Advanced object-oriented programming principles
- Game engine architecture design
- State machine implementation
- Chrome Extension architecture and APIs
- Frontend web development
- Complex system design patterns
- Browser storage and state persistence
- Cross-browser compatibility considerations
- Professional UI/UX design implementation
- Reverse-engineering and replicating complex web interfaces

## Technical Architecture

The project's unique architecture includes:

- Custom game loop implementation within extension constraints
- Object-oriented pet behavior system
- Event-driven interaction handling
- Persistent state management across browser sessions
- Modular component system for pet features

## Behind the Scenes

### Starting out

The biggest part of the vision was that every time you open a new tab, your TabPet would pop up on the new page. Unfortunately, Google Extensions doesn't really support injecting scripting into the new tab page, and I really didn't want to re-create the new tab page entirely.

After endless experimentation, I discovered that there's a way to redirect extension users to a default page, so I decided to use that and direct them to google.com, which is as close as it gets to an actual new tab page.

Hooray! First part done.

### Onboarding

For the onboarding experience, I peeked into Google's account creation form. Inspecting their DOM structure, CSS animations, and interaction patterns, I felt like I was really just deciphering the magic behind a beloved web browser. Afterwards, I adapted these patterns to create a nice polished experience for customizing your TabPet. My favorite part was probably reproducing the ripple animation effect when you click on a button.

### The Game Engine Challenge

When I started this project, I quickly realized that Chrome extensions really aren't built for building game-like applications. I had to get creative with the architecture and think about how to design my game engine and create a custom game loop that runs efficiently within the extension. I'm happy with what I ended up with, and I think that it was really fun designing the infrastructure of the game engine without using pre-built libraries and really just thinking for myself.

Wanting the pet to feel alive and responsive, I implemented a state management system that tracks various attributes like energy and mood, as well as creating little Easter Eggs / secret interactions that happen as the user plays around with the gerbil. Try making the gerbil run across the search bar a few times, for example -- you might find your little pet uncover some serious literary talent!
