# n8n integration contract

The visible Join frontend does not render an AI agent. n8n owns the background workflow.

## Create an AI-generated task

Write the generated task to Firebase at `tasks.json`:

```json
{
  "title": "Short generated title",
  "description": "Generated description\n\nThis ticket was AI-generated.",
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
  "subtasks": []
}
```

## Update the daily counter

After successfully creating a task, n8n writes the current integer count to:

```text
emailRequestUsage/YYYY-MM-DD
```

The stakeholder page switches to the limit state at `10`.

## Required workflow order

1. Receive email.
2. Read today's counter.
3. Stop AI task creation at 10.
4. Ask the AI for structured ticket data.
5. Validate category, priority and deadline.
6. Create the Firebase task with `status: "triage"`.
7. Increment the daily counter.
8. Send confirmation or limit email.
