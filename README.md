# JavaScript2

Postly | Social Media Application

---

## **Description**

This project is a front-end social media application built as part of the JavaScript 2 course at Noroff.

The application interacts with the Noroff Social API and allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on posts. Users can also follow/unfollow other users, search posts, view profiles, comment on post, reply to a comment
and react to a post.

---

## **Table of Contents**

---

- [Built With](#BuiltWith)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#License)
- [Contact](#Contact)
- [Resources/References](#Resources/References)
- [AI-Log](#AI-Log)

---

## **Built With**
- HTML

- CSS

- Vanilla JavaScript (ES6 Modules)

- Noroff Social API (v2)

---

## **Installation**
Follow this steps to run the project locally
1. Clone the repository

```bash
  git clone https://github.com/Theanordhoy/JavaScript2.git
```

2. Navigate to the project folder

```
 cd JavaScript2
```

3. Open the project in code editor (VS Code)

```
 code .
```

4. Start the project using Live Server.

- Open index.html using Live Server Extension
- The site will load and connect to Noroff API automatically.

---

## **Usage**

After starting the project:
- Register or log in to your account
- View all posts in the feed. Search for posts, create post or edit/delete posts. 
- Click on a post to view it individually, comment, react and reply.
- Visit your profile page to see your posts, edit/delete your posts, see how many followers and following, logout.
- Visit other users profiles by clicking their name, view their posts, see how many followers and following, follow/unfollow profile. 

## **Licence**
This project is licensed under the MIT License. 

---

## **Contact**
Thea Nordhøy Kristensen

thea.n.k@hotmail.com

Emilie Sofie Fosmo

emilie.fosmo@hotmail.com

--- 

## **Resources/References**

### Fonts
[Fonts GoogleFonts](https://fonts.google.com/)

### Favicon
[Favicon.io - Generator](https://favicon.io/)

### Icons
[Icons Fontawesome](https://fontawesome.com/)

## **AI-Log**

We started working on the CA on 06.02.26 and therefore initially used the “old” version of the assignment. We began using the updated version on 17.02.26 after our teacher informed us that the CA had been updated.
Note that the dates between 06.02.26 and 17.02.26 are approximate and may not reflect the exact date or exactly what we asked for. We have tried to recall when and where we may have used it, but we cannot guarantee that we have identified everything since we did not know about this log for most of the time spent on the CA.

- **Tool used:** ChatGPT
- **Date:** 06 February 2026
- **Purpose:** Name for our social post application. 
- **Outcome:** ChatGPT generated our application name. 
---
- **Tool used:** ChatGPT
- **Date:** 06 February 2026
- **Purpose:** Hovercolor to primary-color. 
- **Outcome:** ChatGPT generated a hovercolor.
---
- **Tool used:** ChatGPT
- **Date:** 09 February 2026
- **Purpose:** Script tag placement 
- **Outcome:** ChatGPT explained the differences from having it in the head and in the body. 
---
- **Tool used:** ChatGPT
- **Date:** 10 February 2026
- **Purpose:** Input-id matching label for-attribute on forms created with JavaScript.
- **Outcome:** Asked if it is okay to put for example “postTitleInput.id = …” as we are used to doing with classes when building containers of content with JavaScript.
---
- **Tool used:** ChatGPT
- **Date:** 12 February 2026
- **Purpose:** Project structure (ES6 modules)
- **Outcome:** Got some clarification on how to structure with ES6 modules.
---
- **Tool used:** ChatGPT
- **Date:** 16 February 2026
- **Purpose:** a-tag inside another a-tag
- **Outcome:** ChatGPT explained that you can not have an a-tag inside another a-tag
---
- **Tool used:** ChatGPT
- **Date:** 16 February 2026
- **Purpose:** Connect reply to the current comment.
- **Outcome:** ChatGPT suggested using .filter() to check if the replyToId matched comments id. 
---
- **Tool used:** ChatGPT
- **Date:** 16 February 2026
- **Purpose:** Debug image url error from posts created by other users.
- **Outcome:** The error was caused by an incorrect image url. 
---
- **Tool used:** ChatGPT
- **Date:** 17 February 2026
- **Purpose:** Debug PUT request (follow/unfollow)
- **Outcome:** (Had to debug with teacher as well.) Initially we did not check the logged in user correctly. We ‘only’ checked the first follower, not if ‘any’ of the followers was logged in. So when we debugged we got the idea to use some(), and went to module 3 “Array Methods” in JavaScript 1 and figured it out.
---
- **Tool used:** ChatGPT
- **Date:** 17 February 2026
- **Purpose:** Debug follow/unfollow functionality
- **Outcome:** In our code we wanted to check  if loggedInUser already followed a specific profile. After debugging with ChatGPT we discovered that we only checked  the first follower in the array. ChatGPT suggested using .some() to check if ‘some’ of the followers in the array are loggedInUser. 
---
- **Tool used:** ChatGPT
- **Date:** 18 February 2026
- **Purpose:** Debug path error when deploying page
- **Outcome:** When we deployed the page we got a path error and debugged it using ChatGPT
---
- **Tool used:** ChatGPT
- **Date:** 19 February 2026
- **Purpose:** Name and email regex validation.
- **Outcome:** Got help with generating an regex for email and name validation after talking to the teacher. 


