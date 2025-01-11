# Seat Reservation System

This project is a seat reservation system implemented using **Next.js**, **TypeScript (TSX)**, and **TailwindCSS**. Below is a detailed overview of the application's functionality and instructions on how to set it up.

---
## Live Demo

Check out the live version of the project by clicking the link below:

[Seat Reservation Website](https://seat-reservation-app-mhsnarsln09s-projects.vercel.app/)

## Features

1. **Non-Selectable Seats**:
   - The first 10 seats are marked as unavailable and cannot be selected.
2. **Dynamic Tooltips for Occupied Seats**:
   - When hovering over an occupied seat, a tooltip displays the occupant's name.
   - User data is fetched from an external API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).
3. **Maximum Seat Selection Limit**: Users can select a maximum of 3 seats per reservation.
4. **Real-Time Price Calculation**:
   - Each seat costs **1,000 TL**.
   - The total cost is displayed and updated dynamically.
5. **Validation for Occupied Seats**:
   - Attempting to select an occupied seat triggers a warning message.
6. **Persistent Selection**:
   - Selected seats are saved and remain consistent after a page refresh.
7. **Session Timeout Warning**:
   - After selecting a seat, a 30-second inactivity timer starts.
   - If no action is taken, the user is prompted to continue.
   - If no response is received, the page refreshes and clears all selections.
8. **Form Validation**:
   - Input fields are required and validated to ensure no empty submissions.
9. **Reservation Confirmation**:
   - Clicking the "Complete Reservation" button triggers a success message confirming the reservation.

---

## Technologies Used

- **Next.js**: For server-side rendering and React-based UI development.
- **TypeScript**: Ensures type safety throughout the project.
- **TailwindCSS**: Simplifies styling and ensures responsiveness.

---

