# IVR-POS
##  How to Run
### 1. Initialize Database
With PgAdmin 4 Create new database called __IVR\_POS__ and create a schema named __public__ within it.

[Creating Database](/images/sample1.png "Creating Database")

From __public__ schema options select the Restore.. option and restore all tables from _ivr\_db\_backup_.

[Restoring Tables](/images/sample2.png "Restoring Tables")

_db_builder1.py_, _db_builder2.py_ and _invoice_gen.py_ are now deprecated.
### 2. Install all packages/dependencies in requirements.txt
````pip install -r requirements.txt````
### 3. Start the application.
```python test_2.py```
### 4. Login or Sign-Up to create a new account to access the application

[Login/Sign-Up Page](/images/sample3.png "Login/Sign-Up Page")

[Home Page](/images/sample11.png "Home Page")

## Features
### __1. Interactive Voice Recognition Shopping with guiding GUI__

[Conversing with the Assistant](/images/sample5.png "Conversing with the Assistant")
> Simply talk to the app as if in a normal conversation. The voice assistant performs reasonably as long as the conversation stays on-topic.

### 2. Access Shop Inventory and see live updates of Stock

[Shop Inventory](/images/sample4.png "Shop Inventory")

> Able to see stock updates as the customer adds items to their cart 
### 3. View and Edit Shopping Cart

[Shopping Cart](/images/sample6.png "Shopping Cart")

> View all items already marked for purchase and increase or decrease quantity

### 4. Customer Care

[Customer Corner](/images/sample7.png "Customer Corner")

[Complaints](/images/sample8.png "Complaints")

> To receive customer feedback and maintain customer satisfaction

### 5. Wishlist

[Sidebar Access](/images/sample9.png "Sidebar Access")

[Complaints](/images/sample10.png "Complaints")

> To keep track of items users may want to buy in the future.

### 6. Preferences

[Preferences](/images/sample12.png "Preferences")

> [WIP] Access to Assistant Customization Settings like language and voice.