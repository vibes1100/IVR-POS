# -*- coding: utf-8 -*-
"""
Created on Fri Jul 17 12:12:51 2020

@author: ANISH
"""
import speech_recognition as sr
import pyttsx3
from gtts import gTTS
from nltk import word_tokenize
import psycopg2
import eel

def dbConnect():
    conn = psycopg2.connect(database="postgres", user="postgres", password="hi", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    return cur

@eel.expose
def eel_printer():
    cur = dbConnect()
    return parent_category_selector(cur)

def speak(audio):
    engine = pyttsx3.init('sapi5') 
    voices = engine.getProperty('voices') 
    engine.setProperty('voice', voices[1].id) 
    engine.say(audio)
    engine.runAndWait()
    
@eel.expose
def myCommand(param="Item name"):
    
    "listens for commands"
    r = sr.Recognizer()
    
    with sr.Microphone() as source:
        print(param)
        r.pause_threshold = 0.5
        r.adjust_for_ambient_noise(source, duration=0.5)
        audio = r.listen(source)
    
    try:
        command = r.recognize_google(audio).lower()
        print('You said: ' + command + '\n')
    
    #loop back to continue to listen for commands if unrecognizable speech is received
    except sr.UnknownValueError:
        print('....')
        command = myCommand(param);
    
    return command

def printer(current_pointer,p_type,quantity=0):
    
    rows = current_pointer.fetchall()
    
    if p_type == 1:
        print('Cat  |\t\n id  |\t','Category name',"\t|")
    elif p_type ==2:
        print('Cat  |\tSub Category\t|\n id  |\t','    name'," \t|")
    elif p_type ==3:
        print('Item  |\t\n id  |\t','Item name',"\t|")
    else:
        print("Invalid")
    
    print("--------------------------")
    
    x = []
    
    if p_type == 1 or p_type == 2:
        for row in rows:
            print(row[0],'  |\t',row[1],"    \t|")
    elif p_type == 3:
        for row in rows:
            print(row[0],'  |',row[2],"\t|")
            #x.append(row[0],row[2],row[3],quantity,row[3]*quantity)
        #return rows[0],rows[2],rows[3],quantity,rows[3]*quantity
        
    else : 
        print("error")
    
    return rows

def parent_category_selector(cur_pointer):
    
    cur_pointer.execute("SELECT category_id AS id,category_name AS name FROM category_table WHERE category_id=parent_id")
    return printer(cur_pointer,1)

def parent_category_speak(cur):
    z=[]
    cur.execute("SELECT category_id AS id,category_name AS name FROM category_table WHERE category_id=parent_id")
    rows = cur.fetchall()
            
    for row in rows:
        z.append(row[1])
            
    text = 'Available categories are ' + " ".join(z[:-1]) + 'and' + z[-1] 
    speak(text)

def child_category_selector(cur_pointer,p_id):
    
    query = str("SELECT category_id, category_name FROM category_table WHERE parent_id IN (SELECT parent_id FROM category_table WHERE category_name ='" + str(p_id)+"') AND parent_id!=category_id")
    cur_pointer.execute(query)
    printer(cur_pointer,2)

def child_category_speak(cur,p_id):
    z=[]
    query = str("SELECT category_id, category_name FROM category_table WHERE parent_id IN (SELECT parent_id FROM category_table WHERE category_name ='" + str(p_id)+"') AND parent_id!=category_id")
    cur.execute(query)
    rows = cur.fetchall()
    for row in rows :
        z.append(row[1])
    text = 'Available subcategories are ' + " ".join(z[:-1]) + " and " + z[-1]
    speak(text)

def item_selector(cur_pointer,p_id):
   
    query = "SELECT * FROM items WHERE category_id IN (SELECT category_id FROM category_table WHERE category_name ='"  + p_id + "')"
    cur_pointer.execute(query)
    rows = cur_pointer.fetchall()
    print('Item  |\t\n id  |\t','Item name',"\t|")
    print("--------------------------")
    for row in rows : 
        print(row[0],'  |',row[2],"\t|")
    return(rows)
    #printer(cur_pointer,3)
    
def item_speaker(cur,p_id):
    query = "SELECT * FROM items WHERE category_id IN (SELECT category_id FROM category_table WHERE category_name ='"  + p_id + "')"
    cur.execute(query)
    rows = cur.fetchall()
    items = []
    for row in rows : 
        items.append(row[2])
    text = "Availaible items are " + " ".join(items[:-1]) + "and" + items[-1] 
    speak(text)

def item_printer(cur_pointer):
    query = "SELECT * FROM items ORDER BY item_id"
    #select invoice_id from invoice order by invoice_id desc limit 1
    cur_pointer.execute(query)
    rows = cur_pointer.fetchall()
    
    print('Item |\t\n id  |\t','Item name',"\t|")
    print("--------------------------")
    for row in rows : 
        print(row[0],'   |',row[2],"\t|")
    

def stopword_remover(text):
    req = []
    for word in text.lower().split():
        if word not in stop_words:
            req.append(word)
    return req

def db_searcher(att,cur_pointer,quantt):

    x = ''
    y = []
    for i in range(len(att)):
        if i==0:
            x+= "'%" + att[i] + "%'"
            
        else:
            x += " and item_attributes LIKE '%" + att[i] + "%'"
    
    query = "SELECT * FROM items WHERE item_attributes LIKE " + x
    cur_pointer.execute(query)
    rows = cur_pointer.fetchall()
    for row in rows : 
        #y.append(row[0])
        y.append([row[0],row[2],row[3],quantt,row[3]*quantt])
    return y
    #r = 
    printer(cur_pointer,3,quantt)

    #return r

def combiner(curr_pointer,inpp,inpp2,inpp3,quantity):
    parent_category_selector(curr_pointer)
    child_category_selector(curr_pointer,inpp)
    item_selector(curr_pointer,inpp2)
    return db_searcher(stopword_remover(inpp3),cur,quantity)

def invoice_generator(cur,user_buy,conn):
    query = "SELECT nextval('invoice_seq')"
    cur.execute(query)
    rows = cur.fetchall()
    x = rows[0][0]
                
    for i in range(len(user_buy)):
        joiner = str(user_buy[i][0][2]) + ", " + str(user_buy[i][0][3]) + ", " + str(user_buy[i][0][4])
        record_to_insert = str(x) + ", " + str(user_buy[i][0][0]) + ", '" + user_buy[i][0][1] + "', " + joiner
                    
        query = "INSERT INTO invoice (invoice_id, item_id, item_name, coster, quantity, overall) \
                VALUES (" + record_to_insert + ")"

        cur.execute(query);

    conn.commit()
    print("All Sucessfull...")

def known_item_voice(cur):
    inp1='yes'
    user_buy = []
    while(inp1 == 'yes'):
        inp1 = 'britannia milk bread'
        #inp1 = myCommand("Item name")
        inp1 = word_tokenize(inp1)
        
        quantt = 6
        #quantt = myCommand("Item quant")
        user_buy.append(db_searcher(inp1,cur,quantt))
        print(user_buy)
        speak("Anything else ?")
        inp1 = input("Enter yes/no")
        #inp1 = myCommand("Yes/no")
    return user_buy

def unknown_item_voice(cur,conn):
    parent_category_speak(cur)
            
    inp1 = 'Bakery'
    #inp1 = myCommand("Which category")
    child_category_speak(cur,inp1)

    inp1 = 'Bread'
    #inp1 = myCommand("Which sub_category")
    item_speaker(cur,inp1)
            
    user_buy = known_item_voice(cur)
    invoice_generator(cur,user_buy,conn)

def complete_voice(cur,conn,inp0):

    if inp0 == 'yes':
        user_buy = known_item_voice(cur)
        invoice_generator(cur,user_buy,conn)
    else : 
        unknown_item_voice(cur,conn)