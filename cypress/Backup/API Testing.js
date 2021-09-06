describe('Testing API Endpoints Using Cypress', () => {
	
	beforeEach(function(){		
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		// Next
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','AI_sentBuffer','AI_buffer','1P_JAR','ARRAffinity','tablesorter-pager','module','dataWizardtblData','FavouriteMenus','XCategory','_ga_68GNHT5CK9','XCompanyId','XName','XUserXpROLE','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		//ESS
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		//https://pockethrmsnext.azurewebsites.net/
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		//cloud.pockethrms.com/
		Cypress.Cookies.preserveOnce('.AspNetCore.Mvc.CookieTempDataProvider','_ga_68GNHT5CK9','.AspNetCore.Session	','XNcompanyName','XNGender','XNESSRole','XNCompanyId','XNEmployeeId','XNSchemaName','XNEmployeeFullName','.AspNetCore.Antiforgery.w5W7x28NAIs','XNPocketToken','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		
   })
	
	
      it('Test GET Request', () => {
		  cy.cloudLogin()
            cy.request('https://cloud.pockethrms.com/Identity/Home/Dashboard')
                 .then((response) => {
                        expect(response.body).to.have.property('code', 200);
            })
      })

      it('Test POST Request', () => {
            cy.request({
                 method: 'POST',
                 url: 'https://cloud.pockethrms.com/',
                 body: {
                     'id' : 2,
                     'title':'Automation'
                 }
            }).then((response) => { 
                    expect(response.body).has.property('title','Automation'); 
            })
      })

      it('Test PUT Request', () => {
            cy.request({
                    method: 'PUT',
                    url: 'https://cloud.pockethrms.com/',
                    body: { 
                       'id': 2,
                       'title' : 'Test Automation'
                    }
            }).then((response) => { 
                    expect(response.body).has.property('title',' Test Automation'); 
            })          
      })        

      it('Test DELETE Request', () => {
            cy.request({
                      method : 'DELETE',
                      url: 'https://cloud.pockethrms.com/'
                      }).then((response) => {
                        expect(response.body).to.be.empty;
            })	
      })
   
 })
