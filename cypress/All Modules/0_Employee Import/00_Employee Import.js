describe('Employee Import ', function() {

	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	
	var Category = 'Staff'
	var admin = 'GT01'
	var manager1 = 'GT02'
	var manager2 = 'GT03'
	var HR  = 'GT04'
	var finance = 'GT05'
	
	 var  employeeID = 'ab01';

	function randomInteger(length) {
	var result           = '';
	var characters       = '0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
	}

	beforeEach(function(){
        cy.getCookies()
	})
	
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('cloudUrl')) 
	})
	
	Cypress.Commands.add('navigate_Admin',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(admin)
		cy.wait(2000)
		cy.contains('li', admin).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_Manager1',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(manager1)
		cy.wait(2000)
		cy.contains('li', manager1).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_Manager2',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(manager2)
		cy.wait(2000)
		cy.contains('li', manager2).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_Finance',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(finance)
		cy.wait(2000)
		cy.contains('li', finance).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_HR',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(HR)
		cy.wait(2000)
		cy.contains('li', HR).click({force: true})
		cy.wait(3000)
	})
	
	it('Pocket HRMS Login', function() {
		cy.cloudLogin()
	})

	it('Change Company', function() {
	cy.changeCompany();
	})

	it('Navigate to Employee Import', function() {

	var settingName= 'Employeeimport'
	var filePath= 'EmployeeImport.xlsx'
	var startingRow ='2'
	var endingRow ='18'
	var EmpCode='A'
var EmpName ='B'
var DOB ='C'
var  DOJ='D'
var  ESIDispensary ='E'
var ESILocation='F'
var Gender='G'
var ITAXRegime='O'
var LastName ='H'
var Metro ='I'
var PTLocation='J'
var FIXEDBASIC ='K'
var MasterProjectAllowance='L'
var PANNO = 'K'

var sheetName='Employee'

cy.visit(Cypress.env('cloudUrl')+'Employee/Employee/EmployeeImport?import=1')
cy.wait(2000)
//cy.get('#excelImport').select('EmployeeImport Import',{force: true})
cy.wait(2000)
cy.get('#categoryMaster').select('Staff',{force: true})
cy.get('#categoryMaster').select('Staff')
cy.get('#categoryMaster').select('Staff',{force: true})
cy.wait(2000)
cy.get('button[onclick="showNewMasterSetting()"]').click({force: true})
cy.wait(5000)
cy.get('#MasterSettingNameNew').type('EssEmployeeimport')
cy.wait(1000)
cy.get("input[name='name']").click({force: true})

cy.wait(2000)
cy.get('#MStartingRow').clear() 
cy.get('#MStartingRow').type(startingRow)
cy.get('#MEndingRow').clear() 
cy.get('#MEndingRow').type(endingRow)

//cy.xpath("//a[@id='j1_1_anchor']").click()
//cy.wait(1000)
//cy.xpath("//a[@id='j1_46_anchor']//span[@id='M|20|PANNO']").click()
//cy.wait(1000)
//cy.get('#PANNO').select(PANNO)
//cy.wait(1000)

cy.get('#MEmployeeCodeRow').select(EmpCode)
cy.get('#EmployeeNameRow').select(EmpName)
cy.get('#DATEOFBIRTH').select(DOB)
cy.get('#DATEOFJOINING').select(DOJ)
cy.get('#ESIDISPENSARY').select(ESIDispensary)
cy.get('#ESILOCATION').select(ESILocation)
cy.get('#GENDER').select(Gender)
cy.get('#LNAME').select(LastName)
cy.get('#METRO').select(Metro)
cy.get('#PTLOCATION').select(PTLocation)
cy.get('#REGIMETYPE').select(ITAXRegime)
cy.wait(2000)


cy.get('#savesettingMaster').click()
cy.wait(3000)
cy.get(".toast-message").invoke('text').then((text) => {
cy.log(text.trim())
expect(text.trim()).equal('Setting Saved Successfully')
cy.get(".toast-message").click()
})
})

	it('Excel Upload', function() {
	var filePath= 'EmployeeImport.xlsx'
	var sheetName='Employee'
	cy.visit(Cypress.env('cloudUrl')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(8000)
cy.get('#ddlEmployeeImportNameList').select('Employee Master Import',{force:true})
cy.wait(2000)
cy.get('#categoryMaster').select('Staff',{force: true})

cy.wait(2000)
cy.get('#MasterSettingName').select('EssEmployeeimport',{force:true})
cy.wait(2000)

cy.fixture('EmployeeImport.xlsx', 'binary')
.then(Cypress.Blob.binaryStringToBlob)
.then(fileContent => {
cy.get('#file').upload({
fileContent,
fileName: 'EmployeeImport.xlsx',
mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
encoding: 'utf8'
})
})
cy.wait(2000)

cy.get('#ExcelSheetName').select(sheetName)
//cy.get('#chkdPan').click({force: true})

cy.get('#uploadsetting').click()
cy.wait(3000)
cy.get(".alert-success").invoke('text').then((text) => {
	cy.log(text.trim())	
	expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
	//cy.get(".toast-message").click()
})


cy.wait(15000)
})
	
	it('Change Catagory of Admin', function() {
		cy.navigate_Admin()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#employeeTab').click({force:true})
		cy.wait(2000)
		//catagory transfer
		cy.wait(2000)
		cy.get('#categoryTransferTab').click({force: true})
		cy.wait(2000)
		cy.get('#catId').select('Admin',{force: true})
		cy.wait(2000)
		cy.get('#transDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('15/04/'+Cypress.env('FinancialYear_From'))
			
	    })
	  cy.wait(1000)
	   cy.get('#ToEsiLocation').select('Hyderabad',{force: true})	
		cy.wait(1000)
	    cy.get('#Reason').click({force: true})
		cy.get('#Reason').clear();
        cy.get('#Reason').type('test purpose')	
		cy.wait(1000)
	   cy.get('#btncategoryTransfer').click({force: true})
	})

	it('Set Self Service Role - Manager', function() {
		cy.navigate_Admin()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(5000)
	})
		
	it('Set Self Service Role - Manager', function() {
		cy.navigate_Manager1()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(5000)
	})
	
	it('Set Self Service Role - Manager', function() {
		cy.navigate_Manager2()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		
		cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(5000)
	})
	
	it('Set Self Service Role - Finance', function() {
		cy.navigate_Finance()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('Finance',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(5000)
	})
	
	it('Set Self Service Role - HR', function() {
		cy.navigate_HR()
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#Profile_SelfServiceRole').click({force: true})
                cy.wait(2000)
                

                 cy.get('select[name=SelfServiceRole]').select('HR',{force: true})
                 cy.wait(2000)
                 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
				 cy.wait(5000)
	})
	
	it('GeneratePassword ', function() {	
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
		cy.wait(2000)	
		cy.server()      
		cy.route('POST', Cypress.env('url')+'Employee/Employee/GeneratePassword').as('generatepassword')
		cy.get("#catall").click({force: true})
		cy.wait(2000)
		cy.get('#OverWriteRad').check('Yes',{force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('3',{force: true})
		cy.wait(1000)
		cy.get("#savesetting").click({force: true})
		cy.wait(20000)
		//cy.wait('@generatepassword').its('status').should('eq', 200)
			
	})
	
/*	context('Verify Login into ESS after re-creating employee which is already deleted ', function() {
	
	it('Create Employee', function() {
		 cy.server()
		   cy.wait(2000)
		    cy.visit(Cypress.env('cloudUrl')+'Employee/Employee/EmptyEmployeeList')
			cy.wait(2000)
				cy.get('.mb-1').find('i').then(listing => {
					var len = Cypress.$(listing).length;	
					if (len == 2 ) {
					cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})
				} else {
					cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
				}
				})
				
				cy.wait(4000)
				cy.get("#empWizardTitle").then(($span) => {
					 var basicdetailsheadertext = $span.text();
					   expect(basicdetailsheadertext).equal('Basic Details')
			   })
			   cy.route('POST', Cypress.env('cloudUrl')+'Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')
			   cy.wait(5000)
	
						cy.get('input[name=code]').click({force: true})
						cy.get('input[name=code]').clear()
						cy.get('input[name=code]').type(employeeID.trim())

		   
		   
		 cy.get('input[name=fname]').click({force: true})		
		 cy.get('input[name=fname]').type('Login')
		 cy.get('input[name=lname]').click({force: true})	
		 cy.get('input[name=lname]').type('test')
		 cy.wait(1000)
		 cy.get('#Male').check('Male',{force: true})
		 
		 cy.get('select[name=category]').select('Staff',{force: true})
		 cy.get('select[name=ptlocation]').select('Karnataka')
		cy.wait(1000)
		cy.get('#txt_dateofbirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/12/1995')
	   })
   
		cy.wait(1000)
		cy.get('#txt_dateofjoining').then(input => {
				input.val('02/04/2018');
		})
	
		cy.wait(1000)
		cy.get('select[name=esilocation]').select('Pune',{force: true})
		cy.get('select[name=metro]').select('Metro',{force: true})
		cy.get('select[name=esidispensary]').select('Mumbai',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveBasicDetail').click({force: true})
		 cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
		cy.get(".toast-message").click({force: true})
		
		
	})
	
	it('GeneratePassword ', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
		cy.wait(2000)	
		cy.server()      
		cy.route('POST', Cypress.env('cloudUrl')+'Employee/Employee/GeneratePassword').as('generatepassword')
		cy.get("#catall").click({force: true})
		cy.wait(2000)
		cy.get('#OverWriteRad').check('Yes',{force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('3',{force: true})
		cy.wait(1000)
		cy.get("#savesetting").click({force: true})
		cy.wait(20000)
		//cy.wait('@generatepassword').its('status').should('eq', 200)
			
	})
	
	it('Login into Pocket ESS', function() {
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(employeeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		cy.url().should('include', '/Home/Dashboard?Menu=DashBoard')
		})
	})
	})
	
	it('Pocket HRMS Login & Change Company', function() {
		cy.cloudLogin()
		cy.changeCompany();
	})

	it('Delete Employee', function() {
		 cy.server()
		   cy.wait(2000)
		    cy.visit(Cypress.env('cloudUrl')+'Employee/Employee/EmployeeList')
			cy.wait(2000)
	
		cy.get('.card .media:nth-child(2) .text-muted').each(function(row, i){
			//find('tr')
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.card:nth-child('+num1+') .media:nth-child(2) .text-muted').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()==employeeID){					
						 cy.get('.card:nth-child('+num1+') .xmt-2 .fas').click()
						 cy.get('.show > .dropdown-item:nth-child(7)').click()
					}
				})
			
				}
				
		})
				
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee Deleted Successfully')
			cy.log(text.trim())
		})  
		cy.get(".toast-message").click({force: true})
		
	})
	
	it('Create Employee', function() {
		 cy.server()
		   cy.wait(2000)
		    cy.visit(Cypress.env('cloudUrl')+'Employee/Employee/EmptyEmployeeList')
			cy.wait(2000)
				cy.get('.mb-1').find('i').then(listing => {
					var len = Cypress.$(listing).length;	
					if (len == 2 ) {
					cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})
				} else {
					cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
				}
				})
				
				cy.wait(4000)
				cy.get("#empWizardTitle").then(($span) => {
					 var basicdetailsheadertext = $span.text();
					   expect(basicdetailsheadertext).equal('Basic Details')
			   })
			   cy.route('POST', Cypress.env('cloudUrl')+'Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')
			   cy.wait(5000)
	
						cy.get('input[name=code]').click({force: true})
						cy.get('input[name=code]').clear()
						cy.get('input[name=code]').type(employeeID.trim())

		   
		   
		 cy.get('input[name=fname]').click({force: true})		
		 cy.get('input[name=fname]').type('Login')
		 cy.get('input[name=lname]').click({force: true})	
		 cy.get('input[name=lname]').type('test')
		 cy.wait(1000)
		 cy.get('#Male').check('Male',{force: true})
		 
		 cy.get('select[name=category]').select('Staff',{force: true})
		 cy.get('select[name=ptlocation]').select('Karnataka')
		cy.wait(1000)
		cy.get('#txt_dateofbirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/12/1995')
	   })
   
		cy.wait(1000)
		cy.get('#txt_dateofjoining').then(input => {
				input.val('02/04/2018');
		})
	
		cy.wait(1000)
		cy.get('select[name=esilocation]').select('Pune',{force: true})
		cy.get('select[name=metro]').select('Metro',{force: true})
		cy.get('select[name=esidispensary]').select('Mumbai',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveBasicDetail').click({force: true})
		 cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
		cy.get(".toast-message").click({force: true})
		
		
	})
	
	it('GeneratePassword ', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
		cy.wait(2000)	
		cy.server()      
		cy.route('POST', Cypress.env('cloudUrl')+'Employee/Employee/GeneratePassword').as('generatepassword')
		cy.get("#catall").click({force: true})
		cy.wait(2000)
		cy.get('#OverWriteRad').check('Yes',{force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('3',{force: true})
		cy.wait(1000)
		cy.get("#savesetting").click({force: true})
		cy.wait(20000)
		//cy.wait('@generatepassword').its('status').should('eq', 200)
			
	})
	
	it('Login into Pocket ESS', function() {
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(employeeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		cy.url().should('include', '/Home/Dashboard?Menu=DashBoard')
		})
	})
	})
	
	})	
*/

})