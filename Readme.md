#.env
SUPABASE_URL
https://ejewcztapalrpripfrwz.supabase.co
SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZXdjenRhcGFscnByaXBmcnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDMzMTQsImV4cCI6MjA2MzM3OTMxNH0.VKmiDUSSFaPdC28W1-ab20Kku05CPHN7TzQIFFkVEFg
slack url
https://hooks.slack.com/services/T08T8J12QKF/B08T4E0H422/NyrRvvvr5or9CV651i5t4Gh

Postman commands
Base URL: http://localhost:4000

 1. Add Todo via Slack
URL: http://localhost:4000/slack/add
Method: POST
Request Body (Slack sends application/x-www-form-urlencoded):
text=Finish reading notes&user_name=alice

 2. Delete Todo via Slack
URL: http://localhost:4000/slack/delete
Method: POST
Sample Slack Slash Command:
/todo delete 1
Request Body:
text=1&user_name=alice

 3. Update Todo via Slack
URL: http://localhost:4000/slack/update
Method: POST
Request Body:
text=1 Read project brief&user_name=alice

 4. Get All Todos via Slack
URL: http://localhost:4000/slack/todos
Method: POST
Request Body:
text=&user_name=alice

 5. Summarize Todos via Slack
URL: http://localhost:4000/slack/summary
Method: POST


