
var url = Cypress.env('url')
var companyCode = 'NP'
var employeecode= 'C002'
var pwd = 'C002'
	
var cloudUrl = Cypress.env('cloudUrl')
var username= 'nileshgajare@live.com'
var userPass = '123456'


	import 'cypress-wait-until';
	import 'cypress-file-upload';
	import 'cypress-iframe';
	
	Cypress.Commands.add('getCookies', () => {
		window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err, runnable) => {
			return false;
		});
		//Cloud
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		//ESS
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		
		//Asure
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		//ESS
		//cy.wait(2000)
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl','myAllMenu','.AspNetCore.Antiforgery.9fXoN5jHCXs','myFavMenu','XNEmployeeCode', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		//Asure
		//cy.wait(2000)
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		//New ESS
		Cypress.Cookies.preserveOnce('.AspNetCore.Session','.AspNetCore.Session','.AspNetCore.Antiforgery.w5W7x28NAIs	','.AspNetCore.Session','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
	
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.9fXoN5jHCXs', '.AspNetCore.Mvc.CookieTempDataProvider', 'myFavMenu', 'myAllMenu', '.AspNetCore.Antiforgery.w5W7x28NAIs', '_gat_gtag_UA_107844625_2', '.AspNetCore.Session', '.AspNetCore.Antiforgery.w5W7x28NAIs', '.AspNetCore.Antiforgery.w5W7x28NAIs', '.AspNetCore.Session', '.AspNetCore.Antiforgery.w5W7x28NAIs', '.AspNetCore.Session', '.AspNetCore.Session', 'XUserEmployeeCode', 'XUserCompanyCode', 'XNcompanyName', 'XNGender', 'XNESSRole', 'XNCompanyId', 'XNEmployeeId', 'XNSchemaName', 'XNEmployeeFullName', 'XNPocketToken', '.AspNetCore.Antiforgery.w5W7x28NAIs', '.AspNetCore.Antiforgery.w5W7x28NAIs', 'XUserXpROLE', 'XUserXp', '_ga_68GNHT5CK9', '.AspNetCore.Antiforgery.w5W7x28NAIs', '_gat_gtag_UA_159993745_1', 'XUserXp', 'XUserId', 'XUserXpEmail', 'XUserName', 'XSchemaName', 'XUserXpEmail', 'XCompanyId', 'XName', 'XCategory', '.AspNetCore.Antiforgery.mEZFPqlrlZ8', 'GetLicenseData', 'AI_buffer', 'dataWizardtblData', 'module', '.AspNetCore.Antiforgery.mEZFPqlrlZ8', '.AspNetCore.Antiforgery.mEZFPqlrlZ8', '__cypress.initial', '.AspNetCore.Session', '1P_JAR', 'ARRAffinity', 'FavouriteMenus', 'XCategory', 'XCompanyId', 'XName', 'XSchemaName', 'XUserId', 'XUserName', '_ga', '_gid', 'ai_session', 'ai_user', 'new_username', 'GetLicenseData')
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','.AspNetCore.Session','XUserEmployeeCode','XUserCompanyCode','XNcompanyName','XNGender','XNESSRole','XNCompanyId','ARRAffinitySameSite','XNEmployeeId','XNSchemaName','XNEmployeeFullName','XNPocketToken','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
})

	Cypress.Commands.add('uploadFile', { prevSubject: true }, (subject, fileName) => {
      cy.fixture(fileName).then((content) => {
          const el = subject[0]
          const testFile = new File([content], fileName)
          const dataTransfer = new DataTransfer()

          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files
          cy.wrap(subject).trigger('change', { force: true })
      })
})

	Cypress.Commands.add('EssLogin', (empID, pwd) => {

	cy.visit(Cypress.env('url'))

	cy.get("body").then($body => {
		if ($body.find('[onclick="return newSinIn()"]').length > 0) {
			cy.get('[onclick="return newSinIn()"]').click({ force: true })
		}
	});

	cy.readFile('cypress/fixtures/Company.json').then((text) => {
		text.forEach(function (entry) {

			var comapnaycode = entry.comapnaycode
			cy.log('comapnaycode ' + comapnaycode)



			cy.get('#CompanyCode').click({ force: true })
			cy.get('#CompanyCode').clear();
			cy.get('#CompanyCode').type(comapnaycode)


			cy.get('#EmployeeCode').click({ force: true })
			cy.get('#EmployeeCode').clear();
			cy.get('#EmployeeCode').type(empID)


			cy.get('#Password').click({ force: true })
			cy.get('#Password').clear();
			cy.get('#Password').type(pwd)


			cy.xpath("//button[contains(text(),'Log In')]").click({ force: true })

		})
	})

})

Cypress.Commands.add('navigate_EmployeeProfile', (empID) => {
	cy.wait(1000)
	cy.get('#globalSearch').click({ force: true })
	cy.get('#globalSearch').clear()
	cy.get('#globalSearch').type(empID)
	cy.wait(2000)
	cy.contains('li', '('+empID+')').click({ force: true })
	cy.wait(3000)
})

	Cypress.Commands.add('logout', () => {
		cy.get('.d-flex:nth-child(2)').click({force: true})
		//cy.wait(2000)
		cy.get('[href="/Account/SignOut"]').click({force: true})
	})

	Cypress.Commands.add('cloudLogin', () => {
		cy.visit(cloudUrl) 

		cy.get("body").then($body => {
			if ($body.find('[onclick="return newSinIn()"]').length > 0) {
				cy.get('[onclick="return newSinIn()"]').click({ force: true })
			}
		});

		//cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		//cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		//cy.wait(2000)
})

	Cypress.Commands.add('changeCompany', () => {
	
	cy.readFile('cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var company = entry.comapnayname	
		cy.log('company '+ company)		
		//cy.wait(500)
		
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company.trim()){
				expect(text.trim()).to.eq(company.trim()) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				//cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').click({force: true})
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company.trim()){
						expect(text).to.eq(company.trim())
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
						//cy.wait(2000)
					}	
				})
				})		
			}
		})
		
		})
	})
	
	//cy.visit('https://next.pockethrms.com/identity/Home/Dashboard')	
	//cy.wait(10000)	
})
	
/*	Cypress.Commands.add('getCookies', () => {
		window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		//Cloud
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		//ESS
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category', 'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken', '__tawkuuid', '_ga', '_gcl_au', '_gid','ai_session','ai_user')
		//Asure
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('FavouriteMenus', 'XName', 'new_username', 'XCompanyId', 'ARRAffinity', 'XSchemaName', 'XUserName', 'XCategory', '.AspNetCore.Session', 'XUserId','.AspNetCore.Antiforgery.w5W7x28NAIs')
		//New ESS
		cy.wait(2000)
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','.AspNetCore.Session','XUserEmployeeCode','XUserCompanyCode','XNcompanyName','XNGender','XNESSRole','XNCompanyId','XNEmployeeId','XNSchemaName','XNEmployeeFullName','XNPocketToken','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXp','XUserId','XUserXpEmail','XUserName','XSchemaName','XUserXpEmail','XCompanyId','XName','XCategory','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		
})
*/






