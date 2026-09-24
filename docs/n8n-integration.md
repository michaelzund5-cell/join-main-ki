# n8n integration and test guide

The visible Join frontend does not render an AI agent. n8n owns the background workflow.

## Import and configuration

1. Start n8n with `npx n8n@latest` and open `http://localhost:5678`.
2. Import `n8n-workflows/email-issue-collector.json`.
3. Reconnect the Gmail OAuth credential in **Gmail Trigger** and the three Gmail response nodes.
4. Add the Gemini API key in **Gemini-Ticket analysieren**.
5. Check the Firebase URLs and publish the workflow.

The export contains no passwords, OAuth tokens or API keys. Node names are descriptive so every processing step can be identified in an execution.

## Firebase task format

Generated tasks are written to `tasks.json`:

```json
{
  "title": "Short generated title",
  "description": "Generated description",
  "category": "Technical Task",
  "priority": "medium",
  "date": "31/08/2026",
  "status": "triage",
  "source": "email",
  "aiGenerated": true,
  "creator": {
    "email": "stakeholder@example.com",
    "type": "external"
  },
  "assigned": [],
  "subtasks": [
    {
      "id": 1780000000001,
      "title": "First step",
      "text": "First step",
      "completed": false
    }
  ]
}
```

## Daily request limit

After a task is created, n8n writes the current integer count to:

```text
emailRequestUsage/YYYY-MM-DD
```

The workflow checks this value before Gemini is called. At 10 requests it skips Gemini and Firebase task creation, which protects costs. The stakeholder page displays the same counter and switches to its limit state at 10.

## Workflow behavior

1. Receive and normalize an email.
2. Read today's request count and check the limit.
3. Ask Gemini for structured ticket data only when capacity remains.
4. Validate category, priority, deadline and subtasks.
5. Create the Firebase task with `status: "triage"`.
6. Increment the daily counter.
7. Send a confirmation, limit notice or error email.

Dates are normalized to `DD/MM/YYYY`. Missing dates stay empty; invalid or past dates are replaced with today's date in the `Europe/Zurich` timezone. Subtasks are stored separately and removed from the description so the ticket detail view does not duplicate them.

## Quick acceptance test

- Send a new email with the subject `Join feature request` and include a title, description, deadline and several subtasks.
- In n8n **Executions**, verify that the green path reaches **Erfolg bestätigen**.
- Verify the task appears in Join under **Triage**, its subtasks appear under **Subtasks**, and the daily counter increases by one.
- Repeat with an invalid or past date and confirm the displayed date is corrected.
- Temporarily set today's counter to 10 and verify Gemini and Firebase task creation are skipped and the sender receives the limit notice.
