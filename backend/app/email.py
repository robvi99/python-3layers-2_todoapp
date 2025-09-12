import smtplib
from email.mime.text import MIMEText
from .config import config

def send_completion_email(email_to: str, todo_title: str):
    msg = MIMEText(f"Your todo '{todo_title}' has been completed!")
    msg['Subject'] = "Todo Completion Notification"
    msg['From'] = config.EMAIL_FROM
    msg['To'] = email_to

    with smtplib.SMTP(config.SMTP_SERVER, config.SMTP_PORT) as server:
        server.starttls()
        server.login(config.SMTP_USER, config.SMTP_PASSWORD)
        server.sendmail(config.EMAIL_FROM, email_to, msg.as_string())