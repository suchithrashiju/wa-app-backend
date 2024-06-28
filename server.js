/**
 * CRM - Business Whatsapp  - Backend
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: This project is a backend application designed to support business communication on the WhatsApp platform. It provides a robust backend infrastructure with essential functionalities for managing and automating business interactions through WhatsApp.

Key Features:
- Integration with WhatsApp Business API for seamless communication
- User authentication and authorization for secure access
- Message handling: send and receive WhatsApp messages
- Customer management: store and manage customer information
- Automation capabilities: automate responses and workflows
- Analytics and reporting: gather insights on messaging activity

The Business Whatsapp - Backend project empowers businesses to leverage the popularity and convenience of WhatsApp to enhance customer engagement and streamline their communication processes.

 //The Date and Changes made sections are duplicated in each updated comment entry
 * Last Updated: 
 * 
 * Changes:
 * 
 * Date: 
 * Functions: 
 * // Changed Function Names
 * - 
 * 
 * Changes Made:
 * // Changes
 * - 
 

*/

// Import required dependencies and set up the server
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./src/utils/HttpExceptionUtils");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const http = require("http");
const https = require("https");
const fs = require("fs");

//Module routes
const tagRouter = require("./src/routes/v1/tagRoutes");
const authRouter = require("./src/routes/v1/authRoutes");
const userRouter = require("./src/routes/v1/userRoutes");
const contactRouter = require("./src/routes/v1/contactRoutes");
const savedResponseRouter = require("./src/routes/v1/savedResponseRoutes");
const templateRouter = require("./src/routes/v1/templateRoutes");
const chatRouter = require("./src/routes/v1/chatRoutes");
const businessProfileRouter = require("./src/routes/v1/settings/businessProfileRoutes");
const profileRouter = require("./src/routes/v1/settings/profileRoutes");
const personRouter = require("./src/routes/v1/personRoutes");
const messageRouter = require("./src/routes/v1/messageRoutes");
const chatAssignmentEventRouter = require("./src/routes/v1/chatAssignmentEventRoutes");
const chatTaggingEventRouter = require("./src/routes/v1/chatTaggingEventRoutes");
const markAsReceivedRouter = require("./src/routes/v1/markAsReceivedRoutes");
const webhookRouter = require("./src/routes/v1/webhookRoutes");
const mediaRouter = require("./src/routes/v1/mediaRoutes");

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 80);

// Version 1 API Routes
app.use(`/api/v1/tags`, tagRouter);
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);

app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/saved_responses", savedResponseRouter);
app.use("/api/v1/templates", templateRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/settings/business", businessProfileRouter);
app.use("/api/v1/settings/profile", profileRouter);
app.use("/api/v1/persons", personRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/chat_assignment_events", chatAssignmentEventRouter);
app.use("/api/v1/chat_tagging_events", chatTaggingEventRouter);
app.use("/api/v1/mark_as_received", markAsReceivedRouter);
app.use("/api/v1/webhooks", webhookRouter);
app.use("/api/v1/media", mediaRouter);

// starting the server
/*
app.get("/api/v1", (req, res) => {
  res.send("This is the API v1 endpoint");
});
*/

// 404 error
app.all("*", (req, res, next) => {
  const requestedUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("Requested URL:", requestedUrl);

  const err = new HttpException(404, requestedUrl + " Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

app.listen(port, () => console.log(` Server running on port ${port}!`));

/*

// for testing purpose
// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header with a 200 OK status and text/plain content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the "Hello, World!" message to the client
  res.end('Hello, World PORT-3003 !\n');
});

// Listen on port 3003
//const port = 3003;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

*/
module.exports = app;
