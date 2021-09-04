# web app using zohoinvoice
    Getting App ready:

        * Open URL - "https://accounts.zoho.com/developerconsole"
        
        * Create new zoho client account using "Self Client" type, now you got Cliet Id and Client Secret key

        * Copy the both generated Client Id, Client Secret key and replace on the config.json file at root directory of the code

        * Open URL - "https://invoice.zoho.com/"

        * Copy the oganization Id from the zoho ivoice account page by click profile icon and update the value at the config.json file

            {
                "SELF_CLIENT_CLIENT_ID": "Client Id",
                "SELF_CLIENT_CLIENT_SECRET": "Client Secret key",
                "REDIRECT_URI": "http://www.zoho.com/invoice",
                "GRAND_TYPE": "authorization_code",
                "ORG_ID": "oganization Id",
                "CONTACTS_MAIN_URL": "https://invoice.zoho.com/api/v3/contacts",
                "OAUTH_MAIN_URL": "https://accounts.zoho.com/oauth/v2/token"
            }
    
    Start the application:

        * Launch the application:
            -> yarn install
            -> yarn start

        * Once the application was started you will receive a pop-up message along with the button to generate grant token.
        
        * Once you will click "Generate" button new tab will open with zoho console page to create and configure client application.
        
        * Now you can see our client account, switch the tab to Generate Code and fill the below values,
            -> mention sope as "ZohoInvoice.contacts.ALL"
            -> set time duration for the scope
            -> enter scope description (ex: test)
        
        * Once the grant token generated successfully copy that generated token and back to our application.
        
        * Paste the copied token and then click "Ok" button.

    Use Case:

        * Now you are navigated to the home page, which had the option to create a new contact.
        
        * During this operation user may navigate to the contact creation page, after successful creation of contact 
          user will navigate back to the home page.
        
        * Once the record was successfully created you can see the contact at the home page, user can modify, clone and
          delete the contact.
        
