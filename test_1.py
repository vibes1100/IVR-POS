# -- coding: utf-8 --
"""
Created on Fri Jul 17 12:12:51 2020

@author: ANISH
"""

import speech_recognition as sr
import pyttsx3
from gtts import gTTS
import psycopg2

x = 5
stop_words = ['i','want','to','order','and','some']

engine = pyttsx3.init('sapi5') 
voices = engine.getProperty('voices') 
engine.setProperty('voice', voices[0].id) 

def speak(audio):
    
    engine.say(audio)
    engine.runAndWait()

def myCommand(param):
    
    "listens for commands"
    r = sr.Recognizer()
    
    with sr.Microphone() as source:
        print(param)
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source, duration=1)
        audio = r.listen(source)
    
    try:
        command = r.recognize_google(audio).lower()
        print('You said: ' + command + '\n')
    
    #loop back to continue to listen for commands if unrecognizable speech is received
    except sr.UnknownValueError:
        print('....')
        command = myCommand(param);
    
    return command

def printer(current_pointer,p_type):
    
    rows = current_pointer.fetchall()
    
    if p_type == 1:
        print('Cat  |\t\n id  |\t','Category name',"\t|")
    elif p_type ==2:
        print('Cat  |\tSub Category\t|\n id  |\t','    name'," \t|")
    elif p_type ==3:
        print('Cat  |\t\n id  |\t','Item name',"\t|")
    else:
        print("Invalid")
    
    print("--------------------------")
    
    if p_type == 1 or p_type == 2:
        for row in rows:
            print(row[0],'  |\t',row[1],"    \t|")
    elif p_type == 3:
        for row in rows:
            print(row[0],'  |',row[2],"\t|")
    else : 
        print("error")

def parent_category_selector(cur_pointer):
    
    cur_pointer.execute("SELECT category_id AS id,category_name AS name FROM category_table WHERE category_id=parent_id")
    printer(cur_pointer,1)

def child_category_selector(cur_pointer,p_id):
    
    query = str("SELECT category_id, category_name FROM category_table WHERE parent_id IN (SELECT parent_id FROM category_table WHERE category_name ='" + str(p_id)+"') AND parent_id!=category_id")
    cur_pointer.execute(query)
    printer(cur_pointer,2)

def item_selector(cur_pointer,p_id):
   
    query = "SELECT * FROM items WHERE category_id IN (SELECT category_id FROM category_table WHERE category_name ='"  + p_id + "')"
    cur_pointer.execute(query)
    printer(cur_pointer,3)
    
def stopword_remover(text):
    req = []
    for word in text.lower().split():
        if word not in stop_words:
            req.append(word)
    return req

def db_searcher(att,cur_pointer):
    #attr = ",".join(att)
    x = ''
    for i in range(len(att)):
        x += "and '%"+att[i]+"%'"
    print(x)
    query = "SELECT * FROM items WHERE item_attributes LIKE '%" + att[0] + "%'"
    print(query)
    cur_pointer.execute(query)
    printer(cur_pointer,3)
    
try:
    conn = psycopg2.connect(database="postgres", user="postgres", password="hi", host="127.0.0.1", port="5432")
    #speak("Welcome to the system")
    
    cur = conn.cursor()
    
    parent_category_selector(cur)
    #speak("Which category would u like to choose ?")
    
    inp = "Bakery"
    print("\n{}\n\n".format(inp))
    child_category_selector(cur,inp)
    
    inp = "Bread"
    print("\n{}\n\n".format(inp))
    item_selector(cur,inp)
    
    inp = "I want britania white bread"
    db_searcher(stopword_remover(inp),cur)
    
    
    
except psycopg2.Error as e:
    print("I am unable to connect to the database")
    print (e)
    print (e.pgcode)
    print (e.pgerror)
    print (traceback.format_exc())
    

"""
rice_quant = 10
req=[]

req_list={}
stock = {'rice':10 , 'sauce':4 ,'sooji':5 , 'maida':5, 'aata':10 ,'pasta':12 ,'lasagne sheets':10,'cheese':10}
print(stock)

speak('What would you like to order ?')
pr = myCommand('What would you like to order ?')
pr = pr.split(" ")
print(pr)

stop_words = ['i','want','to','order','and','some']

for word in pr:
    if word not in stop_words:
        req.append(word)
print(req)

for i in range(len(req)):
    speak('How much '+ str(req[i]))
    quant = myCommand('How much '+ str(req[i]))
    req_list[req[i]] = req_list.get(req[i],int(quant))
    

print(req_list)

av = []
nq = []
lq = []

for word in req_list.keys():
    
    if word in stock.keys() and req_list[word] < stock[word]:
        text = "We have " + str(word) + " in stock"
        av.append(word)
        speak(text)
        print(text)
    
    elif word in req_list.keys() and word not in stock.keys():
        nq.append(word) 

    
    elif word in req_list.keys() and word in stock.keys() and req_list[word] > stock[word]:
        lq.append(word) 
        
if len(nq)!= 0:
    text_not_there = "We will have to order " + " ".join(nq[:-1]) + ' and ' + nq[-1]
    speak(text_not_there)

for word in lq:

    text_stock_less = "Sorry u ordered " +str(req_list[word]) +" of " + word + " but we only have " + str(stock[word]) 
    speak(text_stock_less)
"""