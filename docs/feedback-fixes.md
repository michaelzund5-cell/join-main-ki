# Feedback fixes

Implemented on 22 September 2026:

- Added a complete importable n8n workflow with descriptive German node names.
- Added a pre-Gemini daily limit check, Firebase counter update and limit response.
- Added explicit success, limit and error emails.
- Added deadline normalization and correction for invalid or past dates.
- Added unlimited structured subtask extraction without duplicating subtasks in the description.
- Fixed the Join task detail renderer so n8n subtasks using `title` are displayed.
- Improved the external creator, email and AI ticket metadata layout.
- Removed the nested vertical board scrollbar on tablet widths.
- Improved responsive behavior for the board, app header, login, stakeholder and legal pages.
- Added cache-busting versions to changed frontend assets.
- Documented workflow import, credentials and acceptance tests.

## Security note

The repository contains credential references only. Gmail OAuth tokens, Client Secrets and the Gemini API key must be configured locally in n8n and must not be committed.
