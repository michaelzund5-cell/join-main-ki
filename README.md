# 📋 Join – AI-Powered Kanban Project Management

**Join** is a Kanban-based project management application extended with an AI-powered Issue Collector. Stakeholders can submit feature requests, bug reports, and technical tasks by email. An n8n workflow processes these emails with AI and automatically creates structured tickets on the Join board.

## 🤔 What is Join?

Join helps teams organize and visualize their work using the Kanban method. Tasks move through different workflow stages, making the current progress clearly visible.

This project was developed as part of the web development bootcamp at the Developer Akademie.

> ⚠️ **Important:** Join is an educational project and is not intended for production or commercial use. Continuous availability and reliability cannot be guaranteed.

## 🤖 AI-Powered Issue Collector

Stakeholders can submit requests by email without creating a Join account.

The AI workflow automatically:

* Receives new stakeholder emails
* Extracts the sender, subject, and message
* Analyzes the request with AI
* Generates a concise ticket title
* Creates a suitable ticket description
* Classifies the request as a Bug, User Story, or Technical Task
* Determines the priority: Urgent, Medium, or Low
* Extracts a deadline when one is included
* Creates the ticket in the **Triage** column
* Marks the ticket as **AI-generated**
* Stores the sender as the external ticket creator
* Sends a confirmation email after successful creation
* Moves successfully processed emails to the **erledigt** folder
* Moves failed requests to the **zu bearbeiten** folder

The email automation is implemented with **n8n**.

## 🚀 How to Use Join

Open the deployed project URL to access the Welcome page.

You can choose between two options:

### Create request

Stakeholders can select **Create request** to open a prepared email addressed to:

**[diepausenclowns@gmail.com](mailto:diepausenclowns@gmail.com)**

Describe the requested feature, technical task, or bug as clearly as possible. A deadline and suggested subtasks can be included but are optional.

After the email is received, the n8n workflow analyzes it and creates an AI-generated ticket in the **Triage** column.

### Member log in

Team members can select **Member log in** to access the internal Join application and manage the Kanban board.

## 📊 Join 360 Summary

The Join 360 dashboard provides an overview of:

* Tasks in To Do
* Completed tasks
* Urgent tasks
* Upcoming deadlines
* Total tasks on the board
* Tasks in progress
* Tasks awaiting feedback
* AI-generated email requests

The **Email Requests** counter is calculated dynamically from the tickets created through the AI Issue Collector.

## 🗂️ Board Columns

The board contains five workflow columns:

* **Triage** – New manual and AI-generated requests waiting for review
* **To Do** – Tasks ready to be worked on
* **In Progress** – Tasks currently being processed
* **Await Feedback** – Tasks waiting for feedback
* **Done** – Completed tasks

All newly created tasks initially appear in the **Triage** column.

## ✨ AI-Generated Ticket Identification

Tickets created from stakeholder emails display an **AI-generated ticket** marker.

This makes it easy to distinguish between:

* Tickets created manually by internal team members
* Tickets created automatically from stakeholder emails

The ticket details also show whether the creator is an internal user or an external stakeholder.

## 📧 Daily Request Limit

The AI Issue Collector accepts a maximum of **10 automatically generated requests per day**.

The current usage is displayed on the stakeholder landing page.

When the daily limit has been reached:

* No additional AI-generated ticket is created
* The stakeholder is informed about the daily limit
* The received email can still be reviewed manually
* The AI service is protected against excessive API usage and unexpected costs

## 👥 Creating Contacts

To create a contact:

1. Open the **Contacts** section
2. Select **New contact**
3. Enter the required information
4. Save the contact

Contacts can then be assigned to tasks.

## ➕ Creating Tasks Manually

To create a task manually:

1. Open the Board or Add Task section
2. Select the appropriate add button
3. Enter the title and description
4. Select a category
5. Choose a priority
6. Set a due date
7. Assign contacts
8. Add optional subtasks
9. Save the task

Manually created tasks are initially placed in **Triage**.

## 🔄 Moving Tasks

Tasks can be moved between columns using drag and drop.

On mobile devices, the available movement controls can be used instead.

When an externally created ticket changes its status, the creator can be notified by email through n8n.

## 🗑️ Deleting Tasks

Completed or unnecessary tasks can be deleted from the ticket details.

> ⚠️ **Caution:** Deleting a task permanently removes it from the board and cannot be undone.

## 🧪 Demo Instructions

To test the complete AI workflow:

1. Make sure the n8n instance is running
2. Make sure the workflow is published and active
3. Send a new email to `diepausenclowns@gmail.com`
4. Wait for the Gmail Trigger to detect the email
5. Open the Join board
6. Check the **Triage** column
7. Open the generated ticket and verify its AI marker
8. Check whether the Email Requests counter increased
9. Check whether the sender received a confirmation email

> The website can run independently, but automatic email processing only works while the n8n workflow is running on an available n8n instance.

## ⚙️ Technical Components

The project uses:

* HTML5
* CSS3
* JavaScript
* Firebase Realtime Database
* n8n workflow automation
* Gmail OAuth2
* Google Gemini API
* Git and GitHub

Additional information about the automation and data structure is available in:

```text
docs/n8n-integration.md
```

The exported n8n workflow is included in the GitHub repository as a JSON file without credentials.

## 🔐 Security

Sensitive information must never be committed to GitHub, including:

* Gmail credentials
* OAuth Client Secrets
* Gemini API keys
* Firebase private credentials
* n8n encryption keys
* Environment files containing secrets

These files and values must be excluded through `.gitignore` or configured directly in the relevant service.

## ❓ Questions

For questions regarding Join, contact:

**[m.arnoldy@outlook.de](mailto:m.arnoldy@outlook.de)**

---

**Enjoy using Join and the AI-powered Issue Collector!** 🚀
