# web app using zohoinvoice
    Getting App ready:

        * create new zoho client account and generate auth token by using "Self Client" type,
            -> mention sope as "ZohoInvoice.contacts.ALL"
            -> set time duration for the scope
            -> enter scope description
        
        * copy the generated authentication code, Client Id, Client Secret key and replace on the config.json file at root directory
        * also copy the oganization Id from the zoho ivoice account page and update the value at the confige.json file

            {
                "SELF_CLIENT_CLIENT_ID": "Client Id",
                "SELF_CLIENT_CLIENT_SECRET": "Client Secret key",
                "SELF_CLIENT_TEMPORARY_GRANT_TOKEN": "generated authentication code",
                "REDIRECT_URI": "http://www.zoho.com/invoice",
                "GRAND_TYPE": "authorization_code",
                "ORG_ID": "oganization Id",
                "CONTACTS_MAIN_URL": "https://invoice.zoho.com/api/v3/contacts"
            }

    Launch the application:

        * start the app
            -> yarn install
            -> yarn start

    Use Case:

        * once the app is started you are navigated to the home page, which had the option to create a new contact
        * during this operation user may navigate to the contact creation page, after successful creation of contact 
          user will navigate back to the home page
        * once the record was successfully created you can see the contact at the home page, user can modify, clone and
          delete the contact
        