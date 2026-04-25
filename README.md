# ⚡ VoltKenya - EV Charging Station Management System

##  Overview
VoltKenya is a web-based platform that connects electric vehicle users to 
charging stations. Users can find active charging ports near 
their location and make payments, while admins manage ports and monitor 
payment activity through a dedicated dashboard.

##  Features

###  User Side
- Search for charging stations by location
- View available (active) ports near them
- Select a port and proceed to payment
- Inactive ports are blocked from selection

###  Admin Side
- Secure admin login
- View all charging stations on an interactive map
- Add new charging ports with GPS coordinates
- Activate or deactivate ports
- View and filter all payment records by port
- Direct link to the user page for preview

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Leaflet.js (interactive maps)
- **Backend:** Node.js, Express.js
- **Database:** MySQL (via XAMPP)
- **Libraries:** express-session, mysql2, cors, dotenv, body-parser

## Installation & Setup

### Prerequisites
- Node.js installed
- XAMPP installed (Apache + MySQL)

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/Bianca-nj/VoltK.git
   cd VoltK
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL**

4. **Set up the database**
   - Open phpMyAdmin at `http://localhost/phpmyadmin`
   - Create a database called `volt_kenya`
   - Import the provided `volt_kenya.sql` file
     
5. **Create a `.env` file** in the project root:
```
   SESSION_SECRET=your_secret_here
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
```

6. **Run the server**
```bash
   node server.js
```

7. **Open in browser**
   - User page: `http://localhost:5000/index.html`
   - Admin login: `http://localhost:5000/login.html`

## Project Structure
- `server.js` — Main server and API routes
- `public/`
  - `login.html` — Admin login page
  - `admin.html` — Admin dashboard (ports, payments, map)
  - `index.html` — User-facing station search page

## Admin Access
Register your admin credentials in the `.env` file. These are never 
stored in the codebase for security.

##  Notes
- Make sure XAMPP is running before starting the server
- Ports must be marked **active** for users to select them
- GPS coordinates can be set by clicking directly on the map when adding a port

##  Future Improvements
- M-Pesa payment integration
- Real-time port availability updates
- User accounts and charging history
- Mobile app version
- SMS notifications when charging is complete


