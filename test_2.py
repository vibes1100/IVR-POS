# -*- coding: utf-8 -*-
"""
Created on Fri Jul 17 12:12:51 2020

@author: ANISH
"""
import speech_recognition as sr
import pyttsx3
import psycopg2
import eel

from gtts       import gTTS
from nltk       import word_tokenize
from functions  import *

x = 5
inp_yes = 'yes'
inp_no = 'no'
stop_words = ['i','want','to','order','and','some','would',\
    'like','go','visit','view']

eel.init('web')

# engine = pyttsx3.init('sapi5') 
# voices = engine.getProperty('voices') 
# engine.setProperty('voice', voices[1].id) 
    
#########ONLY FOR TESTING!######
##########SAME AS THE TRY BLOCK AFTER THIS######################
@eel.expose
def tryblock():
    cur,conn = db_connect()
    eel.left_printer("Do you want a completely voice based system?")
    speak("        Do u want a completely voice based system?")

    inp0 = inp_yes
    eel.right_printer(inp0)
    print(inp0)

    if inp0 == inp_yes:
        eel.left_printer("Do you know exactly what you want to buy?")
        speak("Do u know exactly what u want to buy ?")
        inp0 = inp_no
        eel.right_printer(inp0)
        print(inp0)
 
        complete_voice(cur,conn,inp0)
###########DELETE ME^###########
################################
            
            
try:
    conn = psycopg2.connect(database="postgres", user="postgres", password="hi", host="127.0.0.1", port="5432")

    
    n=4
    cur = conn.cursor()
    #speak("Do u know exactly what u want to buy ?")
    #inp0 = myCommand("Do u know exactly what u want to buy ?")

    speak("        Do u want a completely voice based system?")

    inp0 = inp_no
    # myCommand("Do u want a completely voice based system?")
    print(inp0)

    if inp0 == inp_yes:

        speak("Do u know exactly what u want to buy ?")
        #inp0 = myCommand("Do u know exactly what u want to buy ?")
        inp0 = inp_no
        print(inp0)
 
        complete_voice(cur,conn,inp0)

            
        #inp2 = myCommand("Item Name")

        #item_selector(cur,inp2.capitalize())


        """
         
            stopword_remover(inp1)
            
            child_category_selector(cur,inp1.capitalize())
            speak("Please Select a sub category from these")
            
            #inp2 = myCommand("Which sub_category")
            inp2="bread"
            stopword_remover(inp2)
            item_selector(cur,inp2.capitalize())
            
            #inp3 = myCommand("Which item ?")
            inp3 = ['britannia', 'milk', 'bread']
            #stopword_remover(inp3)
            user_buy.append((db_searcher(inp3,cur,4)))
            print(user_buy)
        """
    else :
        eel.start('index.html', size=(540, 960))
    
        inp0 = 'yes'
        #if inp0 = 'yes':
        user_buy=[]
        if inp0 == 'yes':
            
            item_printer(cur)
            speak("Choose an item please")
            inp = myCommand("Item name")
            inp = "britannia,milk,bread"
            user_buy.append(db_searcher(inp,cur,2))
            print(user_buy)

        else : 
            parent_category_selector(cur)
            speak("Please Select a category from these")
            
            #inp1 = myCommand("Which category")
            inp1='bakery'
            stopword_remover(inp1)
            
            child_category_selector(cur,inp1.capitalize())
            speak("Please Select a sub category from these")
            
            #inp2 = myCommand("Which sub_category")
            inp2="bread"
            stopword_remover(inp2)
            item_selector(cur,inp2.capitalize())
            
            #inp3 = myCommand("Which item ?")
            inp3 = ['britannia', 'milk', 'bread']
            #stopword_remover(inp3)
            user_buy.append((db_searcher(inp3,cur,4)))
            print(user_buy)

        """
    for i in range(n):
        inp1 = input("Category") 
        inp2 = input("Sub_cat")
        inp3 = input("item")
        inp4 = int(input())
        
        user_buy.append(combiner(cur,inp1,inp2,inp3,inp4))
        print(user_buy)
    """ 
    
except psycopg2.Error as e:
    print("I am unable to connect to the database")
    print (e)
    print (e.pgcode)
    print (e.pgerror)
    #print (traceback.format_exc())

   

"""
rice_quant = 10
req=[]

req_list={}
stock = {'rice':10 , 'sauce':4 ,'sooji':5 , 'maida':5, 'aata':10 ,'pasta':12 ,'lasagne sheets':10,'cheese':10}
print(stock)



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