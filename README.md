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

## 🛠️ Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Leaflet.js (interactive maps)
- **Backend:** Node.js, Express.js
- **Database:** MySQL (via XAMPP)
- **Libraries:** express-session, mysql2, cors, dotenv, body-parser
