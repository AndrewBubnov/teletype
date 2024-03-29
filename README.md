# Teletype - chat application

Teletype is a full-stack application that provides real-time chat functionality. It boasts a responsive design, catering to various devices and screen sizes and built with Next.js 14, Prisma ORM, Atlas MongoDB, Websockets using socket.io, and Clerk JS.

Teletype offers a responsive design that ensures a seamless experience across different devices.

In desktop mode, Teletype functions as a single-page application. The user interface comprises a chat list on the left and the active (selected) chat on the right. These sections are resizable via a draggable circular handle on the dividing line between them.

For mobile devices, Teletype utilizes routing, allowing smooth transitions between the chat list and active chat pages.

Explore the live demo, an auto-deploy from the master branch: [Teletype](https://teletype-sandy.vercel.app/)

(please take into consideration that free cloud websocket server spins down after 15min of inactivity, so some functions can fail)

## Technologies Used

- **Next.js 14:** A React framework for building web applications.

- **Prisma ORM:** A database toolkit and query builder for Node.js and TypeScript.

- **Atlas MongoDB:** A cloud-hosted MongoDB service for scalable and secure database storage.

- **Socket.io:** A library that enables real-time, bidirectional, and event-based communication.
  
- **Zustand:** A small, fast, and scalable state management library for React.

- **Clerk JS:** A user authentication and identity management service.

_Note:_ Initially, the project was created using Material UI, but later, this framework was removed from the application and replaced with custom components. This resulted in a 1.5x reduction in the bundle sizes of the pages.

## Features

- **Private Chats:** Users can select other app users from an autocomplete dropdown to create private chats. The messaging feature is instant thanks to Websockets.

- **Real-time Status Updates:** Users can see the current status of their conversation partners in real-time. The status includes whether the user is online in the current chat, online in another chat, or offline. If the conversation partner is not in the current chat or is offline, the user sees how much time has passed since their last visit to that chat, updated in real-time (e.g., seconds, minutes, hours).
  
- **Chat List Display and Message Preview**: On the chat list page, the user sees the following information: user avatar, their current online/offline status (see Online Status Indicators), username or email address, time of the last message, the beginning of the last message (truncated with an ellipsis in a single line), and the count of unread messages. 
  
- **Online Status Indicators:** In the chat list, users who are currently online have a a pulsing green circle on their avatars. Clerk JS account images are used as avatars by default.
  
- **Unread Message Indicator and Scrolling**: When a user enters a chat and there are unread messages that don't fit on the initial screen, they see a button indicating the number of such messages. This count dynamically changes as the user scrolls to these messages. Additionally, by clicking this button, the user is automatically scrolled to the last received message.
  
- **Message Variety**: Messages can consist of text-only, images-only, or a combination of both text and images, offering users a flexible and dynamic communication experience. Image previews are displayed alongside text in the conversation, enriching the visual aspect of the messages. Additionally, messages can be composed of text with emojis or an unlimited number of emojis without accompanying text, providing users with expressive and diverse communication options.

- **Image Exchange**: Users can seamlessly exchange images within chats. An icon for expanding an image to fullscreen is located in the bottom right corner of the image, and a corresponding icon allows users to reduce the image back to its original size.

- **Image Previews**: When selecting an image from the device's memory before sending it, a preview appears next to the send button. The maximum size for uploaded images is limited to 1MB.
  
- **Photo Capture and Sending**: Users can capture photos by clicking on the camera icon, and they can seamlessly send the captured photos as messages. For mobile devices, users have the capability to switch between the main and front-facing cameras.

- **Chat Options Menu**: Each chat has a menu accessible by tapping on the three-dot icon in the top right corner. This menu provides options to clear the chat history or delete the entire chat.

- **Message Context Menu**: Click or tap on a message reveals a context menu for that specific message. For the message author, there is an option to edit the message. Users can also reply to specific messages. In a reply, the original author, the first line of its content for text messages, and the timestamp of its sending are displayed. Clicking or tapping on the area displaying the replied message smoothly scrolls the screen to that message.
  
   - **Reactions** for Non-Author Users: Non-authors of messages can add emoji reactions to messages.
     
  Options for All Messages:

   - **Delete**: Allows users to delete the message. Deletion options include removal by the message sender only or by both chat participants.
   - **Edit**: Enables users to edit their own messages.
   - **Reply**: Users can reply to specific messages.

  Additional option for Image Messages and Photo messages: **Download**.

- **Real-time Indication**: Users can observe when their conversation partner is actively typing a message. The "is typing..." indicator disappears if the typing user pauses for more than 5 seconds and resumes upon continuing typing.

- **Unified Chat and Message Selection**: Users can enter multi-select mode for both chats and messages via a long tap. In this mode, users can manually select individual chats/messages or use the "Select all" button to choose all chats/messages at once for deletion. Deletion options include removal by the message sender only or by both chat participants.

- **Chat Sorting on Chat List Page**: Chats on the chat list page are sorted based on the timestamp of the last message in each chat.

- **Clickable Hyperlinks:** Links included in messages are presented as clickable hyperlinks, allowing users to easily navigate to external websites or specific content shared within the conversation.

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

