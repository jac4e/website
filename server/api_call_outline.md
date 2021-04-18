## Debug

No auth what so ever, will be used as a means to check server status

| Call | URI | Body | Description |
| --- | --- | --- | --- |
| GET | /ping | N/a | ping! |

## Contact

Must be from client

| Call | URI | Body | Description |
| --- | --- | --- | --- |
| post | /contact/send | {name, email, subject, message} | validates form, sends to me and returns result |