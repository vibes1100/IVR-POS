import psycopg2

conn = psycopg2.connect(database="IVR_POS", user="postgres", password="hi", host="127.0.0.1", port="5432")
print("Database Connected....")

cur = conn.cursor()

# Creating the table
cur.execute("Select * from authentication")
rows = cur.fetchall()
usernames = []
passwords = []

for row in rows : 
    usernames.append(row[0])
    passwords.append(row[1])


username = input("Username : ")
if username in usernames:
    print("Hi enter ur password")
    
password = input("Password : ")
if password in passwords:
    print("Welcome back", username)

