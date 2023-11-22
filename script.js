body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: #111; /* Dark background color */
  color: #fff; /* Text color */
  font-family: 'Cinzel', serif; /* Custom font */
}

.wheel-container {
  text-align: center;
}

.wheel {
  width: 300px;
  height: 300px;
  border: 2px solid #800000; /* Dark red border color */
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #000; /* Black background color */
}

.section {
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 100% 100%, 0% 100%);
  transform-origin: 50% 100%;
  transform: rotate(var(--deg)) skewY(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--segment-color, #800000); /* Dark red section color */
}

.section img {
  max-width: 80%; /* Adjust the maximum width of the images */
  max-height: 80%; /* Adjust the maximum height of the images */
  border-radius: 50%; /* Optional: Add a border-radius for circular images */
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #800000; /* Dark red button color */
  color: #fff; /* White button text color */
  border: none;
  border-radius: 5px;
}

.prize-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #800000; /* Dark red alert background color */
  color: #fff; /* White alert text color */
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out; /* Adjust the duration as needed */
  font-family: 'Cinzel', serif; /* Custom font */
}
