# Teletype - chat application

Teletype is a real-time chat application built with Next.js 14, Prisma ORM, Atlas MongoDB, Websockets using socket.io, Material UI, and Clerk JS.

Explore the live demo, an auto-deploy from the master branch: [Teletype](https://teletype-sandy.vercel.app/)

## Technologies Used

- **Next.js 14:** A React framework for building web applications.

- **Prisma ORM:** A database toolkit and query builder for Node.js and TypeScript.

- **Atlas MongoDB:** A cloud-hosted MongoDB service for scalable and secure database storage.

- **Socket.io:** A library that enables real-time, bidirectional, and event-based communication.
  
- **Zustand:** A small, fast, and scalable state management library for React.

- **Material UI:** A React UI framework that provides a set of high-quality React components.

- **Clerk JS:** A user authentication and identity management service.

## Features

- **Private Chats:** Users can select other app users from an autocomplete dropdown to create private chats. The messaging feature is instant thanks to Websockets.

- **Real-time Status Updates:** Users can see the current status of their conversation partners in real-time. The status includes whether the user is online in the current chat, online in another chat, or offline. If the conversation partner is not in the current chat or is offline, the user sees how much time has passed since their last visit to that chat, updated in real-time (e.g., seconds, minutes, hours).
  
- **Chat List Display and Message Preview**: On the chat list page, the user sees the following information: user avatar, their current online/offline status (see Online Status Indicators), username or email address, time of the last message, the beginning of the last message (truncated with an ellipsis in a single line), and the count of unread messages. 
  
- **Online Status Indicators:** In the chat list, users who are currently online are highlighted with a green circle around their avatars. Clerk JS account images are used as avatars by default.
  
- **Unread Message Indicator and Scrolling**: When a user enters a chat and there are unread messages that don't fit on the initial screen, they see a button indicating the number of such messages. This count dynamically changes as the user scrolls to these messages. Additionally, by clicking this button, the user is automatically scrolled to the last received message.
  
- **Message Variety**: Messages can consist of text-only, images-only, or a combination of both text and images, offering users a flexible and dynamic communication experience. Image previews are displayed alongside text in the conversation, enriching the visual aspect of the messages. Additionally, messages can be composed of text with emojis or an unlimited number of emojis without accompanying text, providing users with expressive and diverse communication options.

- **Image Exchange**: Users can seamlessly exchange images within chats. An icon for expanding an image to fullscreen is located in the bottom right corner of the image, and a corresponding icon allows users to reduce the image back to its original size.

- **Image Previews**: When selecting an image from the device's memory before sending it, a preview appears next to the send button. The maximum size for uploaded images is limited to 1MB.
  
- **Photo Capture and Sending**: Users can capture photos by clicking on the camera icon, and they can seamlessly send the captured photos as messages. For mobile devices, users have the capability to switch between the main and front-facing cameras.

- **Message Context Menu**: Click or tap on a message reveals a context menu for that specific message. For the message author, there is an option to edit the message. Users can also reply to specific messages. In a reply, the original author, the first line of its content for text messages, and the timestamp of its sending are displayed. Clicking or tapping on the area displaying the replied message smoothly scrolls the screen to that message.
  
   - **Reactions** for Non-Author Users: Non-authors of messages can add emoji reactions to messages.
     
  Options for All Messages:

   - **Delete**: Allows users to delete the message. Deletion options include removal by the message sender only or by both chat participants.
   - **Select**: Activates multi-select mode for both chats and messages.
   - **Edit**: Enables users to edit their own messages.
   - **Reply**: Users can reply to specific messages.

  Additional option for Image Messages and Photo messages: **Download**.

- **Unified Chat and Message Selection**: Users can enter multi-select mode for both chats and messages. For chats, it is activated by long-pressing a chat, and for messages, users can choose the "Select" option from the context menu. In this mode, users can manually select individual chats/messages or use the "Select all" button to choose all chats/messages at once for deletion. Deletion options include removal by the message sender only or by both chat participants.

- **Read and Sent Message Indicators**: Messages feature indicators for sent and read status, updating in real-time.

- **Emoji Support:** Users can now include emojis in their messages, either along with text or as standalone emoji messages.
  
- **Message Persistence:** Unread messages are stored in the database and removed after getting read and 3 days after creation. Messages are deleted due to the usage of the free Atlas plan with limited storage.

- **Profile Editing Page:** Users can edit their profile by clicking the button in the drawer, opened by pressing the "Menu" button. On this page, users can edit their username and profile photo (zoom, rotate, crop photo).

- **Responsive Design:** Teletype has an adaptive design, making it suitable for use on both desktop and mobile devices.

- **Multiple Chat Selection:** Users can long-press on a chat to enter multi-select mode, enabling them to delete multiple chats simultaneously.
  
- **Error Notification System:** The application includes a global error notification system to inform users about errors.
  
- **Authentication:** Users can sign in using their Google accounts or with a username and password via Clerk JS.

## Contributions

Contributions to Teletype are welcome! Feel free to open issues, suggest improvements, or submit pull requests.

## License

Teletype is licensed under the [MIT License](LICENSE).

