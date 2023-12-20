# Teletype - chat application

Teletype is a real-time chat application built with Next.js 14, Prisma ORM, Atlas MongoDB, Websockets using socket.io, Material UI, and Clerk JS.

## Technologies Used

- **Next.js 14:** A React framework for building web applications.

- **Prisma ORM:** A database toolkit and query builder for Node.js and TypeScript.

- **Atlas MongoDB:** A cloud-hosted MongoDB service for scalable and secure database storage.

- **Socket.io:** A library that enables real-time, bidirectional, and event-based communication.

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

- **Image Previews**: When selecting an image from the device's memory before sending it, a preview appears next to the send button.

- **Emoji Support:** Users can now include emojis in their messages, either along with text or as standalone emoji messages.

- **Message Context Menu:** Click or tap on a message reveals a context menu for that specific message. Users can also reply to specific messages. In a reply, the original author, the first line of its content for text messages, and the timestamp of its sending are displayed. Clicking or tapping on the area displaying the replied message smoothly scrolls the screen to that message.

- **Message Reactions:** From the context menu, users can react to messages by adding emoji reactions. The message will display the reaction and the avatar of the user who added the reaction.

- **Message Deletion:** Users can delete messages from the context menu. Deletion options include removal by the message sender only or by both chat participants.
  
- **Message Persistence:** Messages for users not in the current chat are stored in the database and removed after they enter the chat and read the messages. Messages are deleted due to the usage of the free Atlas plan with limited storage.

- **Responsive Design:** Teletype has an adaptive design, making it suitable for use on both desktop and mobile devices.

- **Multiple Chat Selection:** Users can long-press on a chat to enter multi-select mode, enabling them to delete multiple chats simultaneously.
  
-  **Authentication:** Users can sign in using their Google accounts or with a username and password via Clerk JS.

## Contributions

Contributions to Teletype are welcome! Feel free to open issues, suggest improvements, or submit pull requests.

## License

Teletype is licensed under the [MIT License](LICENSE).

