# web app using zohoinvoice
    Getting App ready:

        * Launch the application:
            -> yarn install
            -> yarn start

        * Once the application was started you will receive a pop-up message along with the button to generate grant token.
        
        * Once you will click "Generate" button new tab will open with zoho console page to create and configure client application.
        
        * create new zoho client account and generate auth token by using "Self Client" type,
            -> mention sope as "ZohoInvoice.contacts.ALL"
            -> set time duration for the scope
            -> enter scope description
        
        * Once the grant token generated successfully copy that generated token and back to our application.
        
        * Paste the copied token and then click "Ok" button.

    Use Case:

        * Now you are navigated to the home page, which had the option to create a new contact.
        
        * During this operation user may navigate to the contact creation page, after successful creation of contact 
          user will navigate back to the home page.
        
        * Once the record was successfully created you can see the contact at the home page, user can modify, clone and
          delete the contact.
        
