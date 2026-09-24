# Review checklist

This checklist maps every point from the review to a concrete implementation or required submission step.

| Review point | Status | Evidence |
|---|---|---|
| Descriptive, consistent workflow names | Implemented | `n8n-workflows/email-issue-collector.json` uses German action-oriented node names. |
| Check daily requests before Gemini | Implemented | `Heutigen Request-Zähler laden` → `Tageslimit auswerten` → `Unter Tageslimit?`. |
| Cost airbag at ten requests | Implemented | The false branch skips Gemini and sends `Tageslimit-Hinweis senden`. |
| Error handling | Implemented | HTTP/Code error outputs send a user notification and an internal diagnostic email. |
| Success confirmation | Implemented | `Erfolg bestätigen` runs only after Firebase and the counter update succeed. |
| Ticket and counter update | Implemented | Firebase task POST is followed by the daily counter PUT. |
| Invalid/past due date | Implemented | The validation node normalizes dates and replaces invalid/past dates with today's Zurich date. |
| All subtasks displayed separately | Implemented | Gemini returns an unlimited array; the workflow stores `title` and `text`; the frontend accepts both. |
| No subtasks duplicated in description | Implemented | The validation node removes trailing subtask blocks from the description. |
| Direct email compose on desktop/mobile | Implemented | Both buttons use the same prefilled Gmail compose URL. |
| Stakeholder/footer overflow and white strip | Implemented | Viewport widths and footer wrapping are corrected in `styles/stakeholder.css`. |
| Login responsiveness | Implemented | The mobile card, form spacing, buttons and footer use compact responsive rules. |
| Legal/privacy overlap | Implemented | Legal pages reserve space above the mobile navigation and wrap long content. |
| Mobile app logo and user | Implemented | The responsive app shell keeps the top logo and initials visible. |
| Board double vertical scrollbar | Implemented | The board page owns vertical scrolling; columns retain only horizontal scrolling. |
| External creator metadata | Implemented | Ticket details show the designed globe icon, badge, creator name and email. |
| AI badge width/icon | Implemented | The gradient sparkle asset is used and the mobile badge occupies its own full row. |
| Commit history/fork | Submission step | Existing history cannot honestly be recreated afterward. Future changes must be committed separately; fork before starting the next base-project extension. |

## Required before resubmission

1. Replace the GitHub project files with this version and commit the frontend fixes separately from the workflow/docs update.
2. Import the included workflow into n8n; reconnect Gmail and add the Gemini key.
3. Publish the imported workflow. Merely uploading the JSON to GitHub does not update the running n8n workflow.
4. Run every acceptance test in `docs/n8n-integration.md` and attach screenshots of successful executions if requested.
